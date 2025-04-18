'use server'

import { config } from '@/app/config'
import { type UserData } from '@/types/user-data'

interface UpdateUserResponse {
  success: boolean
  message: string
}

export async function updateUser(data: {
  id: string
  token: string
  updates: UserData
}): Promise<UpdateUserResponse> {
  const { id, token, updates } = data

  const res = await fetch(`${config.baseURL}/api/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  })

  if (res.status === 204) {
    // Handle 204 No Content response
    return {
      success: true,
      message: 'User updated successfully',
    }
  }

  if (!res.ok) {
    const errorData = await res.text()
    console.error('Server Error:', errorData)
    throw new Error(`Failed to update user: ${errorData}`)
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- We are confident that the response is JSON
  return res.json()
}
