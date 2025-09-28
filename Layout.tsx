'use client';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { CedarCopilot, ProviderConfig, CedarProvider } from 'cedar-os';
import { messageRenderers } from '@/cedar/messageRenderers';
import { cedarConfig } from '@/cedar/config';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const llmProvider: ProviderConfig = {
    provider: 'mastra' as const,
    baseURL: process.env.NEXT_PUBLIC_MASTRA_URL || 'http://localhost:4111',
  };

  return (
    <html lang="en">
      <body className={${geistSans.variable} ${geistMono.variable} antialiased}>
        <CedarProvider config={cedarConfig}>
          <CedarCopilot
            userId={'Test User'}
            threadId={'Test Thread'}
            llmProvider={llmProvider}
            messageRenderers={messageRenderers}
          >
            {children}
          </CedarCopilot>
        </CedarProvider>
      </body>
    </html>
  );
}
