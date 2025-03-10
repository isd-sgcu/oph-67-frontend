'use server'

import { cookies } from 'next/headers'

import { config } from '../config'

interface UserProfile {
  id: string
  name: string
  phone: string
  role: string
  school: string
  firstInterest: string
  // Add any other fields that might be in the user profile
}

export async function getMyProfile(userId: string): Promise<UserProfile> {
  const cookieStore = await cookies()

  const token = cookieStore.get('auth-token')?.value
  if (!token) {
    throw new Error('Not authenticated')
  }

  try {
    const apiUrl = config.baseURL

    const response = await fetch(`${apiUrl}/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch user data')
    }

    const userData = (await response.json()) as UserProfile
    return userData
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error)
    throw error
  }
}

export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies()

  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}
