'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import AdminFormEdit from '@/components/register/subpages/adminform-edit'
import {
  type AdminRegisterForm,
  AdminRegisterSchema,
} from '@/types/admin-register'


const Register: React.FC = () => {
  const form = useForm<AdminRegisterForm>({
    resolver: zodResolver(AdminRegisterSchema),
    defaultValues: {},
  })

  return (
    <div>
      <AdminFormEdit form={form} />
    </div>
  )
}

export default Register
