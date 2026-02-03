import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Caiked Up | DJ. Creator. Vibe.",
  description:
    "Caiked Up is a dynamic DJ known for blending house and bass trap flavors into high-energy sets. Available for festivals, clubs, weddings, and events throughout the Midwest.",
  keywords: [
    "DJ",
    "Minneapolis DJ",
    "Wedding DJ",
    "Festival DJ",
    "Caiked Up",
    "Caikin Fortin",
    "Electronic Music",
    "House Music",
    "Bass Trap",
    "Midwest DJ",
  ],
  authors: [{ name: "Caiked Up" }],
  openGraph: {
    title: "Caiked Up | DJ. Creator. Vibe.",
    description:
      "Unifying crowds with sound — festivals, clubs, weddings & live events throughout the Midwest.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/Headshot.JPG",
        width: 1200,
        height: 630,
        alt: "Caiked Up - DJ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Caiked Up | DJ. Creator. Vibe.",
    description:
      "Unifying crowds with sound — festivals, clubs, weddings & live events.",
    images: ["/images/Headshot.JPG"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/Logo White@2x.PNG" />
        <meta name="theme-color" content="#0a0a0f" />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${dmSans.variable} font-sans antialiased bg-[#0a0a0f]`}
      >
        {children}
      </body>
    </html>
  );
}
