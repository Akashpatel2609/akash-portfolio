import type { Metadata } from "next";
import { Syne, Manrope } from "next/font/google";
import { AnimatedBackground } from "@/components/animated-background";
import { Header } from "@/components/header";
import { profile } from "@/data/profile";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.seo.canonical),
  title: profile.seo.title,
  description: profile.seo.description,
  alternates: {
    canonical: profile.seo.canonical
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg"
  },
  openGraph: {
    title: profile.seo.title,
    description: profile.seo.description,
    type: "website",
    url: profile.seo.canonical,
    images: [profile.seo.image]
  },
  twitter: {
    card: "summary_large_image",
    title: profile.seo.title,
    description: profile.seo.description,
    images: [profile.seo.image]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${syne.variable} ${manrope.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AnimatedBackground />
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
