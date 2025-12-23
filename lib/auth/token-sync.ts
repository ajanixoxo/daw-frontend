/**
 * Token Synchronization Utility
 * 
 * This utility ensures tokens are synchronized between:
 * 1. HttpOnly Cookies (server-side, secure)
 * 2. localStorage (client-side, for direct API calls)
 * 3. Zustand Store (client-side, for React state management)
 */

import { useAuthStore } from '@/zustand/store';

// Token storage keys
const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

/**
 * Initialize tokens from localStorage to Zustand store on app load
 * Call this in your root layout or app initialization
 */
export function initializeTokens() {
  if (typeof window === 'undefined') return;

  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

  if (accessToken && refreshToken) {
    const sessionData = useAuthStore.getState().sessionData;
    if (sessionData) {
      useAuthStore.getState().updateTokens(accessToken, refreshToken);
    }
  }
}

/**
 * Sync tokens to all storage locations
 * - localStorage
 * - Zustand store
 * - Server cookies (via API route)
 */
export async function syncTokens(accessToken: string, refreshToken: string): Promise<boolean> {
  try {
    // 1. Update localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }

    // 2. Update Zustand store
    useAuthStore.getState().updateTokens(accessToken, refreshToken);

    // 3. Update server cookies via API route
    const response = await fetch('/api/auth/sync-tokens', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accessToken, refreshToken }),
    });

    if (!response.ok) {
      console.error('Failed to sync tokens with server cookies');
      return false;
    }

    return true;
  } catch (error) {
    console.error('Token sync error:', error);
    return false;
  }
}

/**
 * Clear tokens from all storage locations
 */
export async function clearAllTokens(): Promise<void> {
  // 1. Clear localStorage
  if (typeof window !== 'undefined') {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }

  // 2. Clear Zustand store
  useAuthStore.getState().clearAuth();

  // 3. Clear server cookies via logout action
  try {
    await fetch('/api/auth/logout', { method: 'POST' });
  } catch (error) {
    console.error('Failed to clear server cookies:', error);
  }
}

/**
 * Get tokens from localStorage (fallback if Zustand store is not available)
 */
export function getStoredTokens(): { accessToken: string | null; refreshToken: string | null } {
  if (typeof window === 'undefined') {
    return { accessToken: null, refreshToken: null };
  }

  return {
    accessToken: localStorage.getItem(ACCESS_TOKEN_KEY),
    refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
  };
}

/**
 * Check if user has valid tokens
 */
export function hasValidTokens(): boolean {
  const { accessToken, refreshToken } = getStoredTokens();
  return !!(accessToken && refreshToken);
}
