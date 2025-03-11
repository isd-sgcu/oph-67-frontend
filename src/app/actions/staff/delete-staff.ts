'use server'
import { config } from '@/app/config'

interface DeleteResponse {
  success: boolean
}

export async function deleteStaff(
  token: string,
  id: string
): Promise<DeleteResponse> {
  const response = await fetch(`${config.baseURL}/api/admin/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to delete staff: ${response.status}`)
  }

  return { success: true }
}
