'use client'

import Image from 'next/image'
import Link from 'next/link'

import { config } from '@/app/config'
import { Button } from '@/components/ui/button'

const EvaluationFail: React.FC = () => {
  return (
    <div className='flex flex-col justify-center bg-white font-mitr'>
      {/* Header */}
      <div className='flex flex-col items-center justify-center gap-4 py-6'>
        {/* Text */}
        <div className='flex flex-col items-center text-[#064E41]'>
          <div className='text-xl font-medium'>แบบประเมิน</div>
          <div className='text-xl font-medium'>Chula Open House 2025</div>
        </div>

        {/* Logo */}
        <object
          className='h-[220px] w-[220px]'
          data={`${config.cdnURL}/assets/register/oph-logo.svg`}
          type='image/svg+xml'
        >
          <Image
            alt='logo'
            height={220}
            src={`${config.cdnURL}/assets/register/oph-logo.svg`}
            width={220}
          />
        </object>
      </div>

      {/* Content */}
      <div className='flex flex-col items-center justify-center bg-white pb-6'>
        <p className='text-center text-base font-light text-[#F00]'>
          ขออภัย<b>ท่านไม่มีสิทธิ์ทำแบบประเมิน</b>และ
        </p>
        <p className='text-center text-base font-light text-[#F00]'>
          รับเกียรติบัตร เนื่องจากไม่ได้เข้าร่วมงาน Onsite
        </p>
      </div>

      {/* Footer */}
      <div className='flex flex-col items-center justify-center gap-8 bg-white pb-6'>
        <p className='text-center text-base font-light text-[#064E41]'>
          หากมีข้อผิดพลาด สามารถกรอกข้อมูลได้ที่:
        </p>
        <Button className='px-10 shadow-xl'>
          <Link href='/'>
            <p className='text-xl text-white'>กลับ</p>
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default EvaluationFail
