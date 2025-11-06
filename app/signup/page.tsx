
"use client";

import AuthLayout from '@/components/auth/AuthLayout';



export default function SignUpPage() {
  const handleSignIn = async (email: string, password: string) => {
    console.log('Sign in:', { email, password });
    // TODO: Implement sign in logic
  };

  const handleSignUp = async (data: {
    fullName: string;
    email: string;
    password: string;
    role: string;
  }) => {
    console.log('Sign up:', data);
    // TODO: Implement sign up logic
  };

  return (
    <AuthLayout
      initialMode="signup"
      onSignIn={handleSignIn}
      onSignUp={handleSignUp}
    />
  );
}