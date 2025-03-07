'use server'

import { config } from '@/app/config'

export async function registerStaff(data: {
  id: string
  name: string
  phone: string
  nickname: string
  studentId: string
  email: string
  faculty?: string
  year?: number
  isCentralStaff?: boolean
}): Promise<Response> {
  const formData = new FormData()
  formData.append('id', data.id)
  formData.append('name', data.name)
  formData.append('phone', data.phone)
  formData.append('nickname', data.nickname)
  formData.append('studentId', data.studentId)
  formData.append('email', data.email)
  if (data.faculty) formData.append('faculty', data.faculty)
  if (data.year !== undefined) formData.append('year', data.year.toString())
  if (data.isCentralStaff !== undefined)
    formData.append('isCentralStaff', data.isCentralStaff.toString())

  const res = await fetch(`${config.baseURL}/api/staff/register`, {
    method: 'POST',
    body: formData,
  })

  if (!res.ok) {
    throw new Error('Failed to register staff')
  }

  return res
}
