/**
 * useAuthSync Hook
 * 
 * Synchronizes authentication state between:
 * - Client (Zustand + localStorage)
 * - Server (Cookies)
 * 
 * This hook ensures that auth state is consistent across both
 * and handles token refresh automatically.
 */

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/zustand/store';
import { checkVerificationStatus } from '@/app/actions/auth';
import { syncTokens, hasValidTokens } from '@/lib/auth/token-sync';
import { clientApiClient, API_ENDPOINTS } from '@/lib/api/client-client';
import type { IUser } from '@/types/auth.types';

interface AuthSyncState {
  isAuthenticated: boolean;
  isVerified: boolean;
  isLoading: boolean;
  isSyncing: boolean;
  user: IUser | null;
}

export function useAuthSync() {
  const { isAuthenticated, isVerified, sessionData, user, setUser, setAuthStatus } = useAuthStore();
  const [state, setState] = useState<AuthSyncState>({
    isAuthenticated: false,
    isVerified: false,
    isLoading: true,
    isSyncing: false,
    user: null,
  });

  useEffect(() => {
    let isMounted = true;

    async function syncAuthState() {
      try {
        setState((prev) => ({ ...prev, isSyncing: true }));

        // 1. Check if client has valid tokens
        const clientHasTokens = hasValidTokens();
        
        // 2. Check server-side auth status (from cookies)
        const serverStatus = await checkVerificationStatus();

        console.log('Auth Sync:', {
          clientHasTokens,
          clientAuth: { isAuthenticated, isVerified },
          serverAuth: { 
            isAuthenticated: serverStatus.isAuthenticated, 
            isVerified: serverStatus.isVerified 
          },
        });

        // 3. Handle different scenarios
        
        // Scenario A: Client has tokens but server doesn't
        if (clientHasTokens && sessionData?.accessToken && !serverStatus.isAuthenticated) {
          console.log('📤 Syncing client tokens to server cookies...');
          const syncSuccess = await syncTokens(
            sessionData.accessToken,
            sessionData.refreshToken
          );

          if (syncSuccess) {
            // Re-check server status after sync
            const updatedStatus = await checkVerificationStatus();
            if (isMounted) {
              setState({
                isAuthenticated: updatedStatus.isAuthenticated,
                isVerified: updatedStatus.isVerified,
                isLoading: false,
                isSyncing: false,
                user: user,
              });
            }
          }
          return;
        }

        // Scenario B: Server has session but client doesn't
        if (serverStatus.isAuthenticated && !isAuthenticated && serverStatus.session) {
          console.log('📥 Syncing server session to client...');
          
          // Update Zustand store with server session
          setAuthStatus(serverStatus.isAuthenticated, serverStatus.isVerified);
          useAuthStore.getState().setSessionData(serverStatus.session);

          // Fetch user profile if we don't have it
          if (!user) {
            try {
              const userProfile = await clientApiClient.get<{ user: IUser }>(
                API_ENDPOINTS.AUTH.PROFILE
              );
              if (isMounted && userProfile.user) {
                setUser(userProfile.user);
              }
            } catch (error) {
              console.error('Failed to fetch user profile:', error);
            }
          }

          if (isMounted) {
            setState({
              isAuthenticated: serverStatus.isAuthenticated,
              isVerified: serverStatus.isVerified,
              isLoading: false,
              isSyncing: false,
              user: user,
            });
          }
          return;
        }

        // Scenario C: Both are in sync
        if (isMounted) {
          setState({
            isAuthenticated: isAuthenticated || serverStatus.isAuthenticated,
            isVerified: isVerified || serverStatus.isVerified,
            isLoading: false,
            isSyncing: false,
            user: user,
          });
        }

      } catch (error) {
        console.error('Auth sync error:', error);
        if (isMounted) {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            isSyncing: false,
          }));
        }
      }
    }

    syncAuthState();

    return () => {
      isMounted = false;
    };
  }, [
    isAuthenticated,
    isVerified,
    sessionData?.accessToken,
    sessionData?.refreshToken,
    user,
    setUser,
    setAuthStatus,
  ]);

  return {
    isAuthenticated: state.isAuthenticated,
    isVerified: state.isVerified,
    isLoading: state.isLoading,
    isSyncing: state.isSyncing,
    user: state.user || user,
  };
}
