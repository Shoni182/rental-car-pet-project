import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import './globals.css';
import { Toaster } from 'react-hot-toast';
// Pages
import Header from '@/components/Header/Header';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-family',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--second-family',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Rental Car',
  description:
    'Find and book your perfect rental car. Reliable and budget-friendly rentals for any journey.',
  openGraph: {
    title: 'Rental Car',
    description:
      'Find and book your perfect rental car. Reliable and budget-friendly rentals for any journey.',
    url: 'https://rental-car-pet-project.vercel.app',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 640,
        height: 640,
        alt: 'Rental Car logo image',
      },
    ],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body>
        <TanStackProvider>
          <Header />
          <Toaster position="top-right" />
          {children}
        </TanStackProvider>
      </body>
    </html>
  );
}
