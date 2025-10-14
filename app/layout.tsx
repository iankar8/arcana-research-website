import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://arcanaadvisors.com'),
  title: "Arcana Advisors — AI Expertise for Financial Services",
  description: "Custom agents, bank-grade evals, and compliant workflows—shipped fast, governed well.",
  openGraph: {
    title: "Arcana Advisors — AI Expertise for Financial Services",
    description: "Custom agents, bank-grade evals, and compliant workflows—shipped fast, governed well.",
    type: "website",
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: "Arcana Advisors mark on porcelain background",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arcana Advisors — AI Expertise for Financial Services",
    description: "Custom agents, bank-grade evals, and compliant workflows—shipped fast, governed well.",
    images: ["/og.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Arcana Advisors",
        url: "https://arcanaadvisors.com",
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: "hello@arcanaadvisors.com",
        },
      },
      {
        "@type": "WebSite",
        name: "Arcana Advisors — AI Expertise for Financial Services",
        url: "https://arcanaadvisors.com",
        potentialAction: {
          "@type": "ContactAction",
          target: "https://arcanaadvisors.com/#contact",
        },
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${dmSerif.variable}`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </body>
    </html>
  );
}
