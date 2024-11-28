import './globals.css'

import { IBM_Plex_Sans } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const ibmFlexSans = IBM_Plex_Sans({
  weight: ['200', '300', '400', '500', '600'],
  subsets: ['latin'],
})

export const metadata = {
  title: 'Supporty',
  description: 'Supporty beta',
}

export const viewport = {
  themeColor: '#FFFFFF',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScaleable: false,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${ibmFlexSans.className} bg-base-100`}>
        {children}
        <Toaster
          containerStyle={{ top: 30 }}
          toastOptions={{ duration: 1500, style: { fontSize: '0.875rem' } }}
        />
      </body>
    </html>
  )
}
