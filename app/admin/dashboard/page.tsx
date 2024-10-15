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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Sneaker = {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  description: string;
  featured: boolean;
};

type Order = {
  id: string;
  user_id: string;
  total: number;
  status: string;
  created_at: string;
  items: string;
};

export default function AdminDashboard() {
  const [sneakers, setSneakers] = useState<Sneaker[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [editingSneaker, setEditingSneaker] = useState<Sneaker | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { user, isAdmin } = useAuth();
  const supabase = createClientSideSupabaseClient();

  useEffect(() => {
    checkAuth();
  }, [user, isAdmin]);

  const checkAuth = async () => {
    if (!user || !isAdmin) {
      router.push('/login');
    } else {
      setIsLoading(false);
      fetchSneakers();
      fetchOrders();
    }
  };

  const fetchSneakers = async () => {
    const { data, error } = await supabase.from('sneakers').select('*');
    if (error) {
      toast.error('Failed to fetch sneakers');
    } else {
      setSneakers(data);
    }
  };

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      toast.error('Failed to fetch orders');
    } else {
      setOrders(data);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const sneakerData = Object.fromEntries(formData.entries());

    try {
      if (editingSneaker) {
        const { error } = await supabase
          .from('sneakers')
          .update(sneakerData)
          .eq('id', editingSneaker.id);
        if (error) throw error;
        toast.success('Sneaker updated successfully');
      } else {
        const { error } = await supabase.from('sneakers').insert(sneakerData);
        if (error) throw error;
        toast.success('Sneaker added successfully');
      }
      fetchSneakers();
      setEditingSneaker(null);
      form.reset();
    } catch (error) {
      console.error('Error submitting sneaker:', error);
      toast.error('Failed to submit sneaker');
    }
  };

  const handleEdit = (sneaker: Sneaker) => {
    setEditingSneaker(sneaker);
  };

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase.from('sneakers').delete().eq('id', id);
      if (error) throw error;
      toast.success('Sneaker deleted successfully');
      fetchSneakers();
    } catch (error) {
      console.error('Error deleting sneaker:', error);
      toast.error('Failed to delete sneaker');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button onClick={handleLogout}>Log Out</Button>
      </div>

      <Tabs defaultValue="sneakers">
        <TabsList>
          <TabsTrigger value="sneakers">Manage Sneakers</TabsTrigger>
          <TabsTrigger value="orders">View Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="sneakers">
          <Card>
            <CardHeader>
              <CardTitle>
                {editingSneaker ? 'Edit Sneaker' : 'Add New Sneaker'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  name="name"
                  placeholder="Sneaker Name"
                  defaultValue={editingSneaker?.name}
                  required
                />
                <Input
                  name="brand"
                  placeholder="Brand"
                  defaultValue={editingSneaker?.brand}
                  required
                />
                <Input
                  name="price"
                  type="number"
                  step="0.01"
                  placeholder="Price"
                  defaultValue={editingSneaker?.price}
                  required
                />
                <Input
                  name="image"
                  placeholder="Image URL"
                  defaultValue={editingSneaker?.image}
                  required
                />
                <Textarea
                  name="description"
                  placeholder="Description"
                  defaultValue={editingSneaker?.description}
                />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    name="featured"
                    defaultChecked={editingSneaker?.featured}
                  />
                  <label htmlFor="featured">Featured</label>
                </div>
                <Button type="submit">
                  {editingSneaker ? 'Update' : 'Add'} Sneaker
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Sneaker Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sneakers.map((sneaker) => (
                    <TableRow key={sneaker.id}>
                      <TableCell>{sneaker.name}</TableCell>
                      <TableCell>{sneaker.brand}</TableCell>
                      <TableCell>${sneaker.price.toFixed(2)}</TableCell>
                      <TableCell>{sneaker.featured ? 'Yes' : 'No'}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          onClick={() => handleEdit(sneaker)}
                          className="mr-2"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(sneaker.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>
                        {new Date(order.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>{order.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}