'use client'
import { AlertCircle } from 'lucide-react'
import React from 'react'

interface LiffErrorProps {
  error: string
}

export const LiffError: React.FC<LiffErrorProps> = ({ error }) => {
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-3'>
      <AlertCircle className='h-12 w-12 text-red-500' />
      <p className='font-anuphan font-semibold text-gray-600'>{error}</p>
      <button
        className='text-green-500 hover:text-green-700'
        type='button'
        onClick={() => window.location.reload()}
      >
        Try Again
      </button>
    </div>
  )
}
