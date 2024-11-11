'use client';

import { useCart } from '@/src/lib/CartContext';
import { Button } from '@/src/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Link } from '@/src/i18n/routing';

export default function Cart() {
  const { cart, removeFromCart } = useCart();
  const router = useRouter();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    router.push('/${currentLang}/checkout');
  };

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
        <Button className="mt-4" onClick={handleCheckout}>Proceed to Checkout</Button>
      </div>
    </div>
  );
}
