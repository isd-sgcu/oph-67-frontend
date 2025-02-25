'use client'

import Link from 'next/link'

interface ImageItem {
  title: string
  url: string
}

const Actionbutton: React.FC<ImageItem> = ({ title, url }) => {
  return (
    <Link
      aria-label={title}
      className='bg-center0 h-full w-full rounded-lg bg-cover'
      href={url}
      style={{
        backgroundImage: `url(/homepage/${title}.svg)`,
      }}
    />
  )
}

export default Actionbutton
