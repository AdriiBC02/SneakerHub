'use client';

import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '@/src/components/ui/button';
import { Card, CardContent, CardFooter } from '@/src/components/ui/card';
import Image from 'next/image';
import { useCart } from '@/src/lib/CartContext';
import { toast } from 'sonner';
import { supabase } from '@/src/lib/supabase';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Sneaker = {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  featured: boolean;
};

export default function FeaturedSneakers() {
  const [sneakers, setSneakers] = useState<Sneaker[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 640px)': { slidesToScroll: 2 },
      '(min-width: 768px)': { slidesToScroll: 3 },
    },
  });
  const { addToCart } = useCart();

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    const fetchSneakers = async () => {
      try {
        const { data, error } = await supabase
          .from('sneakers')
          .select('*')
          .eq('featured', true)
          .limit(6);

        if (error) {
          throw error;
        }

        setSneakers(data || []);
      } catch (error) {
        console.error('Error fetching featured sneakers:', error);
        toast.error("Failed to load featured sneakers");
      }
    };

    fetchSneakers();
  }, []);

  const handleAddToCart = (sneaker: Sneaker) => {
    addToCart(sneaker);
    toast.success(`${sneaker.name} has been added to your cart`);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Sneakers</h2>
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {sneakers.map((sneaker) => (
              <div key={sneaker.id} className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.33%] min-w-0 px-2">
                <Card className="overflow-hidden h-full flex flex-col">
                  <CardContent className="p-4 flex-grow">
                    <div className="aspect-w-4 aspect-h-3 mb-4 relative">
                      <Image
                        src={sneaker.image}
                        alt={sneaker.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    </div>
                    <h3 className="text-xl font-semibold">{sneaker.name}</h3>
                    <p className="text-muted-foreground">{sneaker.brand}</p>
                    <p className="text-lg font-bold mt-2">${sneaker.price.toFixed(2)}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => handleAddToCart(sneaker)}>Add to Cart</Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
          onClick={scrollPrev}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
          onClick={scrollNext}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}