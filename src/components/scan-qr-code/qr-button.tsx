'use client'

import { ScanLine } from 'lucide-react'
import { useState } from 'react'

import { getUser } from '@/app/actions/get-profile/get-user'
import { scanQRCode } from '@/app/actions/qr-code/scan-qr'
import { useAuth } from '@/components/auth/auth-provider'
import { useLiffContext } from '@/components/liff/liff-provider'
import { Button } from '@/components/ui/button'

import { StatusModal, type StatusModalType } from './status-modal'

const QrButton: React.FC = () => {
  const { liff, isInit } = useLiffContext()
  const { accessToken } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<StatusModalType>('failed')
  const [userName, setUserName] = useState<string>()
  const [staffType, setStaffType] = useState<string>()
  const [time, setTime] = useState<string>()
  const [errorMessage, setErrorMessage] = useState<string>()
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
        setModalType('failed')
        setErrorMessage('LIFF is not initialized')
        setIsModalOpen(true)
        return
      }

      // Check if running in LINE app
      if (!liff.isInClient()) {
        setModalType('failed')
        setErrorMessage('Please open this page in LINE app')
        setIsModalOpen(true)
        return
      }

      setIsScanning(true)

      try {
        const scanResult = await liff.scanCodeV2()
        const scannedUserId = scanResult.value

        if (!scannedUserId) {
          setModalType('failed')
          setErrorMessage('No QR code detected')
          setIsModalOpen(true)
          return
        }

        if (!accessToken) {
          setModalType('failed')
          setErrorMessage('Authentication failed. Please log in again.')
          setIsModalOpen(true)
          return
        }

        try {
          const userData = await getUser(scannedUserId, accessToken)

          if (userData.lastEntered) {
            setModalType('already-taken')
            setTime(userData.lastEntered)
            setUserName(userData.name ?? scannedUserId)
            setIsModalOpen(true)
            return
          }

          const result = await scanQRCode(accessToken, scannedUserId)

          if (!result.success) {
            if (result.error === 'User has already entered') {
              setModalType('already-taken')
              setTime(result.lastEntered)
            } else {
              setModalType('failed')
              setErrorMessage(result.error ?? 'Invalid QR code')
            }
            setIsModalOpen(true)
            return
          }

          if (result.data) {
            setModalType('success')
            setUserName(result.data.name)

            // Determine staff type based on role
            let type: string | undefined
            if (userData.role === 'central_staff') {
              type = 'ส่วนกลาง'
            } else if (userData.role === 'faculty_staff') {
              type = 'คณะ'
            }

            setStaffType(type)
            setTime(result.data.lastEntered)
            setIsModalOpen(true)
          }
        } catch (userError) {
          console.error('Error getting user data:', userError)
          setModalType('failed')
          setErrorMessage('Failed to get user information')
          setIsModalOpen(true)
        }
      } catch (scanError) {
        console.error('QR Scan Error:', scanError)
        setModalType('failed')
        setErrorMessage('Failed to scan QR code')
        setIsModalOpen(true)
      }
    } catch (error) {
      console.error('General Error:', error)
      setModalType('failed')
      setErrorMessage('An unexpected error occurred')
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
        onClick={() => void handleScan()}
      >
        <ScanLine className={isScanning ? 'animate-pulse' : ''} size={26} />
        <span>{getButtonText()}</span>
      </Button>

      <StatusModal
        errorMessage={errorMessage}
        open={isModalOpen}
        staffType={staffType}
        time={time}
        type={modalType}
        userId={userName}
        onClose={() => setIsModalOpen(false)}
        onScanAgain={() => void handleScan()}
      />
    </div>
  )
}

export default QrButton
