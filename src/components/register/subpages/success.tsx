import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

import { Button } from '@/components/ui/button'

const Success: React.FC = () => {
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
        <Image
          alt='logo'
          height={280}
          src='/assets/register/oph-logo-nobg.svg'
          width={280}
        />
        <div className='flex flex-col items-center justify-center gap-0 font-cloud-soft text-lg font-normal tracking-tight text-[#064E41]'>
          <div className='text-3xl font-bold'>ลงทะเบียนเรียบร้อย!</div>
          <div>อย่าลืมมาเจอกัน</div>
          <div>วันที่ 29-30 มีนาคม</div>
          <div>@จุฬาลงกรณ์มหาวิทยาลัย!</div>
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

export default Success
