'use server'
import { config } from '@/app/config'

interface ScanQRResponse {
  success: boolean
  error?: string
  lastEntered?: string
  data?: {
    name: string
    lastEntered: string
    studentId?: string
  }
}

export async function scanQRCode(
  token: string,
  id: string
): Promise<ScanQRResponse> {
  try {
    const response = await fetch(`${config.baseURL}/api/users/qr/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No response body')
      throw new Error(
        `Failed to scan QR code: ${response.status} ${response.statusText} - ${errorText}`
      )
    }

    const data = (await response.json()) as ScanQRResponse['data']
    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error('Error scanning QR code:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}
