import Image from 'next/image'

const ScanQrCodePage: React.FC = () => {
  return (
    <div className='flex h-screen flex-col items-center bg-gradient-to-br from-[#DD579B] via-[#F2AFD4] to-[#ECF3C0] px-8 py-10'>
      <div className='relative flex flex-col items-center'>
        <div className='absolute left-1/2 top-1/2 z-0 h-[89px] w-[97px] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white blur-xl' />
        <Image
          alt='oph logo'
          className='z-10'
          height={89}
          src='/assets/scan_qr_code/oph-logo.png'
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
    </div>
  )
}

export default ScanQrCodePage
