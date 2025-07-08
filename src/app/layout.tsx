// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SpaceX Dashboard',
  description: 'A dashboard for SpaceX launches',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-white text-black">
      <body className={`${inter.className} root-body`}>
        <div className="root-container">
          {children}
        </div>
      </body>
    </html>
  );
}