import Image from 'next/image'
import React from 'react'

const SuchibatPage: React.FC = () => {
  const numberOfPages = 21

  return (
    <div className='w-full'>
      {Array.from({ length: numberOfPages }, (_, i) => (
        <Image
          key={i}
          alt='Suchibat'
          className='max-w-full'
          height={848}
          src={`/assets/suchibat/${i + 1}.png`}
          width={600}
        />
      ))}
    </div>
  )
}

export default SuchibatPage
