import "./globals.css";
import type { Metadata } from "next";
import { NextAuthProvider } from "./providers";

export const metadata: Metadata = {
  title: "CMS",
  description: "Simple CMS made using AWS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen">
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
