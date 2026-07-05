import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'DealApp — Săn deal thông minh',
  description: 'Tổng hợp deal từ Shopee, Lazada, TikTok Shop. Theo dõi giá, nhận thông báo khi giảm giá.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className={`${geistSans.variable} ${geistMono.variable}`} style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  )
}