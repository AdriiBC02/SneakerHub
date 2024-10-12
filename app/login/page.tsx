'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { createClientSideSupabaseClient } from '@/lib/supabase';
import { useAuth } from '@/lib/AuthProvider';
import Link from 'next/link';

export default function CustomerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();
  const supabase = createClientSideSupabaseClient();
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    if (user) {
      if (isAdmin) {
        router.push('/admin/dashboard');
      } else {
        router.push('/dashboard');
      }
    }
  }, [user, isAdmin, router]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let result;
      if (isSignUp) {
        result = await supabase.auth.signUp({
          email,
          password,
        });
      } else {
        result = await supabase.auth.signInWithPassword({
          email,
          password,
        });
      }

      const { data, error } = result;

      if (error) throw error;

      if (data.user) {
        toast.success(
          isSignUp ? 'Signed up successfully' : 'Logged in successfully'
        );
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      toast.error(isSignUp ? 'Failed to sign up' : 'Failed to log in');
    }
  };

  if (user) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isSignUp ? 'Customer Sign Up' : 'Customer Login'}
        </h1>
        <form onSubmit={handleAuth}>
          <div className="mb-4">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-6">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            {isSignUp ? 'Sign Up' : 'Log In'}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <Button variant="link" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp
              ? 'Already have an account? Log in'
              : "Don't have an account? Sign up"}
          </Button>
        </div>
        <div className="mt-4 text-center">
          <Link
            href="/admin/login"
            className="text-sm text-blue-600 hover:underline"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
}
