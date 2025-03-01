import Image from 'next/image'
import React from 'react'

import { download } from '@/utils/download'
import { shareWeb } from '@/utils/share'

import InvitationCard from '../invitation-card'

interface FlowerResultProps {
  resultImage: string
  resultDownloadandShare: string
  resultName: string
  resultText: string
}

const FlowerResult: React.FC<FlowerResultProps> = ({
  resultImage,
  resultDownloadandShare,
  resultName,
  resultText,
}) => {
  const handleSave: () => void = () => {
    download(resultDownloadandShare, resultName)
    console.log('save')
    console.log(resultText)
  }

  const handleShare: () => Promise<void> = async () => {
    try {
      await shareWeb(
        'CU Open House 2025 - Flower',
        'Come and check your flower at CU OPH 2025!'
      )
      console.log('share')
    } catch (error) {
      console.error('Error sharing', error)
    }
  }

  return (
    <div className='relative flex flex-col items-center gap-5 bg-gradient-to-b from-[#FFFFFF] to-[#EA88BD] px-6 py-10'>
      <div className='font-cloud-soft text-2xl font-bold tracking-tight text-primary-green'>
        Your Flower
      </div>
      <div className='relative flex items-center justify-center'>
        <div className='absolute h-[383px] w-[217px] rounded-[18px] border-[1px] border-[#DD579B] blur-[2px]' />
        <Image
          alt='flower result'
          className='relative'
          height={370}
          src={resultImage}
          width={206}
        />
        <Image
          alt='flower with leaf'
          className='absolute left-[-15px] top-[-20px]'
          height={50}
          src='/assets/pick_your_flower/flower-w-leaf.svg'
          width={50}
        />
        <Image
          alt='girl with flower'
          className='absolute bottom-[-17px] right-[-45px]'
          height={104}
          src='/assets/pick_your_flower/flower-girl.svg'
          width={66}
        />
      </div>
      <div className='mt-4 flex w-full items-center justify-center gap-2'>
        <button
          className='flex w-[143px] items-center justify-center gap-1 rounded-lg bg-[#076855] px-3 py-1'
          type='button'
          onClick={handleSave}
        >
          <Image
            alt='save icon'
            height={16}
            src='/assets/pick_your_flower/save.svg'
            width={16}
          />
          <div className='font-mitr text-base font-light tracking-tight text-white'>
            บันทึกรูปภาพ
          </div>
        </button>
        <button
          className='flex w-[143px] items-center justify-center gap-1 rounded-lg bg-[#DD579B] px-3 py-1'
          type='button'
          onClick={handleShare}
        >
          <Image
            alt='share icon'
            height={16}
            src='/assets/pick_your_flower/share.svg'
            width={16}
          />
          <div className='font-mitr text-base font-light tracking-tight text-white'>
            แชร์
          </div>
        </button>
      </div>
      <InvitationCard />
    </div>
  )
}

export default FlowerResult
