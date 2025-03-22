import Image from 'next/image'
import React from 'react'
import { Toaster } from 'react-hot-toast'

import { config } from '@/app/config'
import { Button } from '@/components/ui/button'
import { download } from '@/utils/download'

import InvitationCard from '../invitation-card'

interface FlowerResultProps {
  resultImage: string
  resultName: string
}

const FlowerResult: React.FC<FlowerResultProps> = ({
  resultImage,
  resultName,
}) => {
  const handleSave: () => void = () => {
    download(resultImage, resultName)
  }

  return (
    <div className='relative flex flex-col items-center gap-5 bg-gradient-to-b from-[#FFFFFF] to-[#EA88BD] px-6 py-10'>
      <Toaster
        position='top-center'
        toastOptions={{
          duration: 3000,
        }}
      />
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
      <div className='z-10 font-cloud-soft text-3xl font-medium tracking-tight text-primary-green'>
        Your Flower
      </div>
      <div className='relative z-10 mt-2 flex items-center justify-center'>
        <div className='absolute z-0 h-[462px] w-[282px] rounded-[18px] border-[1px] border-[#DD579B] blur-[2px]' />
        <Image
          alt='flower result'
          className='relative z-10 rounded-xl'
          height={481}
          src={resultImage}
          width={267.8}
        />
        <Image
          alt='flower with leaf'
          className='absolute left-[-20px] top-[-26px] z-10'
          height={70}
          src={`${config.cdnURL}/assets/pick-your-flower/flower-w-leaf.svg`}
          width={70}
        />
      </div>
      <div className='z-10 mt-4 flex w-full items-center justify-center gap-2'>
        <Button
          className='flex w-[143px] items-center justify-center gap-1 rounded-lg bg-[#076855] px-3 py-1'
          size='sm'
          type='button'
          onClick={handleSave}
        >
          <Image
            alt='save icon'
            height={16}
            src={`${config.cdnURL}/assets/pick-your-flower/save.svg`}
            width={16}
          />
          <div className='font-mitr text-base font-light tracking-tight text-white'>
            บันทึกรูปภาพ
          </div>
        </Button>
      </div>
      <div className='z-10'>
        <InvitationCard />
      </div>
    </div>
  )
}

export default FlowerResult
