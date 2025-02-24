'use client'

import { type ReactNode, useState } from 'react'

import { Button } from '@/components/ui/button'

const Certificate: React.FC = () => {
  const [step, setStep] = useState(1)

  const getPage = (): ReactNode => {
    switch (step) {
      case 1:
        return (
          <div className='flex flex-col items-center gap-2'>
            <h1 className='text-2xl font-semibold text-primary-green'>
              แบบประเมิน
            </h1>
            <p className='text-base font-semibold text-primary-green'>
              Evaluation
            </p>
            <p className='-mt-2 text-base font-normal text-primary-green'>
              *จะได้รับเกียรติบัตรเมื่อทำแบบประเมินเสร็จสิ้น
            </p>
            <Button
              className='w-[20rem] font-cloud-soft text-2xl font-bold'
              onClick={() => setStep(2)}
            >
              FINISH
            </Button>
          </div>
        )
      case 2:
        return (
          <div className='flex flex-col items-center gap-2'>
            <h1 className='text-2xl font-semibold text-primary-green'>
              Certification
            </h1>
            <p className='text-base font-semibold text-primary-green'>
              เกียรติบัตร
            </p>
            <Button
              className='w-[20rem] font-cloud-soft text-2xl font-bold'
              onClick={() => setStep(2)}
            >
              ดาวน์โหลด
            </Button>
          </div>
        )
      default:
        return <div>404</div>
    }
  }

  return (
    <div className='font-mitr flex min-h-screen w-full flex-col items-center gap-3 bg-light-pink pt-8'>
      {getPage()}
    </div>
  )
}

export default Certificate
