import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/Navbar";
import { APPNAME } from "@/lib/consts";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${APPNAME} - Get Rented™`,
  description: "An app to make landlords and tenants hate each other less",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        <main className="min-h-[calc(100vh-88px)]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
