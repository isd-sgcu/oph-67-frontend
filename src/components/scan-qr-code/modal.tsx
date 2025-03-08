import Image from 'next/image'
import React, { type JSX, useCallback, useEffect, useRef } from 'react'

interface ModalProps {
  modalType: 'confirm' | 'invalid' | 'already'
  userInfo: string | undefined
  scanAgain: () => void
  closeFn: () => void
  time?: string
}

const Modal: React.FC<ModalProps> = ({
  modalType,
  userInfo,
  scanAgain,
  closeFn,
  time,
}) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.focus()
    }
  }, [])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeFn()
      }
    },
    [closeFn]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  const renderContent = (): JSX.Element => {
    switch (modalType) {
      case 'confirm':
        return (
          <div className='flex flex-col items-center px-6 py-8 text-center'>
            <h2 className='mb-5 text-2xl font-medium' id='modal-title'>
              Confirm!
            </h2>
            <div className='relative mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-50'>
              <Image
                alt='confirm'
                height={40}
                src='/assets/scan_qr_code/confirm-icon.svg'
                width={40}
              />
            </div>
            <div className='mb-1 text-lg'>สแกนสำเร็จ ยินดีต้อนรับ</div>
            <div className='mb-6 text-xl font-semibold text-dark-pink'>
              {userInfo}
            </div>
            <div className='flex w-full flex-col gap-3'>
              <button
                className='h-11 w-full cursor-pointer rounded-lg bg-dark-pink font-medium text-white shadow-md transition-colors hover:bg-opacity-90'
                type='button'
                onClick={() => {
                  scanAgain()
                  closeFn()
                }}
              >
                สแกนต่อ
              </button>
              <button
                className='h-11 w-full cursor-pointer rounded-lg border border-dark-pink font-medium text-dark-pink shadow-sm transition-colors hover:bg-pink-50'
                type='button'
                onClick={closeFn}
              >
                กลับ
              </button>
            </div>
          </div>
        )
      case 'invalid':
        return (
          <div className='flex flex-col items-center px-6 py-8 text-center'>
            <h2 className='mb-5 text-2xl font-medium' id='modal-title'>
              Invalid QR-Code
            </h2>
            <div className='relative mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50'>
              <Image
                alt='invalid'
                height={40}
                src='/assets/scan_qr_code/disable-icon.svg'
                width={40}
              />
            </div>
            <div className='mb-6 text-lg'>สแกนไม่สำเร็จ โปรดลองอีกครั้ง</div>
            {userInfo && userInfo !== 'No QR code detected' ? (
              <div className='mb-6 max-w-[220px] text-sm text-gray-600'>
                {userInfo}
              </div>
            ) : null}
            <div className='w-full'>
              <button
                className='h-11 w-full cursor-pointer rounded-lg bg-dark-pink font-medium text-white shadow-md transition-colors hover:bg-opacity-90'
                type='button'
                onClick={() => {
                  scanAgain()
                  closeFn()
                }}
              >
                สแกนอีกครั้ง
              </button>
            </div>
          </div>
        )
      case 'already':
        return (
          <div className='flex flex-col items-center px-6 py-8 text-center'>
            <h2 className='mb-5 text-2xl font-medium' id='modal-title'>
              Already Scanned
            </h2>
            <div className='relative mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50'>
              <Image
                alt='already'
                height={40}
                src='/assets/scan_qr_code/disable-icon.svg'
                width={40}
              />
            </div>
            <div className='mb-1 text-lg'>ผู้ใช้สแกน QR-code นี้แล้ว</div>
            <div className='mb-6 text-sm text-gray-600'>เมื่อเวลา {time}</div>
            <div className='w-full'>
              <button
                className='h-11 w-full cursor-pointer rounded-lg bg-dark-pink font-medium text-white shadow-md transition-colors hover:bg-opacity-90'
                type='button'
                onClick={closeFn}
              >
                กลับ
              </button>
            </div>
          </div>
        )
      default:
        return <div />
    }
  }

  return (
    <div
      ref={modalRef}
      aria-labelledby='modal-title'
      aria-modal='true'
      className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-500 bg-opacity-75 backdrop-blur-sm transition-all duration-300 ease-in-out'
      role='dialog'
    >
      <button
        aria-label='Close modal'
        className='absolute inset-0 h-full w-full cursor-default focus:outline-none'
        type='button'
        onClick={closeFn}
      />
      <div
        ref={contentRef}
        aria-describedby='modal-description'
        className='animate-fadeIn relative w-[320px] overflow-hidden rounded-xl bg-white shadow-lg focus:outline-none'
        tabIndex={-1}
      >
        {renderContent()}
      </div>
    </div>
  )
}

export default Modal
