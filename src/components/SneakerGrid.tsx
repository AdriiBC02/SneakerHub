'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { useCart } from '@/src/lib/CartContext';
import { toast } from 'sonner';
import { supabase } from '@/src/lib/supabase';

type Sneaker = {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  featured: boolean;
};

type SneakerGridProps = {
  limit?: number;
  featuredOnly?: boolean;
};

export default function SneakerGrid({ limit, featuredOnly = false }: SneakerGridProps) {
  const [sneakers, setSneakers] = useState<Sneaker[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchSneakers = async () => {
      try {
        let query = supabase.from('sneakers').select('*');
        
        if (featuredOnly) {
          query = query.eq('featured', true);
        }
        
        if (limit) {
          query = query.limit(limit);
        }

        const { data, error } = await query;

        if (error) {
          throw error;
        }

        setSneakers(data || []);
      } catch (error) {
        console.error('Error fetching sneakers:', error);
        toast.error("Failed to load sneakers");
      } finally {
        setLoading(false);
      }
    };

    fetchSneakers();
  }, [limit, featuredOnly]);

  const handleAddToCart = (sneaker: Sneaker) => {
    addToCart(sneaker);
    toast.success(`${sneaker.name} has been added to your cart`);
  };

  if (loading) {
    return <div className="text-center py-12">Loading sneakers...</div>;
  }

  if (sneakers.length === 0) {
    return <div className="text-center py-12">No sneakers available at the moment.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {sneakers.map((sneaker) => (
        <Card key={sneaker.id} className="overflow-hidden">
          <CardContent className="p-0">
            <Image
              src={sneaker.image}
              alt={sneaker.name}
              width={400}
              height={300}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{sneaker.name}</h3>
              <p className="text-gray-600">{sneaker.brand}</p>
              <p className="text-lg font-bold mt-2">${sneaker.price.toFixed(2)}</p>
              {sneaker.featured && (
                <span className="bg-yellow-400 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">Featured</span>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => handleAddToCart(sneaker)}>Add to Cart</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}