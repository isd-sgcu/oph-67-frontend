'use client'

import Image from 'next/image'

const Footer: React.FC = () => {
  return (
    <div>
      {/* Footer Part 1 */}
      <div className='flex h-auto w-full flex-col gap-[9px] bg-[#F7D3E8] p-[13px]'>
        <div className='flex items-center justify-center gap-[21px]'>
          <div className='flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white' />
          <div className='flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white' />
          <div className='flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white' />
          <div className='flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white' />
        </div>
        <div className='flex flex-wrap items-center justify-center gap-[21px]'>
          <div className='flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white' />
          <div className='flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white' />
          <div className='flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white' />
          <div className='flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white' />
          <div className='flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white' />
          <div className='flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white' />
        </div>
      </div>

      {/* Footer Part 2 */}
      <div className='flex h-[38px] w-full items-center justify-center gap-[14.55px] bg-[#1C1B1F]'>
        <Image alt='logo' height={22} src='/homepage/isd_logo.svg' width={40} />
        <Image
          alt='logo'
          height={25.39}
          src='/homepage/orborjor_logo.svg'
          width={25.39}
        />
      </div>
    </div>
  )
}

export default Footer
