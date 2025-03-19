'use client'

import { X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { config } from '@/app/config'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog'

const Popup: React.FC = () => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(true)
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='w-[300px] rounded-xl border-0 bg-[linear-gradient(135deg,#EFA8C4_15%,#FFF2CC_30%,#F7A6CC_90%)] font-anuphan sm:max-w-md'>
        <DialogHeader className='flex flex-col items-center p-0'>
          <DialogClose className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-offset-0 disabled:pointer-events-none data-[state=open]:bg-transparent'>
            <X className='h-4 w-4 text-[#ED338C]' />
            <span className='sr-only'>Close</span>
          </DialogClose>
        </DialogHeader>

        {/* Header */}
        <div className='flex flex-col items-center justify-center p-0'>
          {/* Logo */}
          <div className='relative flex h-auto w-[120px] items-center justify-center'>
            <div className='absolute z-0 h-full w-full -translate-x-1 -translate-y-1 rounded-full bg-white blur-md' />
            <object
              className='z-10 h-[80px] w-[100px]'
              data={`${config.cdnURL}/assets/homepage/chula_for_all.svg`}
              type='image/svg+xml'
            >
              <Image
                alt='logo'
                className='z-10'
                height={80}
                src={`${config.cdnURL}/assets/homepage/chula_for_all.svg`}
                width={100}
              />
            </object>
          </div>
          {/* Text */}
          <Image
            alt='logo_text'
            height={10}
            src="/assets/homepage/group_popup_header.png"
            width={150}
          />
        </div>

        <Link
          className='flex flex-col'
          href='https://www.instagram.com/chulaforall/'
        >
          {/* Main Image */}
          <div className='relative flex justify-center'>
            <Image
              alt='group_giftset'
              height={220}
              src="/assets/homepage/group_giftset.png"
              width={300}
            />
            <p className='absolute -translate-x-20 translate-y-32 rotate-[-8deg] rounded-full border border-[#ED338C] bg-white px-2 py-[2px] text-[8px] font-medium text-[#ED338C]'>
              Cute <b>Stickers</b>
            </p>
            <p className='absolute translate-x-24 translate-y-32 rotate-[8deg] rounded-full border border-[#ED338C] bg-white px-2 py-[2px] text-[8px] font-medium text-[#ED338C]'>
              Stylish <b>Tote bag</b>
            </p>
            <p className='absolute translate-y-40 rounded-full border border-[#ED338C] bg-white px-2 py-[2px] text-[8px] font-medium text-[#ED338C]'>
              Motivational <b>Postcard</b>
            </p>
          </div>

          {/* Content */}
          <div className='flex flex-col items-center justify-center gap-[6px]'>
            {/* Box 1 */}
            <div className='relative'>
              <div className='absolute z-0 h-[160%] w-[105%] -translate-x-1 -translate-y-4 bg-white blur-xl' />
              {/* Box 1 Header */}
              <div className='relative z-10 flex justify-center gap-[6px]'>
                <Image
                  alt='star_yellow'
                  height={12}
                  src={`${config.cdnURL}/assets/homepage/star_yellow.svg`}
                  width={12}
                />
                <h3 className='text-[12px] font-medium text-[#ED338C]'>
                  <b>Special!</b>
                </h3>
                <Image
                  alt='star_yellow'
                  className='rotate-[30deg]'
                  height={12}
                  src={`${config.cdnURL}/assets/homepage/star_yellow.svg`}
                  width={12}
                />
              </div>

              {/* Box 1 Content */}
              <div className='relative z-10 flex flex-col items-center'>
                <p className='text-[12px] font-medium text-[#ED338C]'>
                  <b>ทุกกล่องมีตั๋ว</b>เพื่อคุยกับ<b>พี่จุฬาฯ ตัวจริง</b>
                </p>
                <p className='text-[12px] font-medium text-[#ED338C]'>
                  ด้วยคะแนนสอบเข้า <b>TCAS</b> อันดับ <b>1</b> ของประเทศ!
                </p>
              </div>
            </div>

            {/* Box2 */}
            <div className='relative flex w-[222px] flex-col items-center justify-center rounded-xl border-2 border-white bg-[#FDDCE6] py-2 shadow-md backdrop-blur-sm'>
              {/* Star Left */}
              <Image
                alt='instagram'
                className='absolute -translate-x-20 -translate-y-2'
                height={18}
                src={`${config.cdnURL}/assets/homepage/star.svg`}
                width={18}
              />
              {/* Star Right */}
              <Image
                alt='instagram'
                className='absolute -translate-y-2 translate-x-20 rotate-[30deg]'
                height={18}
                src={`${config.cdnURL}/assets/homepage/star.svg`}
                width={18}
              />

              <div className='flex flex-col items-center justify-center'>
                <p className='text-[8px] font-medium text-[#ED338C]'>
                  Don&apos;t Miss!
                </p>
                <p className='text-[12px] font-medium text-[#ED338C]'>
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
                  src={`${config.cdnURL}/assets/homepage/instagram.svg`}
                  width={12}
                />
                <p className='text-[10px] font-medium text-[#ED338C]'>
                  @chulaforall
                </p>
              </Link>
            </div>
          </div>

          {/* Footer */}
          <DialogFooter className='pt-4 sm:justify-center'>
            <div className='flex flex-col items-center justify-center'>
              <p className='text-[8px] font-medium text-[#ED338C]'>
                *ร้านค้าโดยนิสิต ไม่มีส่วนเกี่ยวข้องกับจุฬาลงกรณ์มหาวิทยาลัย
              </p>
              <p className='text-[8px] font-medium text-[#ED338C]'>
                และโครงการ ChulaOpenhouse2025
              </p>
            </div>
          </DialogFooter>
        </Link>
      </DialogContent>
    </Dialog>
  )
}

export default Popup
