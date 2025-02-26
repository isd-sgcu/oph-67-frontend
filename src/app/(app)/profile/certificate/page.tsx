'use client'

import { type ReactNode, useState } from 'react'

import CertificateGenerator from '@/components/profile/certificategenerator'
import { Button } from '@/components/ui/button'

const Certificate: React.FC = () => {
  const [step, setStep] = useState(1)

  const getPage = (): ReactNode => {
    switch (step) {
      case 1:
        return (
          <div className='flex h-full flex-col items-center gap-2'>
            <h1 className='text-2xl font-normal text-primary-green'>
              แบบประเมิน
            </h1>
            <p className='text-base font-normal text-primary-green'>
              Evaluation
            </p>
            <p className='-mt-2 text-base font-light text-primary-green'>
              *จะได้รับเกียรติบัตรเมื่อทำแบบประเมินเสร็จสิ้น
            </p>
            <Button
              className='mt-10 w-[20rem] font-cloud-soft text-2xl font-bold'
              onClick={() => setStep(2)}
            >
              FINISH
            </Button>
          </div>
        )
      case 2:
        return <CertificateGenerator />
      default:
        return <div>404</div>
    }
  }

  return (
    <div className='flex h-full w-full grow flex-col items-center gap-3 bg-light-pink pt-8 font-mitr'>
      {getPage()}
    </div>
  )
}

export default Certificate
