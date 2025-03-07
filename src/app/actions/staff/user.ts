'use server'

import { cookies } from 'next/headers'

interface User {
  id: string
  name: string
  phone: string
  role: string
  school?: string
  firstInterest?: string
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = cookies()
    const token = (
      cookieStore as unknown as {
        get: (name: string) => { value?: string } | undefined
      }
    ).get('auth-token')?.value

    if (!token) {
      return null
    }

    const apiBaseUrl = process.env.API_BASE_URL ?? ''
    const response = await fetch(`${apiBaseUrl}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      return null
    }

    const userData = (await response.json()) as User
    return userData
  } catch (error) {
    console.error('Error fetching user data:', error)
    return null
  }
}

export async function getUserById(id: string): Promise<User | null> {
  try {
    const cookieStore = cookies()
    const token = (
      cookieStore as unknown as {
        get: (name: string) => { value?: string } | undefined
      }
    ).get('auth-token')?.value

    if (!token) {
      return null
    }

    const apiBaseUrl = process.env.API_BASE_URL ?? ''
    const response = await fetch(`${apiBaseUrl}/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      return null
    }

    const userData = (await response.json()) as User
    return userData
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error)
    return null
  }
}
