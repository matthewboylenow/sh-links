import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "@fontsource/libre-baskerville/400.css";
import "@fontsource/libre-baskerville/400-italic.css";
import "@fontsource/libre-baskerville/700.css";
import "@fontsource/libre-franklin/400.css";
import "@fontsource/libre-franklin/500.css";
import "@fontsource/libre-franklin/600.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://links.sainthelen.org"),
  title: "Saint Helen, Westfield NJ",
  description:
    "Links from Saint Helen in Westfield, NJ: what's happening this week, the livestream, the podcast and how to get connected.",
  icons: { icon: "/favicon.png", apple: "/apple-touch-icon.png" },
  openGraph: {
    title: "Saint Helen, Westfield NJ",
    description: "What's happening at Saint Helen this week.",
    images: ["/og.jpg"],
  },
};

export const viewport: Viewport = { themeColor: "#1F346D" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
