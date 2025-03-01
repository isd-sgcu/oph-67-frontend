'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { type RegisterForm, RegisterSchema } from '@/schema/register'

import UserFormEdit from '../../../../components/register/subpages/userform-edit'

const Register: React.FC = () => {
  const form = useForm<RegisterForm>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {},
  })

  return (
    <div>
      <UserFormEdit form={form} />
    </div>
  )
}

export default Register
