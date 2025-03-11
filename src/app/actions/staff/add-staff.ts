'use server'
import { config } from '@/app/config'

interface StaffApiResponse {
  success: boolean
}

export async function addStaff(
  token: string,
  phoneNumber: string
): Promise<StaffApiResponse> {
  const response = await fetch(
    `${config.baseURL}api/admin/addstaff/${phoneNumber}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error(`Failed to add staff: ${response.status}`)
  }

  return { success: true }
}
