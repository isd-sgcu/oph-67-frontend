'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

import { config } from '@/app/config'
import { Button } from '@/components/ui/button'

const EvaluationSuccess: React.FC = () => {
  const router = useRouter()

  const onNext = (): void => {
    router.push('/')
  }

  return (
    <div className='relative flex h-screen w-full flex-col items-center justify-center bg-[#FAE9F3]'>
      <div
        className='absolute flex items-center justify-center'
        style={{ top: 'calc(50% - 250px)' }}
      >
        <div className='h-[300px] w-[300px] rounded-full bg-white blur-2xl' />
      </div>
      <div className='relative z-10 flex flex-col items-center justify-center gap-5'>
        <object
          className='h-[280px] w-[280px]'
          data={`${config.cdnURL}/assets/register/oph-logo-nobg.svg`}
          type='image/svg+xml'
        >
          <Image
            alt='logo'
            height={280}
            src={`${config.cdnURL}/assets/register/oph-logo-nobg.svg`}
            width={280}
          />
        </object>
        <div className='flex flex-col items-center justify-center gap-0 font-cloud-soft text-lg font-normal tracking-tight text-[#064E41]'>
          <div className='text-3xl font-bold'>ส่งแบบประเมินสำเร็จ!</div>
          <div>ขอบคุณที่ร่วมแสดงความคิดเห็น</div>
          <div>เราจะนำไปพัฒนาการจัดงานในครั้งต่อไป</div>
        </div>
        <Button
          className='mt-3 font-cloud-soft text-2xl font-medium'
          variant='filled'
          onClick={onNext}
        >
          กลับสู่หน้าหลัก
        </Button>
      </div>
    </div>
  )
}

export default EvaluationSuccess
