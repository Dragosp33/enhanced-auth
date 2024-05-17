import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Footer from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | DPC Auth',
    default: 'Next auth',
  },
  description: 'DPC Auth dashboard.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
  generator: 'Next.js',
  applicationName: 'DPC Auth',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'Next.js',
    'React',
    'JavaScript',
    'auth.js',
    'mongodb',
    'next-auth',
    'DPC',
    'Dashboard',
  ],
  authors: [{ name: 'Dragos Polifronie', url: 'https://github.com/Dragosp33' }],
  creator: 'Dragos Polifronie',
  publisher: 'Dragos Polifronie',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
