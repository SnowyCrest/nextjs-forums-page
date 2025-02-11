import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: 'Forums Page',
  description: 'A forum component built by SnowyCrest with Next.js and Supabase',
  openGraph: {
    title: 'Forums Page',
    description: 'A forum component built by SnowyCrest with Next.js and Supabase',
    images: [
      {
        url: '/forums_showcase_1.png', 
        width: 1200,
        height: 630,
        alt: 'Forums Page Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Forums Page',
    description: 'A forum component built by SnowyCrest with Next.js and Supabase',
    images: ['/forums_showcase_1.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
