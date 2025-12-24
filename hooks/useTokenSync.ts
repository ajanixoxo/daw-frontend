/**
 * useTokenSync Hook
 * 
 * React hook for managing token synchronization
 * Automatically initializes tokens on mount and provides utilities
 */

import { useEffect, useCallback } from 'react';
import { useAuthStore } from '@/zustand/store';
import { 
  initializeTokens, 
  syncTokens, 
  clearAllTokens, 
  hasValidTokens 
} from '@/lib/auth/token-sync';

export function useTokenSync() {
  const { sessionData, isAuthenticated } = useAuthStore();

  // Initialize tokens from localStorage on mount
  useEffect(() => {
    initializeTokens();
  }, []);

  // Sync tokens when sessionData changes
  useEffect(() => {
    if (sessionData?.accessToken && sessionData?.refreshToken) {
      syncTokens(sessionData.accessToken, sessionData.refreshToken);
    }
  }, [sessionData?.accessToken, sessionData?.refreshToken]);

  const updateTokens = useCallback(async (accessToken: string, refreshToken: string) => {
    return await syncTokens(accessToken, refreshToken);
  }, []);

  const clearTokens = useCallback(async () => {
    await clearAllTokens();
  }, []);

  const checkTokens = useCallback(() => {
    return hasValidTokens();
  }, []);

  return {
    isAuthenticated,
    hasTokens: checkTokens(),
    updateTokens,
    clearTokens,
    sessionData,
  };
}
