import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

// Define metadata for the application (used for SEO and browser tab info)
export const metadata: Metadata = {
  title: 'SpaceX Dashboard', // Title of the web app
  description: 'A dashboard for SpaceX launches', // Description for SEO
};

// Root layout component that wraps all pages
export default function RootLayout({
  children, // All child components/pages will be rendered here
}: {
  children: React.ReactNode; // Type definition for children
}) {
  return (
    <html lang="en" className="bg-white text-black">
      {/* Apply font and custom body class */}
      <body className={`${inter.className} root-body`}>
        {/* Main container for the app content */}
        <div className="root-container">
          {children}
        </div>
      </body>
    </html>
  );
}