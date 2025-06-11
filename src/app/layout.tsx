import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast"; // Import Toaster

export const metadata: Metadata = {
  title: "Next.js Auth App",
  description: "Authentication application built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster /> {/* Add Toaster component here */}
      </body>
    </html>
  );
}
