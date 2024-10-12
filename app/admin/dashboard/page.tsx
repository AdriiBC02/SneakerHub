'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientSideSupabaseClient } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { useAuth } from '@/lib/AuthProvider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function AdminDashboard() {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [featured, setFeatured] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sneakers, setSneakers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [editingSneaker, setEditingSneaker] = useState(null);
  const router = useRouter();
  const { user, isAdmin, signOut } = useAuth();
  const supabase = createClientSideSupabaseClient();

  useEffect(() => {
    checkAuth();
  }, [user, isAdmin]);

  const checkAuth = async () => {
    if (!user || !isAdmin) {
      router.push('/admin/login');
    } else {
      setIsLoading(false);
      fetchSneakers();
      fetchOrders();
      fetchCustomers();
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/admin/login');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
    }
  };

  const fetchSneakers = async () => {
    const { data, error } = await supabase.from('sneakers').select('*');
    if (error) {
      toast.error('Failed to fetch sneakers');
    } else {
    }
  };

  const fetchOrders = async () => {
    const { data, error } = await supabase.from('orders').select('*');
    if (error) {
      toast.error('Failed to fetch orders');
    } else {
    }
  };

  const fetchCustomers = async () => {
    const { data, error } = await supabase.from('customers').select('*');
    if (error) {
      toast.error('Failed to fetch customers');
    } else {
    }
  };

  // ... (rest of the component code remains the same)

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button onClick={handleLogout}>Log Out</Button>
      </div>
      {/* ... (rest of the JSX remains the same) */}
    </div>
  );
}