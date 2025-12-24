import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { IUser, ISessionData } from '@/types/auth.types';

interface AuthState {
  user: IUser | null;
  sessionData: ISessionData | null;
  isAuthenticated: boolean;
  isVerified: boolean;
  
  setUser: (user: IUser | null) => void;
  setSessionData: (sessionData: ISessionData | null) => void;
  setAuthStatus: (isAuthenticated: boolean, isVerified: boolean) => void;
  login: (user: IUser, sessionData: ISessionData) => void;
  logout: () => void;
  updateUser: (userData: Partial<IUser>) => void;
  updateTokens: (accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      sessionData: null,
      isAuthenticated: false,
      isVerified: false,

      setUser: (user) => set({ user }),
      setSessionData: (sessionData) => set({ sessionData }),
      setAuthStatus: (isAuthenticated, isVerified) => 
        set({ isAuthenticated, isVerified }),
      login: (user, sessionData) => 
        set({
          user,
          sessionData,
          isAuthenticated: true,
          isVerified: sessionData.isVerified,
        }),
      logout: () => 
        set({
          user: null,
          sessionData: null,
          isAuthenticated: false,
          isVerified: false,
        }),
      updateUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),
      updateTokens: (accessToken, refreshToken) =>
        set((state) => ({
          sessionData: state.sessionData
            ? { ...state.sessionData, accessToken, refreshToken }
            : null,
        })),
      clearAuth: () =>
        set({
          user: null,
          sessionData: null,
          isAuthenticated: false,
          isVerified: false,
        }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        sessionData: state.sessionData,
        isAuthenticated: state.isAuthenticated,
        isVerified: state.isVerified,
      }),
    }
  )
);
