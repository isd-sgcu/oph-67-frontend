'use client'

import { ScanLine } from 'lucide-react'
import { useState } from 'react'

import { scanQRCode } from '@/app/actions/qr-code/scan-qr'
import { useLiffContext } from '@/components/liff/liff-provider'

import Modal from './modal'

type ModalType = 'confirm' | 'invalid' | 'already'

const QrButton: React.FC = () => {
  const { liff } = useLiffContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<ModalType>('invalid')
  const [userInfo, setUserInfo] = useState<string>()
  const [time, setTime] = useState<string>()

  const handleScan = async (): Promise<void> => {
    try {
      if (!liff) {
        console.error('LIFF is not initialized')
        return
      }

      const scanResult = await liff.scanCodeV2()
      const studentId = scanResult.value

      if (!studentId) {
        console.error('Failed scanning QR: No studentId')
        setModalType('invalid')
        setIsModalOpen(true)
        return
      }

      const result = await scanQRCode(studentId)

      if (!result.success) {
        if (result.error === 'User has already entered') {
          setModalType('already')
          setTime(result.lastEntered)
          setUserInfo(studentId)
        } else {
          setModalType('invalid')
        }
        setIsModalOpen(true)
        return
      }

      setModalType('confirm')
      setUserInfo(result.data?.name)
      setTime(result.data?.lastEntered)
      setIsModalOpen(true)
    } catch (error) {
      console.error('Failed to scan QR code:', error)
      setModalType('invalid')
      setIsModalOpen(true)
    }
  }

  return (
    <div className='mt-12 flex cursor-pointer justify-center'>
      <button
        className='flex h-12 w-72 flex-row items-center justify-center rounded-full bg-white px-4 py-2 text-lg text-dark-pink hover:bg-white/90'
        type='button'
        onClick={handleScan}
      >
        <ScanLine className='mr-2' size={26} />
        <span>คลิกเพื่อสแกน</span>
      </button>

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
