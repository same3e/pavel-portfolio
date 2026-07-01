import type { Metadata, Viewport } from "next";
import { MotionShell } from "@/components/MotionShell";
import { site } from "@/content/portfolio";
import "./globals.css";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  robots: { index: true, follow: true },
  openGraph: {
    title: site.title,
    description: site.description,
    type: "website"
  }
};

export const viewport: Viewport = {
  themeColor: "#F2F0EA",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MotionShell>{children}</MotionShell>
      </body>
    </html>
  );
}
