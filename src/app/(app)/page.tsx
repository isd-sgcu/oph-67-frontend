'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import Actionbutton from '@/components/homepage/actionbutton'
import Faq from '@/components/homepage/faq'
import Footer from '@/components/homepage/footer'
import Imageslider from '@/components/homepage/imageslider'
import Navbar from '@/components/homepage/navbar'
import Timer from '@/components/homepage/timer'
import { Button } from '@/components/ui/button'
import {
  actionButtonsNotRegistered,
  // actionButtonsRegistered,
} from '@/const/actionbutton'
import { getTimer } from '@/utils/timer'

const Home: React.FC = () => {
  // const isRegistered = true
  const [currentTimeLeft, setCurrentTimeLeft] = useState<number | null>(null)

  useEffect(() => {
    setCurrentTimeLeft(getTimer().time_left)
  }, [])

  // const actionButtonsDetail = isRegistered
  //   ? actionButtonsRegistered
  //   : actionButtonsNotRegistered

  const actionButtonsDetail = actionButtonsNotRegistered

  return (
    <div className='flex flex-col justify-center bg-[#FCF3F8]'>
      <Navbar />
      <Imageslider />
      <Timer />
      <div className='flex flex-col items-center justify-center gap-4 p-[20px]'>
        {/* Register Button */}
        {/* {!isRegistered && ( */}
        <Button
            className='px-11 py-4 shadow-xl'
            disabled={currentTimeLeft !== 0}
          >
            <Link href='/register'>
              <p className='font-cloud-soft text-2xl text-white'>
                ลงทะเบียนเลย!
              </p>
            </Link>
          </Button>
          {currentTimeLeft !== 0 && (
            <p className='font-mitr text-[15px] font-normal text-[#064E41]'>
              พร้อมลงทะเบียนวันที่ 14 มีนาคมนี้
            </p>
          )}
        {/* )} */}

        <div className='grid w-full grid-cols-2 gap-2'>
          {actionButtonsDetail.map((item) => (
            <Actionbutton key={item.title} title={item.title} url={item.url} />
          ))}
        </div>
        <Faq />
      </div>
      <Footer />
    </div>
  )
}

export default Home
