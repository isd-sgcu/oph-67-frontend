import { Anuphan } from 'next/font/google'
import localFont from 'next/font/local'

export const cloudSoft = localFont({
  src: '../../public/fonts/cloud-soft.otf',
  display: 'swap',
  variable: '--font-cloud-soft',
})

export const anuphan = Anuphan({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-anuphan',
})
