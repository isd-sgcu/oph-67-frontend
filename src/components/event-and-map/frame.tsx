'use client'

import Image from 'next/image'

import { config } from '@/app/config'

interface Framedetail {
  imgPath: string
  hasBorder: boolean
}

const Frame: React.FC<Framedetail> = ({ imgPath, hasBorder }) => {
  return (
    <div
      className={`relative inline-block ${hasBorder ? 'border-[1px] p-2' : ''} box-border border-[#DD579B]`}
    >
      {hasBorder ? (
        <Image
          alt='butterfly'
          className='absolute right-0 top-0 -translate-y-4 translate-x-5 rounded-sm'
          height={32}
          src={`${config.cdnURL}/assets/event_map/butterfly.svg`}
          width={32}
        />
      ) : null}
      <Image alt={imgPath} height={322} src={imgPath} width={302} />
      {hasBorder ? (
        <>
          <Image
            alt='leaf'
            className='absolute bottom-0 left-0 -translate-x-4 -translate-y-2'
            height={20}
            src={`${config.cdnURL}/assets/event_map/leaf1.svg`}
            width={20}
          />
          <Image
            alt='leaf'
            className='absolute bottom-0 left-0 translate-y-3'
            height={20}
            src={`${config.cdnURL}/assets/event_map/leaf2.svg`}
            width={20}
          />
          <Image
            alt='flower'
            className='absolute bottom-0 left-0 -translate-x-4 translate-y-2'
            height={24}
            src={`${config.cdnURL}/assets/event_map/flower.svg`}
            width={24}
          />
        </>
      ) : null}
    </div>
  )
}

export default Frame
