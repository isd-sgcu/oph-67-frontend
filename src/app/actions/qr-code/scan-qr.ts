'use server'
import { config } from '@/app/config'

interface ScanQRResponse {
  id: string
  name: string
  lastEntered: string
}

interface ScanQRError {
  error: string
  message: string
}

export async function scanQRCode(studentId: string): Promise<{
  success: boolean
  data?: ScanQRResponse
  error?: string
  lastEntered?: string
}> {
  try {
    if (!config.baseURL) {
      throw new Error('NEXT_PUBLIC_API_URL is not defined')
    }

    const response = await fetch(
      `${config.baseURL}/api/users/qr/${studentId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer TODO: get staff token`,
        },
      }
    )

    if (!response.ok) {
      const errorData = (await response.json()) as ScanQRError
      return {
        success: false,
        error: errorData.error,
        lastEntered: errorData.message,
      }
    }

    const data = (await response.json()) as ScanQRResponse
    return {
      success: true,
      data,
    }
  } catch (error) {
    return {
      success: false,
      error: 'Failed to scan QR code',
    }
  }
}
