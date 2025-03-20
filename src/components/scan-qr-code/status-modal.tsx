'use client'

import React, { type ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import {
  CustomDialog,
  CustomDialogContent,
} from '@/components/ui/custom-dialog'

export type StatusModalType = 'success' | 'failed' | 'already-taken'

interface StatusModalProps {
  type: StatusModalType
  open: boolean
  onClose: () => void
  onScanAgain?: () => void
  staffType?: string
  userId?: string
  time?: string
  errorMessage?: string
}

export const StatusModal = ({
  type,
  open,
  onClose,
  onScanAgain,
  staffType,
  userId = '123456789',
  time = 'xx:xx น.',
  errorMessage,
}: StatusModalProps): ReactNode => {
  const renderContent = (): ReactNode => {
    switch (type) {
      case 'success':
        return (
          <div className='flex flex-col items-center px-6 py-5 text-center'>
            <h2 className='mb-4 text-2xl font-medium'>Confirm!</h2>
            <div className='relative mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100'>
              <svg
                className='h-8 w-8 text-green-500'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M5 13l4 4L19 7'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                />
              </svg>
            </div>
            <p className='mb-1 text-base'>สแกนสำเร็จ ยินดีต้อนรับ</p>
            {staffType ? <div className='mb-2 rounded-md bg-amber-800 px-4 py-1 text-sm text-white'>
                STAFF {staffType}
              </div> : null}
            {userId ? <p className='mb-5 font-medium text-pink-500'>{userId}</p> : null}
            <div className='flex w-full flex-col gap-3'>
              <Button
                className='w-full bg-[#DD579B] text-white hover:bg-[#DD579B]/90'
                onClick={() => {
                  if (onScanAgain) onScanAgain()
                  onClose()
                }}
              >
                สแกนต่อ
              </Button>
              <Button
                className='w-full border-[#DD579B] text-[#DD579B] hover:bg-pink-50'
                variant='outline'
                onClick={onClose}
              >
                กลับ
              </Button>
            </div>
          </div>
        )

      case 'failed':
        return (
          <div className='flex flex-col items-center px-6 py-5 text-center'>
            <h2 className='mb-4 text-2xl font-medium'>Invalid QR-code</h2>
            <div className='relative mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100'>
              <svg
                className='h-8 w-8 text-red-500'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M6 18L18 6M6 6l12 12'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                />
              </svg>
            </div>
            <p className='mb-2 text-base'>สแกนไม่สำเร็จ โปรดลองอีกครั้ง</p>
            {errorMessage ? <p className='mb-4 max-w-[250px] break-words text-sm text-gray-500'>
                {errorMessage}
              </p> : null}
            <Button
              className='w-full bg-[#DD579B] text-white hover:bg-[#DD579B]/90'
              onClick={() => {
                if (onScanAgain) onScanAgain()
                onClose()
              }}
            >
              สแกนอีกครั้ง
            </Button>
          </div>
        )

      case 'already-taken':
        return (
          <div className='flex flex-col items-center px-6 py-5 text-center'>
            <h2 className='mb-4 text-2xl font-medium'>Already taken!</h2>
            <div className='relative mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100'>
              <svg
                className='h-8 w-8 text-amber-500'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M6 18L18 6M6 6l12 12'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                />
              </svg>
            </div>
            <p className='mb-1 text-base'>ผู้ใช้สแกน QR-code นี้แล้ว</p>
            <p className='mb-5 text-sm text-gray-500'>เมื่อเวลา {time}</p>
            <Button
              className='w-full bg-[#DD579B] text-white hover:bg-[#DD579B]/90'
              onClick={onClose}
            >
              กลับ
            </Button>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <CustomDialog open={open} onOpenChange={(open) => !open && onClose()}>
      <CustomDialogContent
        hideCloseButton
        className='max-w-[320px] rounded-xl border-none p-0 shadow-lg'
      >
        {renderContent()}
      </CustomDialogContent>
    </CustomDialog>
  )
}
