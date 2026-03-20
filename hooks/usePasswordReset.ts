import { useMutation } from '@tanstack/react-query';
import { forgotPassword, resetPassword } from '@/app/actions/password-reset';
import { IForgotPasswordRequest, IResetPasswordRequest } from '@/types/auth.types';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function useForgotPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: IForgotPasswordRequest) => {
      const response = await forgotPassword(data);
      if (!response.success) {
        throw new Error(response.error);
      }
      return response;
    },
    onSuccess: (response) => {
      toast.success(response.message || 'OTP sent to your email');
      // Store token securely in sessionStorage for the next step
      if (typeof window !== 'undefined' && response.data?.token) {
        sessionStorage.setItem('reset_token', response.data.token);
      }
      router.push('/reset-password');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to send OTP');
    },
  });
}

export function useResetPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: IResetPasswordRequest) => {
      const token = typeof window !== 'undefined' ? sessionStorage.getItem('reset_token') : null;
      
      if (!token) {
        throw new Error('Reset session expired or invalid. Please request a new code.');
      }

      const response = await resetPassword(data, token);
      if (!response.success) {
        throw new Error(response.error);
      }
      return response;
    },
    onSuccess: (data) => {
      toast.success(data.message || 'Password reset successfully');
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('reset_token');
      }
      router.push('/auth');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to reset password');
    },
  });
}
