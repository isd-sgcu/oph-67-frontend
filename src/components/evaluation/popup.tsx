'use client'

import { DialogTitle } from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog'

import { Button } from '../ui/button'

interface PopupProps {
  setShowPopup: (open: boolean) => void
  fullName: string
  onConfirm: () => void
}

const Popup: React.FC<PopupProps> = ({ setShowPopup, fullName, onConfirm }) => {
  const closePopup = (): void => {
    setShowPopup(false)
  }

  return (
    <Dialog open onOpenChange={setShowPopup}>
      <DialogContent className='flex w-[322px] flex-col items-center gap-6 rounded-xl border-0 bg-white font-mitr sm:max-w-md'>
        {/* Header */}
        <DialogHeader className='flex flex-col items-center p-0'>
          <DialogClose className='absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-0'>
            <X className='h-4 w-4' />
            <span className='sr-only'>Close</span>
          </DialogClose>
          <div className='mt-4 flex flex-col items-center justify-center gap-2'>
            <DialogTitle className='text-3xl font-normal text-[#f00]'>
              ตรวจสอบ!!
            </DialogTitle>
            <p className='text-sm font-light text-[#f00]'>
              ชื่อ-นามสกุลบนเกียรติบัตรของท่านคือ
            </p>
          </div>
        </DialogHeader>

        {/* Firstname - Lastname */}
        <div className='h-fit w-fit rounded border border-[#064E41] px-4 py-2 text-center text-xl font-normal text-[#064E41]'>
          {fullName}
        </div>

        <p className='text-center text-base font-light text-[#F00]'>
          *หากยืนยันแล้วจะไม่สามารถแก้ไขได้
        </p>

        {/* Footer */}
        <DialogFooter className='sm:justify-center'>
          <div className='flex gap-4'>
            <Button className='px-10 shadow-xl' onClick={closePopup}>
              <p className='text-xl text-white'>แก้ไข</p>
            </Button>
            <Button className='px-10 shadow-xl' onClick={onConfirm}>
              <p className='text-xl text-white'>ยืนยัน</p>
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Popup
