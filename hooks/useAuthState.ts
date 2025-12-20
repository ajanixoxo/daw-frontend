import { useAuthStore } from '@/zustand/store';

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const sessionData = useAuthStore((state) => state.sessionData);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isVerified = useAuthStore((state) => state.isVerified);
  const logout = useAuthStore((state) => state.logout);
  const updateUser = useAuthStore((state) => state.updateUser);

  return {
    user,
    sessionData,
    isAuthenticated,
    isVerified,
    logout,
    updateUser,
  };
}
