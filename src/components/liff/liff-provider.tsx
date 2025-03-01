'use client'
import { type Liff } from '@line/liff'
import React, { type ReactNode, createContext, useContext } from 'react'

import { useLiff } from '@/lib/liff'

interface LiffContextType {
  liff: Liff | null
  isInit: boolean
  error?: string
  profile?: {
    userId: string
    displayName: string
    pictureUrl?: string
    email?: string
  }
}

const LiffContext = createContext<LiffContextType>({
  liff: null,
  isInit: false,
})

export const useLiffContext = (): LiffContextType => {
  const context = useContext(LiffContext)
  return context
}

interface LiffProviderProps {
  children: ReactNode
  fallback?: ReactNode
  errorComponent?: (error: string) => ReactNode
}

export const LiffProvider: React.FC<LiffProviderProps> = ({
  children,
  // TODO: Add loading uis
  fallback = <div>Loading LIFF...</div>,
  errorComponent = (error) => <div>Error: {error}</div>,
}) => {
  const { isInit, error, profile, liff } = useLiff()

  if (error) {
    return <>{errorComponent(error)}</>
  }

  if (!isInit) {
    return <>{fallback}</>
  }

  return (
    <LiffContext.Provider
      value={{
        liff,
        isInit,
        error,
        profile,
      }}
    >
      {children}
    </LiffContext.Provider>
  )
}
