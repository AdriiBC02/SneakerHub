import '../../styles/globals.css';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter } from 'next/font/google';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { CartProvider } from '@/src/lib/CartContext';
import { AuthProvider } from '@/src/lib/AuthProvider';
import { Toaster } from '@/src/components/ui/toaster';
import { ThemeProvider } from '@/src/components/ThemeProvider';
import CookieBanner from '@/src/components/CookieBanner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'SneakerHub - Your Ultimate Sneaker Store',
    description: 'Find the latest and greatest sneakers at SneakerHub',
};

export default async function LocaleLayout({
    children,
    params: { locale }
}: {
    children: React.ReactNode,
    params: { locale: string };
}) {
    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={inter.className}>
                <NextIntlClientProvider messages={messages}>
                    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                        <AuthProvider>
                            <CartProvider>
                                <div className="flex flex-col min-h-screen">
                                    <Header />
                                    <main className="flex-grow">
                                        {children}
                                    </main>
                                    <Footer />
                                </div>
                                <CookieBanner />
                            </CartProvider>
                        </AuthProvider>
                        <Toaster />
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}