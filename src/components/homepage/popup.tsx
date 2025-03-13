'use client'

import { X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

const Popup: React.FC = () => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(true)
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='w-[300px] rounded-xl border-0 bg-[linear-gradient(135deg,#EFA8C4_15%,#FFF2CC_30%,#F7A6CC_90%)] sm:max-w-md'>
        {/* Header */}
        <DialogHeader className='flex flex-col items-center'>
          <DialogClose className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-offset-0 disabled:pointer-events-none data-[state=open]:bg-transparent'>
            <X className='h-4 w-4 text-[#ED338C]' />
            <span className='sr-only'>Close</span>
          </DialogClose>
          <div className='flex flex-col items-center justify-center'>
            {/* Logo */}
            <div className='relative flex h-[120px] w-[120px] items-center justify-center'>
              <div className='absolute z-0 h-[140px] w-[140px] -translate-x-1 -translate-y-1 rounded-full bg-white blur-md' />
              <Image
                priority
                alt='logo'
                className='z-10'
                height={80}
                src='/assets/homepage/chula_for_all.svg'
                width={100}
              />
            </div>
            {/* Header Text */}
            <div className='z-10 flex flex-col items-center justify-center'>
              <DialogTitle className='text-center text-sm font-medium text-[#ED338C]'>
                YOUR JOURNEY TO
              </DialogTitle>
              <DialogTitle className='text-center text-sm font-medium text-[#ED338C]'>
                CHULA STARTS HERE!
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className='flex flex-col items-center justify-center gap-[6px] pt-9'>
          <div className='flex h-full w-full flex-col'>
            {/* Box1 Logo */}
            <div className='relative z-10 flex flex-col items-center justify-center'>
              <div className='absolute rounded-full border border-white bg-white/50 px-3 py-2'>
                <Image
                  alt='dice'
                  height={60}
                  src='/assets/homepage/dice.svg'
                  width={60}
                />
              </div>
              <p className='absolute translate-y-10 rounded-full border border-[#ED338C] bg-white/50 px-3 py-1 text-[10px] font-medium text-[#ED338C]'>
                Motivational <b>Postcard!</b>
              </p>

              {/* Ribbon Left */}
              <Image
                alt='ribbon'
                className='absolute -translate-x-20 translate-y-1'
                height={40}
                src='/assets/homepage/ribbon.svg'
                width={40}
              />

              {/* Ribbon Right */}
              <Image
                alt='ribbon'
                className='absolute translate-x-20 translate-y-1 rotate-[30deg]'
                height={40}
                src='/assets/homepage/ribbon.svg'
                width={40}
              />

              {/* Left Box */}
              <p className='absolute -translate-x-20 -translate-y-6 rotate-[-8deg] rounded-full border border-[#ED338C] bg-white px-3 py-1 text-[10px] font-medium text-[#ED338C]'>
                Cute <b>Stickers</b>
              </p>

              {/* Right Box */}
              <p className='absolute -translate-y-6 translate-x-20 rotate-[8deg] rounded-full border border-[#ED338C] bg-white px-3 py-1 text-[10px] font-medium text-[#ED338C]'>
                Stylish <b>Tote bag</b>
              </p>
            </div>

            {/* Box 1 Content */}
            <div className='flex w-full flex-col items-center justify-center gap-1 rounded-md border-2 border-white bg-gradient-to-br from-[#FDDCE6] to-white/60 pb-2 pt-14 shadow-md backdrop-blur-sm'>
              {/* Star Left */}
              <Image
                alt='instagram'
                className='absolute -translate-x-12 -translate-y-14'
                height={18}
                src='/assets/homepage/star_yellow.svg'
                width={18}
              />
              {/* Star Right */}
              <Image
                alt='instagram'
                className='absolute -translate-y-14 translate-x-12 rotate-[30deg]'
                height={18}
                src='/assets/homepage/star_yellow.svg'
                width={18}
              />
              {/* Title */}
              <p className='text-center text-[16px] font-medium text-[#ED338C]'>
                Special!
              </p>
              {/* Subtitle */}
              <div className='flex flex-col items-center justify-center'>
                <p className='text-[10px] font-medium text-[#ED338C]'>
                  ลุ้นรับโอกาสในการคุยกับ<b>พี่จุฬาฯตัวจริง</b>
                </p>
                <p className='text-[10px] font-medium text-[#ED338C]'>
                  ด้วยคะแนนสอบเข้า TCAS อันดับ 1 ของประเทศ!
                </p>
              </div>
              {/* Persons */}
              <div className='flex justify-center gap-2'>
                {/* Person1 */}
                <div className='relative flex flex-col items-center'>
                  <div className='absolute -translate-x-6'>
                    <Image
                      alt='crown'
                      className='translate-x-3 translate-y-1'
                      height={12}
                      src='/assets/homepage/crown.svg'
                      width={12}
                    />
                    <p className='rounded-full border border-[#ED338C] bg-white px-1 text-[6px] font-semibold text-[#ED338C]'>
                      ที่1 บัญชี
                    </p>
                  </div>
                  <Image
                    alt='person1'
                    className='rounded-full'
                    height={40}
                    src='/assets/homepage/person1.png'
                    width={40}
                  />
                  <div className='-translate-y-2 text-center'>
                    <p className='rounded-full bg-white px-2 text-[8px] font-medium text-[#ED338C]'>
                      P&apos;Punch
                    </p>
                    <p className='text-[8px] font-medium text-[#ED338C]'>
                      #Dek66
                    </p>
                  </div>
                </div>
                {/* Person2 */}
                <div className='relative flex flex-col items-center'>
                  <div className='absolute translate-x-6'>
                    <Image
                      alt='crown'
                      className='translate-x-3 translate-y-1 rotate-[30deg]'
                      height={12}
                      src='/assets/homepage/crown.svg'
                      width={12}
                    />
                    <p className='rounded-full border border-[#ED338C] bg-white px-1 text-[6px] font-semibold text-[#ED338C]'>
                      ที่1 แพทย์
                    </p>
                  </div>
                  <Image
                    alt='person2'
                    className='rounded-full'
                    height={40}
                    src='/assets/homepage/person2.png'
                    width={40}
                  />
                  <div className='-translate-y-2 text-center'>
                    <p className='rounded-full bg-white px-2 text-[8px] font-medium text-[#ED338C]'>
                      P&apos;Tony
                    </p>
                    <p className='text-[8px] font-medium text-[#ED338C]'>
                      #Dek67
                    </p>
                  </div>
                </div>
              </div>
              {/* More Info */}
              <p className='text-[8px] font-medium text-[#ED338C]'>
                *ที่นั่งมี<b>จำนวนจำกัด: 1 กล่องต่อ 1 สิทธิ์</b> ในการลุ้น!
              </p>
            </div>
          </div>

          {/* Box2 */}
          <div className='relative flex w-full flex-col items-center justify-center gap-2 rounded-md border-2 border-white bg-[#FDDCE6] py-2 shadow-md backdrop-blur-sm'>
            {/* Star Left */}
            <Image
              alt='instagram'
              className='absolute -translate-x-24 -translate-y-1'
              height={18}
              src='/assets/homepage/star.svg'
              width={18}
            />
            {/* Star Right */}
            <Image
              alt='instagram'
              className='1 absolute -translate-y-1 translate-x-24 rotate-[30deg]'
              height={18}
              src='/assets/homepage/star.svg'
              width={18}
            />

            <div className='flex flex-col items-center justify-center'>
              <p className='text-[8px] font-medium text-[#ED338C]'>
                Don&apos;t Miss!
              </p>
              <p className='text-center text-sm font-medium text-[#ED338C]'>
                Come and find out here!
              </p>
            </div>
            <Link
              className='flex gap-1 rounded-full border border-[#ED338C] bg-white px-3 py-1'
              href='https://www.instagram.com/chulaforall/'
            >
              <Image
                alt='instagram'
                height={12}
                src='/assets/homepage/instagram.svg'
                width={12}
              />
              <p className='text-[10px] font-medium text-[#ED338C]'>
                @chulaforall
              </p>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className='sm:justify-center'>
          <div className='flex flex-col items-center justify-center'>
            <p className='text-[8px] font-medium text-[#ED338C]'>
              *ร้านค้าโดยนิสิต ไม่มีส่วนเกี่ยวข้องกับจุฬาลงกรณ์มหาวิทยาลัย
            </p>
            <p className='text-[8px] font-medium text-[#ED338C]'>
              และโครงการ ChulaOpenhouse2025
            </p>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Popup
