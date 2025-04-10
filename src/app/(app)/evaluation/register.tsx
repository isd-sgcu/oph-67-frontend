'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { config } from '@/app/config'
import Popup from '@/components/evaluation/popup'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { type RegisterForm, RegisterSchema } from '@/types/register'

interface EvaluationRegisterProps {
  setStep: (step: number) => void
  setFoundUser: (found: boolean) => void
}

const EvaluationRegister: React.FC<EvaluationRegisterProps> = ({
  setStep,
  setFoundUser: _setFoundUser, // marked unused
}) => {
  const [showPopup, setShowPopup] = useState<boolean>(false)

  const form = useForm<RegisterForm>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {},
  })

  const goBack = (): void => {
    console.log('Go Back')
  }

  const onConfirm = (): void => {
    const values = form.getValues()
    console.log('Confirmed:', values)

    // Implement setFoundUser later

    setShowPopup(false)
    setStep(2)
  }

  const openPopup = async (): Promise<void> => {
    const requiredFields: (keyof RegisterForm)[] = ['name', 'surname']
    let isAllValid = true

    for (const field of requiredFields) {
      const isValid = await form.trigger(field)
      const input = document.querySelector(`input[name="${field}"]`)
      if (isValid) {
        input?.classList.remove('border-red-500')
      } else {
        input?.classList.add('border-red-500')
        isAllValid = false
      }
    }

    if (isAllValid) {
      setShowPopup(true)
    }
  }

  return (
    <div className='flex flex-col justify-center bg-[#FAE9F3] font-mitr'>
      {showPopup ? <Popup
          fullName={`${form.watch('name')} ${form.watch('surname')}`}
          setShowPopup={setShowPopup}
          onConfirm={onConfirm}
        /> : null}

      {/* Logo */}
      <div className='flex flex-col items-center justify-center gap-4 py-6'>
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
        <div className='flex flex-col items-center text-[#064E41]'>
          <div className='text-xl font-medium'>แบบประเมิน</div>
          <div className='text-xl font-medium'>Chula Open House 2025</div>
        </div>
      </div>

      {/* Entry */}
      <div className='flex flex-col items-center justify-center gap-6 bg-white py-6'>
        <div className='text-center text-base font-light text-[#F00]'>
          <p>โปรดตรวจสอบชื่อ-นามสกุลของท่าน</p>
          <p>ก่อนทำแบบประเมิน</p>
        </div>

        <div className='flex flex-col items-center justify-center gap-2'>
          <Input
            className='h-9 border-[#064E41] text-sm font-light text-[#064E41] placeholder:text-[#064E41] placeholder:opacity-50 focus-visible:ring-[#064E41]'
            placeholder='Name'
            {...form.register('name')}
            name='name'
            onInput={(e) => {
              e.currentTarget.classList.remove('border-red-500')
            }}
          />
          <Input
            className='h-9 border-[#064E41] text-sm font-light text-[#064E41] placeholder:text-[#064E41] placeholder:opacity-50 focus-visible:ring-[#064E41]'
            placeholder='Surname'
            {...form.register('surname')}
            name='surname'
            onInput={(e) => {
              e.currentTarget.classList.remove('border-red-500')
            }}
          />
        </div>

        <p className='text-center text-base font-light text-[#F00]'>
          *หากยืนยันแล้วจะไม่สามารถแก้ไขได้
        </p>

        {/* Buttons */}
        <div className='flex gap-4'>
          <Button className='px-10 shadow-xl' onClick={goBack}>
            <p className='text-xl text-white'>กลับ</p>
          </Button>
          <Button className='px-10 shadow-xl' onClick={openPopup}>
            <p className='text-xl text-white'>ยืนยัน</p>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default EvaluationRegister
