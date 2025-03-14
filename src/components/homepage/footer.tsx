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
      </div>

      {/* Footer Part 2 */}
      <div className='flex items-center justify-center bg-[linear-gradient(135deg,#EFA8C4_15%,#FFF2CC_50%,#F7A6CC_90%)] px-4 pb-4 pt-8'>
        {/* Left Part */}
        <div className='flex flex-col items-center justify-center'>
          {/* Logo */}
          <div className='relative mb-4 flex items-center justify-center'>
            <div className='absolute z-0 h-[120px] w-[100px] -translate-x-1 -translate-y-1 rounded-full bg-white blur-md' />
            <Image
              priority
              alt='logo'
              className='z-10'
              height={80}
              src={`${config.cdnURL}/assets/homepage/chula_for_all.svg`}
              width={80}
            />
          </div>
          {/* Header Text */}
          <div className='z-10 flex flex-col items-center justify-center'>
            <p className='text-center text-[8px] font-medium text-[#ED338C]'>
              YOUR JOURNEY TO
            </p>
            <p className='text-center text-[8px] font-medium text-[#ED338C]'>
              CHULA STARTS HERE!
            </p>
          </div>
        </div>

        {/* Right Part */}
        <div className='flex translate-x-8 flex-col items-center pt-14'>
          {/* Logo */}
          <div className='relative flex -translate-y-14'>
            {/* Star Left */}
            <Image
              alt='star_left'
              className='absolute -translate-x-6 -translate-y-4'
              height={20}
              src={`${config.cdnURL}/assets/homepage/star_yellow.svg`}
              width={20}
            />

            {/* Star Right */}
            <Image
              alt='star_right'
              className='absolute -translate-y-4 translate-x-20 rotate-[30deg]'
              height={20}
              src={`${config.cdnURL}/assets/homepage/star_yellow.svg`}
              width={20}
            />

            {/* Text */}
            <div className='z-10 -translate-y-3'>
              <Image
                alt='special_text'
                height={80}
                src={`${config.cdnURL}/assets/homepage/special_text.svg`}
                width={80}
              />
            </div>

            {/* Dice */}
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
          <div className='flex flex-col items-center justify-center pb-4'>
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
          <div className='relative flex w-full items-center justify-center gap-2 rounded-full border-2 border-white bg-white px-6 py-2 shadow-md'>
            {/* Ribbon Left */}
            <Image
              alt='ribbon'
              className='absolute -translate-x-24 -translate-y-4'
              height={30}
              src={`${config.cdnURL}/assets/homepage/ribbon.svg`}
              width={30}
            />

            {/* Ribbon Right */}
            <Image
              alt='ribbon'
              className='absolute -translate-y-5 translate-x-24 rotate-[30deg]'
              height={30}
              src={`${config.cdnURL}/assets/homepage/ribbon.svg`}
              width={30}
            />
            {/* Left Text */}
            <div>
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
