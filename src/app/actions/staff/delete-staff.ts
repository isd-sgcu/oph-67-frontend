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
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      role: 'student',
    }),
  })

  if (!response.ok) {
    throw new Error(`Failed to delete staff: ${response.status}`)
  }

  return { success: true }
}
