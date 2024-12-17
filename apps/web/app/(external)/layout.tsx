import "./globals.css";

import { IBM_Plex_Sans } from "next/font/google";

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

export default function ExternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={`${ibmFlexSans.className} bg-base-100`}>{children}</body>
    </html>
  );
}
