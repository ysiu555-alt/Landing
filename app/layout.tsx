import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/lib/auth-context'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'Kaliang — оптимизация для GTA 5 RP, Rust, CS 2',
  description:
    'Лёгкая утилита для глубокой оптимизации Windows под популярные игры: GTA 5 RP, Rust, CS 2.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AuthProvider>
            {children}
            <Toaster position="top-center" richColors />
            {/* Vercel Analytics disabled for Cloudflare Pages compatibility */}
            {/* {process.env.NODE_ENV === 'production' && <Analytics />} */}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
