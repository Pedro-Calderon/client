import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./components/ClientLayout";
import { Providers } from "./providers";
const geistSans = Geist({
    weight: ["300", "400", "500", "600", "700"],
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InnovaTube",
  description: "Sitio web para ver videos de YouTube",
  icons: {
    icon: "/icons8-youtube.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
        <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
