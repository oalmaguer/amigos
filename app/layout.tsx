import type { Metadata } from "next";
import "./ui/globals.css";
import Navbar from "./ui/navbar/page";
import Footer from "./ui/footer/page";
import { PetsProvider } from "@/context";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Amigos App",
  description: "Hecho por OLiver",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen h-screen flex flex-col">
        <PetsProvider>
          <Navbar />
          <div className="flex-grow">{children}</div>
          <Footer />
        </PetsProvider>
        <Toaster />
      </body>
    </html>
  );
}
