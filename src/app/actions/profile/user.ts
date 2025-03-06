'use server'

import { getProfile } from '@/lib/liff/helper'
import { type Profile } from '@/types/liff'
import { type Response } from '@/types/response'

export async function getLiffProfile(): Promise<Response<Profile | null>> {
  const profile = await getProfile()
  if (!profile.success) {
    return { success: false, data: null, error: profile.error }
  }
  return { success: true, data: profile.data }
}
