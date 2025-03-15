'use client'

import Image from 'next/image'
import Link from 'next/link'

import { config } from '@/app/config'

const Footer: React.FC = () => {
  return (
    <div>
      {/* Footer Part 1 */}
      <div className='flex h-16 w-full items-center justify-center gap-9 border-t border-[#FBDAED] bg-gradient-to-r from-white via-[#FEF5FA] to-[#FEF6E9]'>
        <Image
          alt='faq'
          height={32}
          src='/assets/sponsor/centralretail.png'
          width={72.53}
        />
        <Image
          alt='faq'
          height={38.5}
          src='/assets/sponsor/MJG.png'
          width={22.95}
        />
        <Image
          alt='faq'
          height={16}
          src='/assets/sponsor/Gulf.png'
          width={53}
        />
        <Image
          alt='faq'
          height={32}
          src='/assets/sponsor/culture_chula.PNG'
          width={72.53}
        />
      </div>

      {/* Footer Part 2 */}
      <div className='flex h-auto bg-[linear-gradient(135deg,#EFA8C4_15%,#FFF2CC_50%,#F7A6CC_90%)] px-2 pb-4 pt-4'>
        {/* Left Part */}
        <div className='flex w-2/6 flex-col items-center justify-center'>
          {/* Logo */}
          <div className='relative mb-4 flex items-center justify-center'>
            <div className='absolute z-0 h-[120px] w-[100px] -translate-x-1 -translate-y-1 rounded-full bg-white blur-md' />
            <object
              className='z-10 h-[80px] w-[80px]'
              data={`${config.cdnURL}/assets/homepage/chula_for_all.svg`}
              type='image/svg+xml'
            >
              <Image
                alt='logo'
                className='z-10'
                height={80}
                src={`${config.cdnURL}/assets/homepage/chula_for_all.svg`}
                width={80}
              />
            </object>
          </div>
          {/* Header Text */}
          <div className='flex flex-col items-center justify-center text-center text-[8px] font-medium text-[#ED338C]'>
            <p>YOUR JOURNEY TO</p>
            <p>CHULA STARTS HERE!</p>
          </div>
        </div>

        {/* Right Part */}
        <div className='flex w-4/6 flex-col items-center'>
          <div className='flex gap-0'>
            {/* Star Left */}
            <Image
              alt='star_left'
              height={20}
              src={`${config.cdnURL}/assets/homepage/star_yellow.svg`}
              width={20}
            />

            {/* Text */}
            <object
              className='z-10 h-[20px] w-[85px]'
              data={`${config.cdnURL}/assets/homepage/special_text.svg`}
              type='image/svg+xml'
            >
              <Image
                alt='logo'
                height={16}
                src={`${config.cdnURL}/assets/homepage/special_text.svg`}
                width={56}
              />
            </object>
            {/* Star Right */}
            <Image
              alt='star_right'
              className='rotate-[30deg]'
              height={20}
              src={`${config.cdnURL}/assets/homepage/star_yellow.svg`}
              width={20}
            />
          </div>

          {/* Dice */}
          <div className='mt-8 flex items-center justify-center gap-0'>
            <div className='absolute rounded-full border border-white bg-white/50 px-3 py-2'>
              <Image
                alt='dice'
                height={60}
                src={`${config.cdnURL}/assets/homepage/dice.svg`}
                width={60}
              />
            </div>
          </div>

          {/* Title */}
          <div className='mt-9 flex flex-col items-center justify-center'>
            <div className='relative w-fit'>
              <div className='absolute z-0 h-8 w-full -translate-y-2 rounded-full bg-white blur-sm' />
              <p className='relative z-10 text-[8px] font-medium text-[#ED338C]'>
                ลุ้นรับโอกาสในการคุยกับ<b>พี่จุฬาฯตัวจริง</b>
              </p>
            </div>
            <div className='relative w-fit'>
              <div className='absolute z-0 h-5 w-full -translate-y-1 bg-white blur-sm' />
              <p className='relative z-10 text-[8px] font-medium text-[#ED338C]'>
                โดย <b>#ที่1บัญชี (TCAS66)</b> และ <b>#ที่1แพทย์ฯ(TCAS67)</b>
              </p>
            </div>
          </div>

          {/* Instagram */}
          <div className='relative mt-3 flex w-auto items-center justify-center gap-1 rounded-xl border-2 border-white bg-[#FDF8F8] px-5 py-1 shadow-md'>
            {/* Ribbon Left */}
            <object
              className='absolute h-[40px] w-[40px] -translate-x-24 -translate-y-4'
              data={`${config.cdnURL}/assets/homepage/ribbon.svg`}
              type='image/svg+xml'
            >
              <Image
                alt='ribbon'
                className='absolute -translate-x-24 -translate-y-4'
                height={30}
                src={`${config.cdnURL}/assets/homepage/ribbon.svg`}
                width={30}
              />
            </object>

            {/* Ribbon Right */}
            <object
              className='absolute h-[40px] w-[40px] -translate-y-4 translate-x-24 rotate-[30deg]'
              data={`${config.cdnURL}/assets/homepage/ribbon.svg`}
              type='image/svg+xml'
            >
              <Image
                alt='ribbon'
                className='absolute -translate-y-4 translate-x-24 rotate-[30deg]'
                height={30}
                src={`${config.cdnURL}/assets/homepage/ribbon.svg`}
                width={30}
              />
            </object>

            {/* Left Text */}
            <div className='flex flex-col'>
              <p className='flex items-center gap-1 text-[8px] font-medium text-[#ED338C]'>
                Don&apos;t Miss!
                <Image
                  alt='star_pink'
                  height={10}
                  src={`${config.cdnURL}/assets/homepage/star_pink.svg`}
                  width={10}
                />
              </p>
              <p className='text-center text-[8px] font-medium text-[#ED338C]'>
                Come and find out,
              </p>
            </div>

            {/* Right Button */}
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
              <p className='text-[12px] font-medium text-[#ED338C]'>
                @chulaforall
              </p>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Part 3 */}
      <div className='flex h-[38px] w-full items-center justify-center gap-[14.55px] bg-[#1C1B1F]'>
        <Image
          alt='logo'
          height={22}
          src={`${config.cdnURL}/assets/homepage/isd_logo.svg`}
          width={40}
        />
        <Image
          alt='logo'
          height={25.39}
          src={`${config.cdnURL}/assets/homepage/orborjor_logo.svg`}
          width={25.39}
        />
      </div>
    </div>
  )
}

export default Footer
