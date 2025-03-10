'use server'

import { cookies } from 'next/headers'

export async function setAdminAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies()

  cookieStore.set('admin-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

export async function getAdminAuthToken(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get('admin-token')?.value ?? null
}
