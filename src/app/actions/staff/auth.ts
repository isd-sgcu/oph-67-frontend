'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function registerStaff(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  try {
    const id = formData.get('id') as string
    const name = formData.get('name') as string
    const phone = formData.get('phone') as string
    const nickname = formData.get('nickname') as string
    const studentId = formData.get('studentId') as string
    const email = formData.get('email') as string
    const faculty = formData.get('faculty') as string
    const year = formData.get('year')
      ? parseInt(formData.get('year') as string)
      : undefined
    const isCentralStaff = formData.get('isCentralStaff') === 'true'

    // Validate required fields
    if (!id || !name || !phone || !nickname || !studentId || !email) {
      return { success: false, error: 'Missing required fields' }
    }

    const phoneRegex = /^0\d{9}$/
    if (!phoneRegex.test(phone)) {
      return { success: false, error: 'Invalid phone number format' }
    }

    const apiBaseUrl = process.env.API_BASE_URL ?? ''
    const response = await fetch(`${apiBaseUrl}/api/staff/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        name,
        phone,
        nickname,
        studentId,
        email,
        faculty,
        year,
        isCentralStaff,
      }),
    })

    if (!response.ok) {
      const errorData = (await response.json()) as { error?: string }
      return { success: false, error: errorData.error ?? 'Registration failed' }
    }

    const data = (await response.json()) as {
      accessToken: string
      userId: string
    }

    // Store token in HTTP-only cookie
    const { accessToken } = data

    const cookieStore = cookies()
    ;(
      cookieStore as unknown as {
        set: (
          name: string,
          value: string,
          options?: {
            httpOnly?: boolean
            secure?: boolean
            sameSite?: string
            path?: string
            maxAge?: number
          }
        ) => void
      }
    ).set('auth-token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })

    return { success: true }
  } catch (error) {
    console.error('Registration error:', error)
    return { success: false, error: 'Internal server error' }
  }
}

export function logout(): void {
  const cookieStore = cookies()
  ;(
    cookieStore as unknown as {
      delete: (name: string) => void
    }
  ).delete('auth-token')

  redirect('/login')
}
