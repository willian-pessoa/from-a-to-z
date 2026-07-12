import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { AuthProvider } from "@/src/contexts/AuthContext";

import Header from "@/src/layout/Header";
import { HeaderProvider } from "@/src/contexts/HeaderContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "De A a Z",
  description:
    "Se desafia jogando com todos os campões possiveis e busque a vitoria com cada um deles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.className} h-full antialiased bg-emerald-950 text-emerald-50`}
    >
      <body className="flex h-screen flex-col overflow-hidden bg-emerald-950 text-emerald-50">
        <AuthProvider>
          <HeaderProvider>
            <TooltipPrimitive.Provider delayDuration={100}>
              <Header />
              <main className="flex-1 overflow-y-auto">{children}</main>
            </TooltipPrimitive.Provider>
          </HeaderProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
