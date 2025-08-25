import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '观音灵签 - 在线求签问卦',
  description: '传统观音灵签在线抽取，结合AI智能解签，为您答疑解惑，指引人生方向。',
  keywords: '观音灵签,在线抽签,求签问卦,AI解签,传统文化',
  authors: [{ name: '观音灵签' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
        {children}
      </body>
    </html>
  )
}