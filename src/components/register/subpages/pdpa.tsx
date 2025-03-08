'use client'

import { cookies } from 'next/headers'
import { type UseFormReturn } from 'react-hook-form'

import { registerStaff } from '@/app/actions/register/register-staff'
import { registerUser } from '@/app/actions/register/register-user'
import { LiffError } from '@/components/liff/liff-error'
import { LiffLoading } from '@/components/liff/liff-loading'
import { useLiffContext } from '@/components/liff/liff-provider'
import { Button } from '@/components/ui/button'
import { PDPA, termAndCondition } from '@/const/policy'
import { type AdminRegisterForm } from '@/types/admin-register'
import { type RegisterForm } from '@/types/register'

import Policy from '../policy/policy'

interface PdpaProps {
  isTerm: boolean
  isPDPA: boolean
  setStep: (value: number) => void
  setIsTerm: (value: boolean) => void
  setIsPDPA: (value: boolean) => void
  form: UseFormReturn<AdminRegisterForm> | UseFormReturn<RegisterForm>
  isStaff: boolean
}

const Pdpa: React.FC<PdpaProps> = ({
  isPDPA,
  isTerm,
  setStep,
  setIsPDPA,
  setIsTerm,
  form,
  isStaff,
}) => {
  const { profile, isInit } = useLiffContext()
  const userId = profile?.userId
  const isValid = isPDPA && isTerm

  if (!isInit) {
    return <LiffLoading />
  }

  if (!profile) {
    return <LiffError error='Failed to load profile' />
  }

  if (!userId) {
    return <LiffError error='Failed to load user ID' />
  }

  async function onNext(): Promise<void> {
    if (isValid) {
      try {
        const formValues = form.getValues()

        if (!userId) {
          throw new Error('LINE LIFF User ID is undefined')
        }

        if (isStaff) {
          const adminFormValues = formValues as AdminRegisterForm
          const res = await registerStaff({ id: userId, form: adminFormValues })
          const cookieStore = await cookies()
          const token = res.accessToken
          cookieStore.set('auth-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 7 days
          })
        } else {
          const userFormValues = formValues as RegisterForm
          const res = await registerUser({ id: userId, form: userFormValues })
          const cookieStore = await cookies()
          const token = res.accessToken
          cookieStore.set('auth-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 7 days
          })
        }
        setStep(3)
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        } else {
          console.error('An unknown error occurred')
        }
        console.log(`Failed to register ${isStaff ? 'staff 1' : 'user 1'}`)
      }
    }
  }

  return (
    <div>
      <div className='flex flex-col gap-6 px-5 py-8'>
        <Policy
          SetIsAccepted={setIsTerm}
          consent={termAndCondition.consent}
          content={termAndCondition.content}
          isAccepted={isTerm}
          topic={termAndCondition.topic}
        />

        <Policy
          SetIsAccepted={setIsPDPA}
          consent={PDPA.consent}
          content={PDPA.content}
          isAccepted={isPDPA}
          topic={PDPA.topic}
        />

        <div className='text-center'>
          <Button
            className='font-cloud-soft text-2xl font-medium'
            variant={isValid ? 'filled' : 'disabled'}
            onClick={onNext}
          >
            ยินยอม
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Pdpa
