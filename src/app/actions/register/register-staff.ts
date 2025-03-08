'use server'

import { config } from '@/app/config'
import { type AdminRegisterForm } from '@/types/admin-register'

interface RegisterStaffResponse {
  accessToken: string
  userId: string
}

export async function registerStaff(data: {
  id: string
  form: AdminRegisterForm
}): Promise<RegisterStaffResponse> {
  const formData = new FormData()

  // Append form fields to formData, excluding 'status', 'name', and 'surname'
  Object.entries(data.form).forEach(([key, value]) => {
    if (key !== 'status' && key !== 'name' && key !== 'surname') {
      formData.append(key, value)
    }
  })

  // Append the id field
  formData.append('id', data.id)

  // Concatenate name and surname and append as fullName
  const fullName = `${data.form.name} ${data.form.surname}`
  formData.append('name', fullName)

  // Check the status and set isCentralStaff accordingly
  if (data.form.status === 'Staff ส่วนกลาง') {
    formData.append('isCentralStaff', 'true')
  } else {
    formData.append('isCentralStaff', 'false')
  }

  const res = await fetch(`${config.baseURL}/api/staff/register`, {
    method: 'POST',
    body: formData,
  })

  if (!res.ok) {
    const errorData = await res.text()
    console.error('Server Error:', errorData)
    throw new Error(`Failed to register staff 2: ${errorData}`)
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- We are confident that the response is JSON
  return res.json()
}
