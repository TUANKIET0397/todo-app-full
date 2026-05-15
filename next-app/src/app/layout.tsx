
import { Inter } from 'next/font/google'
import { AntdRegistry } from '@ant-design/nextjs-registry';
import '@/app/globals.css'

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'KietCoder',
  description: 'A simple Next.js application with Ant Design',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          {children}
        </AntdRegistry>
      </body>
    </html>
  )
}