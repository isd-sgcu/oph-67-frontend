'use server'

import { config } from '@/app/config'

interface CertTokenResponse {
  userId: string
  certToken: string
}

export async function getCertToken(
  id: string,
  token: string
): Promise<CertTokenResponse> {
  try {
    const response = await fetch(
      `${config.baseURL}/api/users/certToken/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (!response.ok) {
      const errorData = (await response.json().catch(() => null)) as {
        message: string
      } | null
      throw new Error(
        `Get cert token failed: ${response.status} ${response.statusText}${
          errorData ? ` - ${JSON.stringify(errorData)}` : ''
        }`
      )
    }
    const data = (await response.json()) as CertTokenResponse
    return {
      userId: data.userId,
      certToken: data.certToken,
    }
  } catch (error) {
    console.error('Get cert token error:', error)
    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred during getting cert token')
  }
}
