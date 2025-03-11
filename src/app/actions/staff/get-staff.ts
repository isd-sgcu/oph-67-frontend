'use server'
import { config } from '@/app/config'

interface StaffApiResponse {
  id: number
  name: string
  role: string
  school: string
  phone: string
  faculty: string
}

export async function getStaff(
  token: string,
  name?: string
): Promise<StaffApiResponse[]> {
  const response = await fetch(
    `${config.baseURL}/api/users?role=staff${name ? `&name=${name}` : ''}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch staff: ${response.status}`)
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- We are confident that the response is JSON
  return response.json()
}
