'use server'

import { config } from '@/app/config'
import { type UserData } from '@/types/user-data'

export async function getUser(id: string, token: string): Promise<UserData> {
  const res = await fetch(`${config.baseURL}/api/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    const errorData = await res.text()
    console.error('Server Error:', errorData)
    throw new Error(`Failed to fetch user data: ${errorData}`)
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- We are confident that the response is JSON
  return res.json()
}
