import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Qirat Saeed | Agentic AI Developer & Full-Stack Engineer',
  description: 'Portfolio of Qirat Saeed - Specialist in Agentic AI, Autonomous Systems, and Full-Stack Development. Building intelligent agents and scalable applications with Next.js, Python, and modern AI technologies.',
  keywords: ['Agentic AI', 'AI Developer', 'Full-Stack Engineer', 'Next.js', 'TypeScript', 'Python', 'Autonomous Systems', 'LLM Integration', 'Prompt Engineering'],
  authors: [{ name: 'Qirat Saeed' }],
  openGraph: {
    title: 'Qirat Saeed | Agentic AI Developer & Full-Stack Engineer',
    description: 'Building autonomous AI systems and scalable full-stack applications',
    url: 'https://your-domain.vercel.app',
    siteName: 'Qirat Saeed Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Qirat Saeed | Agentic AI Developer',
    description: 'Building autonomous AI systems and scalable applications',
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
