'use client'
// import { useEffect } from 'react';

import Image from 'next/image'
import { type UseFormReturn } from 'react-hook-form'

import { Button } from '@/components/register/button'
// import { useLiff } from '@/contexts/liff';
// import { useAuth } from '@/contexts/auth';
// import toast from 'react-hot-toast';
import { type RegisterForm } from '@/schema/register'

interface UserFormProps {
  setStep: (value: number) => void
  form: UseFormReturn<RegisterForm>
}

const UserForm: React.FC<UserFormProps> = ({ setStep, form }) => {
  function onNext(): void {
    setStep(2)
  }

  return (
    <div>
      <div className='flex flex-col items-center justify-center gap-2 bg-[#FAE9F3] py-6'>
        <Image
          alt='logo'
          height={125}
          src='/assets/register/oph-logo.svg'
          width={125}
        />
        <div className='flex flex-col items-center justify-center gap-0 font-mitr tracking-tight text-[#064E41]'>
          <div className='text-xl font-medium'>ลงทะเบียน</div>
          <div className='text-base font-light'>Registration Form</div>
        </div>
      </div>
      <div>{form.getValues('name')}</div>
      <div className='bg-slate-300'>
        <Button
          className='font-cloud-soft text-2xl font-medium'
          variant='filled'
          onClick={onNext}
        >
          ลงทะเบียน
        </Button>
      </div>
    </div>
  )
}

export default UserForm
