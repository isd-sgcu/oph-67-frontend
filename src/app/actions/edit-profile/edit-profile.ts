'use server'

import { cookies } from 'next/headers'

import { config } from '@/app/config'
import { type UserData } from '@/types/user-data'

interface UpdateUserResponse {
  success: boolean
  message: string
}

export async function updateUser(data: {
  id: string
  updates: UserData
}): Promise<UpdateUserResponse> {
  const { id, updates } = data

  const cookieStore = await cookies()

  const token = cookieStore.get('auth-token')?.value
  if (!token) {
    throw new Error('Not authenticated')
  }

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
