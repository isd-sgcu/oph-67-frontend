'use server'

import { config } from '@/app/config'

interface SignInResponse {
  userId: string
  accessToken: string
}

export async function signIn(id: string): Promise<SignInResponse> {
  try {
    const response = await fetch(`${config.baseURL}/api/users/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })

    if (!response.ok) {
      const errorData = (await response.json().catch(() => null)) as {
        message: string
      } | null
      throw new Error(
        `Sign in failed: ${response.status} ${response.statusText}${
          errorData ? ` - ${JSON.stringify(errorData)}` : ''
        }`
      )
    }

    const data = (await response.json()) as SignInResponse

    return {
      userId: data.userId,
      accessToken: data.accessToken,
    }
  } catch (error) {
    console.error('Sign in error:', error)
    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred during sign in')
  }
}
