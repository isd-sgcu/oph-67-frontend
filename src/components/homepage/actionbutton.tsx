'use client'

import Link from 'next/link'

import { config } from '@/app/config'

interface ImageItem {
  title: string
  url: string
}

const Actionbutton: React.FC<ImageItem> = ({ title, url }) => {
  return (
    <Link
      aria-label={title}
      className='h-[160px] w-full rounded-lg bg-cover bg-center'
      href={url}
      style={{
        backgroundImage: `url(${config.cdnURL}/assets/homepage/${title}.svg)`,
      }}
    />
  )
}

export default Actionbutton
