import Image from 'next/image'
import React, { type JSX } from 'react'

interface ModalProps {
  modalType: 'confirm' | 'invalid' | 'already'
  userInfo: string | undefined
  scanAgain: () => void
  closeFn: () => void
  time?: string // Optional prop for 'already' type
}

const Modal: React.FC<ModalProps> = ({
  modalType,
  userInfo,
  scanAgain,
  closeFn,
  time,
}) => {
  const modalClasses =
    'fixed inset-0 z-50 overflow-y-auto justify-center flex bg-gray-500 bg-opacity-75 transition-all ease-in-out duration-300'

  const renderContent = (): JSX.Element => {
    switch (modalType) {
      case 'confirm':
        return (
          <div>
            <div className='text-28s mb-4 mt-6 font-normal'>Confirm!</div>
            <Image
              alt='confirm'
              height={36}
              src='/assets/scan_qr_code/confirm-icon.svg'
              width={36}
            />
            <div className='mt-4 text-lg'>สแกนสำเร็จ ยินดีต้อนรับ</div>
            <div className='text-lg font-semibold text-dark-pink'>
              {userInfo}
            </div>
            <div className='my-4 flex flex-col items-center justify-center'>
              <button
                className='flex h-10 w-32 cursor-pointer items-center justify-center rounded-lg bg-dark-pink text-white shadow-md'
                type='button'
                onClick={() => {
                  scanAgain()
                  closeFn()
                }}
              >
                สแกนต่อ
              </button>
              <button
                className='mt-3 flex h-10 w-32 cursor-pointer items-center justify-center rounded-lg border border-dark-pink text-dark-pink shadow-md'
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
          <div>
            <div className='text-28s mb-4 mt-6 font-normal'>
              Invalid QR-Code
            </div>
            <Image
              alt='invalid'
              height={36}
              src='/assets/scan_qr_code/disable-icon.svg'
              width={36}
            />
            <div className='mt-4 text-lg'>สแกนไม่สำเร็จ โปรดลองอีกครั้ง</div>
            <div className='my-4 flex flex-col items-center justify-center'>
              <button
                className='flex h-10 w-32 cursor-pointer items-center justify-center rounded-lg border bg-dark-pink text-white shadow-md'
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
          <div>
            <div className='text-28s mb-4 mt-6 font-normal'>Already taken!</div>
            <Image
              alt='already'
              height={36}
              src='/assets/scan_qr_code/disable-icon.svg'
              width={36}
            />
            <div className='mt-4'>ผู้ใช้สแกน QR-code นี้แล้ว</div>
            <div className='mt-1'>เมื่อเวลา {time}</div>
            <div className='my-4 flex flex-col items-center justify-center'>
              <button
                className='flex h-10 w-32 cursor-pointer items-center justify-center rounded-lg border bg-dark-pink text-white shadow-md'
                type='button'
                onClick={() => {
                  closeFn()
                }}
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
    <button className={modalClasses} type='button' onClick={closeFn}>
      <div className='flex h-full items-center'>
        <div className='flex flex-row items-center justify-center'>
          <button
            className='flex h-full w-72 flex-col items-center justify-center rounded-lg bg-white'
            type='button'
            onClick={(e) => e.stopPropagation()}
          >
            {renderContent()}
          </button>
        </div>
      </div>
    </button>
  )
}

export default Modal
