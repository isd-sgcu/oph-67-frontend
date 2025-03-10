'use client'
import { useEffect, useState } from 'react'

import { getMyProfile } from '@/app/actions/auth'
import { useLiffContext } from '@/components/liff/liff-provider'

interface User {
  id: string
  name: string
  phone: string
  role: string
  school: string
  firstInterest: string
}

interface AuthHook {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
}

export function useAuth(): AuthHook {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const { profile } = useLiffContext()

  useEffect(() => {
    async function loadUserData(): Promise<void> {
      if (!profile?.userId) return

      try {
        const userData = (await getMyProfile(profile.userId)) as User
        setUser(userData)
      } catch (error) {
        console.error('Error loading user data:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    void loadUserData()
  }, [profile])

  return {
    user,
    loading,
    isAuthenticated: Boolean(user),
  }
}
