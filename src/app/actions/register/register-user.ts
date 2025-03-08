'use server'

import { config } from '@/app/config'
import { type RegisterForm } from '@/types/register'

export async function registerUser(data: {
  id: string
  form: RegisterForm
}): Promise<Response> {
  const formData = new FormData()

  // Append form fields to formData, excluding 'status', 'name', and 'surname'
  Object.entries(data.form).forEach(([key, value]) => {
    if (key !== 'status' && key !== 'name' && key !== 'surname') {
      if (key === 'selectedSources' && Array.isArray(value)) {
        formData.append(key, value.join(',').toString())
      } else if (key === 'birthDate' && value instanceof Date) {
        formData.append(key, value.toISOString()) // Convert date to ISO 8601 format
      } else {
        formData.append(key, String(value))
      }
    }
  })

  // Append the id field
  formData.append('id', data.id)

  // Concatenate name and surname and append as fullName
  const fullName = `${data.form.name} ${data.form.surname}`
  formData.append('name', fullName)

  const res = await fetch(`${config.baseURL}/api/student/register`, {
    method: 'POST',
    body: formData,
  })

  if (!res.ok) {
    const errorData = await res.text()
    console.error('Server Error:', errorData)
    throw new Error(`Failed to register user: ${errorData}`)
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- We are confident that the response is JSON
  return res.json()
}
