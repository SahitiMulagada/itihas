import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast';
import "./globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Itihas - Personal Portfolio",
  description: "Welcome to Itihas - A showcase of projects, thoughts, and innovations in technology.",
  keywords: ["portfolio", "web development", "projects", "blog", "technology"],
  icons: {
    icon: '/favicon.ico',
  },
  other: {
    'link': [
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased" suppressHydrationWarning={true}>
        <Toaster position="top-center" />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow pt-16">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
