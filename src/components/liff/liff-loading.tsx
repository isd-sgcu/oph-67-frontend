import { LoaderCircle } from 'lucide-react'
import React from 'react'

export const LiffLoading: React.FC = () => {
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-3'>
      <LoaderCircle className='h-12 w-12 animate-spin text-green-500' />
      <p className='font-anuphan font-semibold text-gray-600'>
        Connecting to LINE...
      </p>
    </div>
  )
}
