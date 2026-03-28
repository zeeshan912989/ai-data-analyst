import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DataMind AI | AI-Powered Data Analyst",
  description: "Upload CSV or Excel files and get instant AI-powered insights, automated charts, and business intelligence. No SQL needed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}

        {/* Paddle.js — Payment Gateway Script */}
        <Script 
          src="https://cdn.paddle.com/paddle/v2/paddle.js"
          strategy="lazyOnload"
          onLoad={() => {
            if (typeof window !== 'undefined' && (window as any).Paddle) {
              // Use sandbox for testing, switch to live for production
              const paddleEnv = process.env.NEXT_PUBLIC_PADDLE_ENV || 'sandbox';
              if (paddleEnv === 'sandbox') {
                (window as any).Paddle.Environment.set('sandbox');
              }
              (window as any).Paddle.Initialize({
                token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || 'test_token_here',
              });
            }
          }}
        />
      </body>
    </html>
  );
}
