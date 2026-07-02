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

const themeScript = `
(() => {
  try {
    const stored = localStorage.getItem("theme");
    const theme = stored === "light" || stored === "dark"
      ? stored
      : (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.dataset.theme = theme;
  } catch (_) {}
})();
`;

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <MotionShell>{children}</MotionShell>
      </body>
    </html>
  );
}
