'use client'
import { type Liff } from '@line/liff'
import React, { type ReactNode, createContext, useContext } from 'react'

import { useLiff } from '@/lib/liff'

import { LiffError } from './liff-error'
import { LiffLoading } from './liff-loading'

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
}

export const LiffProvider: React.FC<LiffProviderProps> = ({ children }) => {
  const { isInit, error, profile, liff } = useLiff()

  if (error) {
    return <LiffError error={error} />
  }

  if (!isInit) {
    return <LiffLoading />
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
