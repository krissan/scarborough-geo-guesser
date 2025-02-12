import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scarborough Geo Guesser",
  description: "A game to celebrate Scarborough and its spaces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white">
        {children}
      </body>
    </html>
  );
}
