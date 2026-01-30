import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tech Blog - Latest Technology Articles & Tutorials',
  description: 'Discover the latest in technology, programming, and software development with our curated articles.',
  keywords: ['technology', 'programming', 'web development', 'software', 'tutorials'],
  authors: [{ name: 'Tech Blog Team' }],
  openGraph: {
    type: 'website',
    title: 'Tech Blog',
    description: 'Latest technology articles and tutorials',
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