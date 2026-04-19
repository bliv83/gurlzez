import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gurlzez - A Cat's Journey",
  description: "Welcome to the life of Gurlzez, a curious and adventurous cat",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
