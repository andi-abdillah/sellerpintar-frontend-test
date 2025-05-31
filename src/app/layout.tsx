import type { Metadata } from "next";
import "./globals.css";
import { ReactQueryProvider } from "@/provider/react-query-provider";
import { AuthProvider } from "@/provider/auth-context";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: {
    default: "Seller Pintar Indonesia",
    template: "%s | Seller Pintar Indonesia",
  },
  description: "A powerful platform for Indonesian sellers.",
  icons: {
    icon: "/assets/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </head>
      <body
        className="font-archivo antialiased"
      >
        <AuthProvider>
          <ReactQueryProvider>
            <Suspense>
              {children}
            </Suspense>
          </ReactQueryProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
