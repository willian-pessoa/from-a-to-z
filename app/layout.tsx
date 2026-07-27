import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { NextIntlClientProvider } from "next-intl";

import { AuthProvider } from "@/src/contexts/AuthContext";

import Header from "@/src/layout/Header";
import { HeaderProvider } from "@/src/contexts/HeaderContext";
import AppToaster from "@/src/components/AppToaster";
import { getLocale } from "next-intl/server";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "De A à Z",
  icons: {
    icon: "/favicon.ico",
  },
  description:
    "Desafie-se jogando com todos os campões possíveis e busque a vitória com cada um deles.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`${inter.className} h-full antialiased bg-emerald-950 text-emerald-50`}
    >
      <body className="flex h-screen flex-col overflow-hidden bg-emerald-950 text-emerald-50">
        <NextIntlClientProvider>
          <AuthProvider>
            <HeaderProvider>
              <TooltipPrimitive.Provider delayDuration={100}>
                <Header />
                <AppToaster />
                <main className="flex-1 overflow-y-auto">{children}</main>
              </TooltipPrimitive.Provider>
            </HeaderProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
