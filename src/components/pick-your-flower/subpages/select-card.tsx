import Image from 'next/image'
import React from 'react'

import { config } from '@/app/config'
import FlowerCard from '@/components/pick-your-flower/flower-card'

interface SelectFlowerProps {
  selectedCard: number | null
  cardList: string[]
  handleClick: (index: number) => void
}

const SelectCard: React.FC<SelectFlowerProps> = ({
  selectedCard,
  handleClick,
  cardList,
}) => {
  return (
    <div className='relative flex h-auto flex-col items-center bg-gradient-to-b from-[#FAE9F3] to-[#DD579B] px-6 py-10'>
      <object
        className='absolute -left-12 top-1/3 z-0 h-[130px] w-[130px]'
        data={`${config.cdnURL}/assets/pick-your-flower/flower-white-l.svg`}
        type='image/svg+xml'
      >
        <Image
          alt='background flower'
          className='absolute left-0 top-1/3 z-0'
          height={92}
          src={`${config.cdnURL}/assets/pick-your-flower/flower-white-l.svg`}
          width={92}
        />
      </object>
      <object
        className='absolute right-0 top-6 z-0 h-[140px] w-[140px]'
        data={`${config.cdnURL}/assets/pick-your-flower/flower-white-r.svg`}
        type='image/svg+xml'
      >
        <Image
          alt='background flower'
          className='absolute right-0 top-0 z-0'
          height={92}
          src={`${config.cdnURL}/assets/pick-your-flower/flower-white-r.svg`}
          width={92}
        />
      </object>
      <object
        className='absolute bottom-10 right-0 z-0 h-[100px] w-[100px]'
        data={`${config.cdnURL}/assets/pick-your-flower/flower-white-r.svg`}
        type='image/svg+xml'
      >
        <Image
          alt='background flower'
          className='absolute bottom-10 right-0 z-0'
          height={75}
          src={`${config.cdnURL}/assets/pick-your-flower/flower-white-r.svg`}
          width={75}
        />
      </object>
      <div className='relative z-10 flex items-center justify-center gap-1'>
        <Image
          alt='flower'
          height={25}
          src={`${config.cdnURL}/assets/pick-your-flower/flower.svg`}
          width={25}
        />
        <div className='font-mitr text-2xl font-normal tracking-tight text-primary-green'>
          เลือกการ์ดเพื่อเปิด
        </div>
      </div>
      <div className='relative z-10 font-mitr text-base font-normal tracking-tight text-primary-green'>
        Pick Your Card
      </div>
      <div className='relative z-10 mb-6 mt-6 grid grid-cols-3 gap-2.5'>
        {cardList.map((cardImage: string, index: number) => (
          <FlowerCard
            key={cardImage}
            image={
              selectedCard === index
                ? cardImage
                : `/assets/pick-your-flower/card/your-flower-cover.png`
            }
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default SelectCard
