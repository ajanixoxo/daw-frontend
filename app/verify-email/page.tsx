"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Mail, CheckCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { checkVerificationStatus } from '@/app/actions/auth';

export default function VerifyEmailPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      const status = await checkVerificationStatus();

      if (!status.isAuthenticated) {
        router.push('/login');
        return;
      }

      if (status.isVerified) {
        router.push('/');
        return;
      }

      setEmail(status.session?.email || '');
      setIsChecking(false);
    };

    checkStatus();
  }, [router]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking verification status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center">
              <Mail className="w-10 h-10 text-pink-600" />
            </div>
            <div className="absolute -top-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Verify Your Email
        </h1>

        <p className="text-gray-600 mb-2">
          We've sent a verification email to
        </p>
        <p className="text-pink-600 font-semibold mb-6">
          {email || 'your email address'}
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
          <p className="text-sm text-gray-700 mb-3 font-semibold">
            Next steps:
          </p>
          <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
            <li>Check your email inbox (and spam folder)</li>
            <li>Click the verification link in the email</li>
            <li>Return to the website and log in</li>
          </ol>
        </div>

        <p className="text-xs text-gray-500 mb-6">
          You can browse our website while waiting for verification, but some features will be limited until you verify your email.
        </p>

        <div className="space-y-3">
          <Button
            onClick={() => router.push('/')}
            className="w-full h-12 rounded-full bg-pink-600 hover:bg-pink-700 text-white font-semibold"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go to Website
          </Button>

          <button
            onClick={() => router.push('/login')}
            className="w-full text-sm text-gray-600 hover:text-gray-900 underline"
          >
            Already verified? Sign in
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Didn't receive the email?{' '}
            <button className="text-pink-600 hover:underline font-medium inline-flex items-center gap-1">
              <RefreshCw className="w-3 h-3" />
              Resend verification email
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}