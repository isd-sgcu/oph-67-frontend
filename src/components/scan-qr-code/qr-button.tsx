'use client'

import { ScanLine } from 'lucide-react'
import { useState } from 'react'

// import { scanQRCode } from '@/app/actions/qr-code/scan-qr'
import { useLiffContext } from '@/components/liff/liff-provider'
import { Button } from '@/components/ui/button'

import Modal from './modal'

type ModalType = 'confirm' | 'invalid' | 'already'

const QrButton: React.FC = () => {
  const { liff, isInit } = useLiffContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<ModalType>('invalid')
  const [userInfo, setUserInfo] = useState<string>()
  const [time, setTime] = useState<string>()
  const [isScanning, setIsScanning] = useState(false)

  const getButtonText = (): string => {
    if (isScanning) {
      return 'กำลังสแกน...'
    }
    if (!isInit) {
      return 'กำลังโหลด...'
    }
    return 'คลิกเพื่อสแกน'
  }

  const handleScan = async (): Promise<void> => {
    try {
      // Check if LIFF is initialized
      if (!isInit || !liff) {
        setModalType('invalid')
        setUserInfo('LIFF is not initialized')
        setIsModalOpen(true)
        return
      }

      // Check if running in LINE app
      if (!liff.isInClient()) {
        setModalType('invalid')
        setUserInfo('Please open this page in LINE app')
        setIsModalOpen(true)
        return
      }

      setIsScanning(true)

      try {
        const scanResult = await liff.scanCodeV2()
        const studentId = scanResult.value

        if (!studentId) {
          setModalType('invalid')
          setUserInfo('No QR code detected')
          setIsModalOpen(true)
          return
        }

        const result = {
          success: true,
          error: null,
          lastEntered: '2025-03-07 10:00:00',
          data: {
            name: 'John Doe',
            lastEntered: '2025-03-07 10:00:00',
          },
        }

        // if (!result.success) {
        //   if (result.error === 'User has already entered') {
        //     setModalType('already')
        //     setTime(result.lastEntered)
        //     setUserInfo(studentId)
        //   } else {
        //     setModalType('invalid')
        //     setUserInfo('')
        //   }
        //   setIsModalOpen(true)
        //   return
        // }

        // Success case
        setModalType('confirm')
        setUserInfo(result.data.name)
        setTime(result.data.lastEntered)
        setIsModalOpen(true)
      } catch (scanError) {
        console.error('QR Scan Error:', scanError)
        setModalType('invalid')
        setUserInfo('Failed to scan QR code')
        setIsModalOpen(true)
      }
    } catch (error) {
      console.error('General Error:', error)
      setModalType('invalid')
      setUserInfo('An unexpected error occurred')
      setIsModalOpen(true)
    } finally {
      setIsScanning(false)
    }
  }

  return (
    <div className='mt-12 flex cursor-pointer justify-center'>
      <Button
        className='flex h-12 w-72 items-center justify-center gap-2 rounded-full bg-white text-lg text-dark-pink hover:bg-white/90 disabled:bg-white/50'
        disabled={isScanning || !isInit}
        type='button'
        onClick={handleScan}
      >
        <ScanLine className={isScanning ? 'animate-pulse' : ''} size={26} />
        <span>{getButtonText()}</span>
      </Button>

      {isModalOpen ? (
        <Modal
          closeFn={() => setIsModalOpen(false)}
          modalType={modalType}
          scanAgain={handleScan}
          time={time}
          userInfo={userInfo}
        />
      ) : null}
    </div>
  )
}

export default QrButton
