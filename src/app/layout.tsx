import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
const inter = localFont({
  src: "../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900"
});

const title = "Akash Patel — Systems with a purpose";
const description = "Toronto data analyst and applied AI builder. Explore executive analytics, data engineering and PrepWise interview feedback.";
export const viewport: Viewport = { themeColor: "#faf8f5" };
export const metadata: Metadata = {
  metadataBase: new URL("https://akashpatel.tech"), title, description,
  alternates: { canonical: "/" },
  icons: { icon: "/assets/akash.webp", apple: "/assets/akash.webp" },
  openGraph: { title, description, type: "website", url: "/", images: ["/assets/hero-light.webp"] },
  twitter: { card: "summary_large_image", title, description, images: ["/assets/hero-light.webp"] }
};
const themeScript = `try{const t=localStorage.getItem('ap-porcelain-theme');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t;document.documentElement.classList.toggle('dark',t==='dark');}}catch{}`;

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
