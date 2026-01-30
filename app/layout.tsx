import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

// viewport 
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2563eb',
};

export const metadata: Metadata = {
  
  metadataBase: new URL('https://tech-blog-demo.vercel.app'), 
  
  title: {
    default: 'Tech Blog - Latest Technology Articles',
    template: '%s | Tech Blog', 
  },
  description: 'Discover the latest in technology, programming, and software development with our curated articles.',
  keywords: ['technology', 'programming', 'web development', 'software', 'tutorials'],
  authors: [{ name: 'Goutam Maity' }], 
  
  //  Open Graph (Facebook/LinkedIn)
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Tech Blog',
    title: 'Tech Blog - Latest Technology Articles',
    description: 'Discover the latest in technology, programming, and software development.',
    images: [
      {
        url: '/og-image.jpg', // 
        width: 1200,
        height: 630,
        alt: 'Tech Blog Preview',
      },
    ],
  },

  // 4. twitter Card (Requirement )
  twitter: {
    card: 'summary_large_image',
    title: 'Tech Blog - Latest Technology Articles',
    description: 'Discover the latest in technology, programming, and software development.',
    images: ['/og-image.jpg'],
  },
  
  // 5. robots Settings
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}