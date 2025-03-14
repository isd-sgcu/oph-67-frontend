'use client'

import { useRouter } from 'next/navigation'
import React, { createContext, useContext, useEffect, useState } from 'react'

import { setAuthCookie } from '@/app/actions/auth'
import { signIn } from '@/app/actions/login/login'
import { useLiff } from '@/lib/liff/use-liff'

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  userId: string | null
  accessToken: string | null
  error: string | null
  liffUserProfile: {
    displayName: string
    pictureUrl?: string
    email?: string
  } | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: React.ReactNode
  redirectToProfileOnLogin?: boolean
  profilePath?: string
}

export const AuthProvider = ({
  children,
  redirectToProfileOnLogin = true,
  profilePath = '/profile',
}: AuthProviderProps): React.ReactElement => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [liffUserProfile, setLiffUserProfile] =
    useState<AuthContextType['liffUserProfile']>(null)

  const { isInit, profile } = useLiff()
  const router = useRouter()

  useEffect(() => {
    const autoLogin = async (): Promise<void> => {
      if (!isInit || !profile) return

      try {
        setIsLoading(true)
        setError(null)

        const response = await signIn(profile.userId)

        setUserId(response.userId)
        setAccessToken(response.accessToken)
        setLiffUserProfile({
          displayName: profile.displayName,
          pictureUrl: profile.pictureUrl,
          email: profile.email,
        })
        setIsAuthenticated(true)
        await setAuthCookie(response.accessToken)

        if (redirectToProfileOnLogin && !isAuthenticated) {
          window.location.reload()
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to auto-login')
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    void autoLogin()
  }, [isInit, profile, redirectToProfileOnLogin, profilePath, router])

  const value = {
    isAuthenticated,
    isLoading,
    userId,
    accessToken,
    error,
    liffUserProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
