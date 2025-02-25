'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { type ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'

import Footer from '@/components/homepage/footer'
import Navbar from '@/components/homepage/navbar'
import { type RegisterForm, RegisterSchema } from '@/schema/register'

import Pdpa from '../../../components/register/subpages/pdpa'
import Success from '../../../components/register/subpages/success'
import UserForm from '../../../components/register/subpages/userform'

const Register: React.FC = () => {
  const [step, setStep] = useState(1)
  const [isTerm, setIsTerm] = useState(false)
  const [isPDPA, setIsPDPA] = useState(false)

  const form = useForm<RegisterForm>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {},
  })

  const getPage = (): ReactNode => {
    switch (step) {
      case 1:
        return <UserForm form={form} setStep={setStep} />
      case 2:
        return (
          <Pdpa
            isPDPA={isPDPA}
            isTerm={isTerm}
            setIsPDPA={setIsPDPA}
            setIsTerm={setIsTerm}
            setStep={setStep}
          />
        )
      case 3:
        return <Success />
      default:
        return <div>404</div>
    }
  }

  return (
    <div>
      <Navbar />
      {getPage()}
      <Footer />
    </div>
  )
}

export default Register
