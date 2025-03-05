import { liff } from '@line/liff'

import { type Profile } from '@/types/liff'
import { type Response } from '@/types/response'

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

export const getProfile = async (): Promise<Response<Profile | null>> => {
  try {
    const profile = await liff.getProfile()
    return { success: true, data: profile }
  } catch (error) {
    console.error('Failed to get LINE LIFF profile', error)
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}
