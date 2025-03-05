import { type Liff, liff } from '@line/liff'
import { useEffect, useState } from 'react'

import { type Response } from '@/types/response'

import { initLiff } from './helper'

interface LiffContextType {
  isInit: boolean
  error?: string
  profile?: {
    userId: string
    displayName: string
    pictureUrl?: string
    email?: string
  }
  liff: Liff
}

export const useLiff = (): LiffContextType => {
  const [isInit, setIsInit] = useState(false)
  const [error, setError] = useState<string>()
  const [profile, setProfile] = useState<{
    userId: string
    displayName: string
    pictureUrl?: string
    email?: string
  }>()

  useEffect(() => {
    const initialize = async (): Promise<void> => {
      try {
        const response: Response<boolean> = await initLiff()

        if (!response.success) {
          setError(response.error)
          return
        }

        if (!liff.isLoggedIn()) {
          liff.login()
          return
        }

        const profile = await liff.getProfile()
        const email = liff.getDecodedIDToken()?.email

        setProfile({
          userId: profile.userId,
          displayName: profile.displayName,
          pictureUrl: profile.pictureUrl,
          email,
        })

        setIsInit(true)
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err))
      }
    }

    void initialize()
  }, [])

  return {
    isInit,
    error,
    profile,
    liff,
  }
}
