import { getMessages, setRequestLocale } from "next-intl/server";
import "./globals.css";

import { IBM_Plex_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";

const ibmFlexSans = IBM_Plex_Sans({
  weight: ["200", "300", "400", "500", "600"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Supporty",
  description: "Supporty beta",
};

export const viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScaleable: false,
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages(); // Enable static rendering
  setRequestLocale(locale);

  return (
    <html lang="en">
      <body className={`${ibmFlexSans.className} bg-base-100`}>
        <NextIntlClientProvider messages={messages}>
          {children}
          <Toaster
            containerStyle={{ top: 30 }}
            toastOptions={{ duration: 1500, style: { fontSize: "0.875rem" } }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
