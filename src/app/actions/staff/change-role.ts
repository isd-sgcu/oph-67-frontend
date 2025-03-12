'use server'
import { config } from '@/app/config'

interface ChangeRoleResponse {
  success: boolean
  message?: string
}

export async function changeRole(
  token: string,
  uid: number,
  role: string
): Promise<ChangeRoleResponse> {
  if (role !== 'admin' && role !== 'staff') {
    throw new Error('Invalid role. Must be "admin" or "staff"')
  }

  try {
    const response = await fetch(`${config.baseURL}/api/admin/role/${uid}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ role }),
    })

    if (!response.ok) {
      throw new Error(`Failed to change role: ${response.status}`)
    }

    return { success: true }
  } catch (error) {
    console.error('Error changing role:', error)
    throw error
  }
}
