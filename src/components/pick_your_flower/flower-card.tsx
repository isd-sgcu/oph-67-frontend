import Image from 'next/image'
import React from 'react'

interface FlowerCardProps {
  onClick?: () => void
  image: string
}

const FlowerCard: React.FC<FlowerCardProps> = ({ onClick, image }) => {
  return (
    <button
      className='shrink-0 cursor-pointer rounded-[10px] shadow-purple-500 transition-all duration-100 hover:scale-110'
      type='button'
      onClick={onClick}
    >
      <Image
        alt='Flower Card'
        className='rounded-[10px]'
        height={210}
        src={image}
        width={119}
      />
    </button>
  )
}

export default FlowerCard
