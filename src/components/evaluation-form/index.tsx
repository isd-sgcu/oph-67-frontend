'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { type ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Toaster } from 'react-hot-toast'

import { config } from '@/app/config'
import EvaluationFail from '@/components/evaluation-form/fail'
import EvaluationRegister from '@/components/evaluation-form/home'
import EvaluationForm1 from '@/components/evaluation-form/subpages/form1'
import EvaluationForm2 from '@/components/evaluation-form/subpages/form2'
import EvaluationForm3 from '@/components/evaluation-form/subpages/form3'
import EvaluationSuccess from '@/components/evaluation-form/success'
import Footer from '@/components/homepage/footer'
import Navbar from '@/components/homepage/navbar'
import {
  type EvaluationForm,
  EvaluationSchema,
} from '@/types/evaluation-schema'

const EvaluationCheck: React.FC = () => {
  const [step, setStep] = useState<number>(1)
  const [isUserAttended, setIsUserAttended] = useState<boolean>(false)
  const form = useForm<EvaluationForm>({
    resolver: zodResolver(EvaluationSchema),
    defaultValues: {},
  })

  const getPage = (): ReactNode => {
    switch (step) {
      case 1:
        return (
          <EvaluationRegister
            setIsUserAttended={setIsUserAttended}
            setStep={setStep}
          />
        )
      case 2:
        if (isUserAttended) {
          return <EvaluationForm1 form={form} setStep={setStep} />
        }
        return <EvaluationFail />
      case 3:
        return <EvaluationForm2 form={form} setStep={setStep} />
      case 4:
        return <EvaluationForm3 form={form} setStep={setStep} />
      case 5:
        return <EvaluationSuccess />
      default:
        return <div>404</div>
    }
  }

  return (
    <div>
      <Toaster position='top-center' />
      <Navbar />
      {[2, 3, 4].includes(step) && (
        <div className='flex flex-col items-center justify-center gap-4 bg-[#FAE9F3] py-6'>
          <object
            className='h-[125px] w-[125px]'
            data={`${config.cdnURL}/assets/register/oph-logo.svg`}
            type='image/svg+xml'
          >
            <Image
              alt='logo'
              height={125}
              src={`${config.cdnURL}/assets/register/oph-logo.svg`}
              width={125}
            />
          </object>
          <div className='flex flex-col items-center justify-center gap-0 font-mitr text-xl font-medium tracking-tight text-[#064E41]'>
            <div>แบบประเมิน</div>
            <div>Chula Open House 2025</div>
          </div>
        </div>
      )}
      {getPage()}
      <Footer />
    </div>
  )
}

export default EvaluationCheck
