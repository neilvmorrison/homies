import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/Navbar";
import { APPNAME } from "@/lib/consts";
import { Suspense } from "react";
import { getUserProfileId } from "./actions";
import { createClient } from "@/utils/supabase/server";
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
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar user={data?.user} />
        <Suspense fallback={<h1>Fuck you!</h1>}>{children}</Suspense>
        <Footer />
      </body>
    </html>
  );
}
