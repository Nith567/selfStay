import Providers from "@/components/Providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Header } from "@/components/header";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "self stay",
  description: "unified payments pay at hostels and enjoy vacation",
  icons: ["/logo/logo-dark.png"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Providers>
          <Toaster 
            position="top-right"
            toastOptions={{
              style: {
                background: '#18181b',
                color: '#fff',
                border: '1px solid #27272a',
              },
              duration: 4000,
            }}
          />
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
