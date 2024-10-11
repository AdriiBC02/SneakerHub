'use client';

import { useCart } from '@/lib/CartContext';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        <p className="mb-4">Your cart is currently empty.</p>
        <Button asChild>
          <Link href="/sneakers">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      {cart.map((item) => (
        <div key={item.id} className="flex items-center justify-between border-b py-4">
          <div className="flex items-center">
            <Image src={item.image} alt={item.name} width={80} height={80} className="mr-4" />
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">{item.brand}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold">${item.price * item.quantity}</p>
            <Button variant="destructive" size="sm" onClick={() => removeFromCart(item.id)}>Remove</Button>
          </div>
        </div>
      ))}
      <div className="mt-8">
        <p className="text-xl font-bold">Total: ${total}</p>
        <Button className="mt-4">Proceed to Checkout</Button>
      </div>
    </div>
  );
}