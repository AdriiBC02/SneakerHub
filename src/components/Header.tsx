'use client';

import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { useCart } from '@/src/lib/CartContext';
import { useState, useEffect } from 'react';
import { Button } from '@/src/components/ui/button';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useAuth } from '@/src/lib/AuthProvider';
import { Link } from '../i18n/routing';

export default function Header() {
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, isAdmin } = useAuth();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const getDashboardLink = () => {
    if (!user) return '/login';
    if (isAdmin) return '/admin/dashboard';
    return '/dashboard';
  };

  if (!mounted) {
    return null;
  }

  return (
    <header className="bg-background shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-foreground">
          Sneaker<span className="text-primary dark:text-[#ff6b00]">Hub</span>
        </Link>
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li><Link href="/" className="text-foreground hover:text-gray-800">Home</Link></li>
            <li><Link href="/sneakers" className="text-foreground hover:text-gray-800">Sneakers</Link></li>
            <li><Link href="/about" className="text-foreground hover:text-gray-800">About</Link></li>
            <li><Link href="/contact" className="text-foreground hover:text-gray-800">Contact</Link></li>
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="text-foreground"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Link href="/cart" className="text-foreground hover:text-gray-800 relative">
            <ShoppingCart />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {itemCount}
              </span>
            )}
          </Link>
          <Link href={getDashboardLink()} className="text-foreground hover:text-gray-800">
            <User />
          </Link>
          <button className="md:hidden text-foreground" onClick={toggleMenu}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-background">
          <ul className="flex flex-col space-y-2 p-4">
            <li><Link href="/" className="text-foreground hover:text-gray-800" onClick={toggleMenu}>Home</Link></li>
            <li><Link href="/sneakers" className="text-foreground hover:text-gray-800" onClick={toggleMenu}>Sneakers</Link></li>
            <li><Link href="/about" className="text-foreground hover:text-gray-800" onClick={toggleMenu}>About</Link></li>
            <li><Link href="/contact" className="text-foreground hover:text-gray-800" onClick={toggleMenu}>Contact</Link></li>
            <li><Link href={getDashboardLink()} className="text-foreground hover:text-gray-800" onClick={toggleMenu}>{user ? (isAdmin ? "Admin Dashboard" : "Dashboard") : "Login"}</Link></li>
          </ul>
        </div>
      )}
    </header>
  );
}