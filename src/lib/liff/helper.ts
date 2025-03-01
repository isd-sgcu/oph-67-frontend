import { liff } from '@line/liff'

import { type Response } from '@/schema/response'

export const initLiff = async (): Promise<Response<boolean>> => {
  try {
    if (!process.env.NEXT_PUBLIC_LIFF_ID) {
      return {
        success: false,
        data: false,
        error: 'LIFF_ID is not set',
      }
    }

    await liff.init({
      liffId: process.env.NEXT_PUBLIC_LIFF_ID,
    })
    return { success: true, data: true }
  } catch (error: unknown) {
    console.error('Failed to init LINE LIFF', error)
    return {
      success: false,
      data: false,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

export const closeLiff = (): Promise<Response<boolean>> => {
  try {
    liff.closeWindow()
    return Promise.resolve({ success: true, data: true })
  } catch (error) {
    console.error('Failed to close LINE LIFF', error)
    return Promise.resolve({
      success: false,
      data: false,
      error: error instanceof Error ? error.message : String(error),
    })
  }
}
