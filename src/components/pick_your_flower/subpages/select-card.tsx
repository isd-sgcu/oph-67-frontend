import Image from 'next/image'

import FlowerCard from '@/components/pick_your_flower/flower-card'

interface SelectFlowerProps {
  selectedCard: number | null
  cardList: string[]
  handleClick: () => void
}

const SelectCard: React.FC<SelectFlowerProps> = ({
  selectedCard,
  handleClick,
  cardList,
}) => {
  return (
    <div className='flex h-auto flex-col items-center bg-gradient-to-b from-[#FAE9F3] to-[#DD579B] px-6 py-10'>
      <div className='flex items-center justify-center gap-1'>
        <Image
          alt='flower'
          height={25}
          src='/assets/pick_your_flower/flower.svg'
          width={25}
        />
        <div className='font-mitr text-2xl font-normal tracking-tight text-primary-green'>
          เลือกการ์ดเพื่อเปิด
        </div>
      </div>
      <div className='font-mitr text-base font-normal tracking-tight text-primary-green'>
        Pick Your Card
      </div>
      <div className='mb-16 mt-6 grid grid-cols-3 gap-3'>
        {cardList.map((cardImage: string, index: number) => (
          <FlowerCard
            key={cardImage}
            image={
              selectedCard === index
                ? cardImage
                : '/assets/pick_your_flower/flower-card-cover.png'
            }
            onClick={handleClick}
          />
        ))}
      </div>
    </div>
  )
}

export default SelectCard
