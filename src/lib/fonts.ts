import { Anuphan, Mitr, Ubuntu } from 'next/font/google'
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

export const mitr = Mitr({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-mitr',
})

export const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-ubuntu',
})

export const thSaraban = localFont({
  src: '../../public/fonts/THSarabunNew.ttf',
  display: 'swap',
  variable: '--font-thSaraban',
})
