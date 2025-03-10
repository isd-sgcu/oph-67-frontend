'use client'

import { EditSolid } from '@mynaui/icons-react'
import Image from 'next/image'
import Link from 'next/link'

import { config } from '@/app/config'
import QrButton from '@/components/scan-qr-code/qr-button'
import { Button } from '@/components/ui/button'

const ScanQrCodePage: React.FC = () => {
  return (
    <div className='flex h-screen flex-col items-center justify-between bg-gradient-to-br from-[#DD579B] via-[#F2AFD4] to-[#ECF3C0] px-8 py-10'>
      <section className='flex flex-col items-center'>
        <div className='relative flex flex-col items-center'>
          <div className='absolute left-1/2 top-1/2 z-0 h-[89px] w-[97px] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white blur-xl' />
          <Image
            alt='oph logo'
            className='z-10'
            height={89}
            src={`${config.cdnURL}/assets/scan_qr_code/oph-logo.png`}
            width={97}
          />
        </div>
        <div className='mt-2 font-ubuntu text-base font-normal text-white'>
          CHULA OPENHOUSE 2025
        </div>
        <div className='mt-8 flex flex-col items-center gap-1 font-ubuntu'>
          <div className='text-2xl font-normal text-white'>Welcome!, Staff</div>
          <div className='text-base font-normal text-white'>username</div>
        </div>
        <QrButton />
      </section>

      <Link className='mt-4' href='/admin/profile/edit'>
        <Button
          className='text-md flex h-12 w-72 flex-row items-center justify-center rounded-full bg-white font-normal hover:bg-white/90'
          size='sm'
          variant='outline'
        >
          <EditSolid className='mr-2' />
          แก้ไขข้อมูลส่วนตัว
        </Button>
      </Link>
    </div>
  )
}

export default ScanQrCodePage
