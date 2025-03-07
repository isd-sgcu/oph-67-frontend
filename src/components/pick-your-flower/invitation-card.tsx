import Image from 'next/image'
import React from 'react'

const InvitationCard: React.FC = () => {
  const handleShare: () => Promise<void> = async () => {
    const shareData = {
      title: 'CU Open House 2025',
      text: 'Come joy us at CU OPH 2025!',
      url: 'https://www.youtube.com/',
    }
    try {
      await navigator.share(shareData)
    } catch (error) {
      console.error('Error sharing', error)
    }
    console.log('share link')
  }

  return (
    <div className='flex h-[144px] w-[288px] items-center justify-center rounded-md border border-[#EA88BD] bg-gradient-to-r from-[#FFFFFF] to-[#FAE9F3] shadow-[0_3px_2px_0px_#DD579B]'>
      <div className='flex flex-col items-center justify-center gap-1'>
        <Image
          alt='qrcode'
          height={93}
          src='/assets/pick-your-flower/qrcode.png'
          width={93}
        />
        <div className='font-mitr text-xs font-light text-primary-green'>
          ชวนเพื่อนเลย!
        </div>
      </div>
      <div className='ml-2.5 flex flex-col items-start justify-center gap-1.5'>
        <Image
          alt='oph logo'
          height={45}
          src='/assets/pick-your-flower/cu-oph-logo.svg'
          width={57}
        />
        <div className='flex flex-col font-mitr text-[10px] font-light text-primary-green'>
          <div>29 - 30 มีนาคม 2568</div>
          <div>08:00 - 16:00 น.</div>
          <div>@Chulalongkorn university</div>
        </div>
        <button
          className='flex w-[129px] items-center justify-center gap-1 rounded-lg bg-[#DD579B] py-0.5'
          type='button'
          onClick={handleShare}
        >
          <Image
            alt='link'
            height={16}
            src='/assets/pick-your-flower/link.svg'
            width={16}
          />
          <div className='font-mitr text-sm font-light tracking-tight text-white'>
            Share link
          </div>
        </button>
      </div>
      <div className='flex h-full flex-col items-start justify-start pt-2'>
        <Image
          alt='flower'
          height={30}
          src='/assets/pick-your-flower/share-flower.svg'
          width={30}
        />
      </div>
    </div>
  )
}

export default InvitationCard
