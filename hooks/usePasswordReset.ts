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
    onSuccess: (data) => {
      toast.success(data.message || 'OTP sent to your email');
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
      const response = await resetPassword(data);
      if (!response.success) {
        throw new Error(response.error);
      }
      return response;
    },
    onSuccess: (data) => {
      toast.success(data.message || 'Password reset successfully');
      router.push('/auth');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to reset password');
    },
  });
}
