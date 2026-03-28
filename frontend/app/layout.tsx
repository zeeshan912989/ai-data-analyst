import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PaddleLoader } from "@/components/paddle-loader";
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
        <PaddleLoader />
      </body>
    </html>
  );
}
