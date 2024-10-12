'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { createClientSideSupabaseClient } from '@/lib/supabase';
import { useAuth } from '@/lib/AuthProvider';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const supabase = createClientSideSupabaseClient();
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    if (user && isAdmin) {
      router.push('/admin/dashboard');
    } else {
      setIsLoading(false);
    }
  }, [user, isAdmin, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

}}