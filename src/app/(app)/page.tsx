'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import Actionbutton from '@/components/homepage/actionbutton'
import ContentSlider from '@/components/homepage/contentslider'
import Faq from '@/components/homepage/faq'
import Footer from '@/components/homepage/footer'
import Navbar from '@/components/homepage/navbar'
import Popup from '@/components/homepage/popup'
import Timer from '@/components/homepage/timer'
import { Button } from '@/components/ui/button'
import {
  actionButtonsNotRegistered,
  actionButtonsRegistered,
} from '@/const/actionbutton'
import { useAuth } from '@/hooks/use-auth'
import { getTimer } from '@/utils/timer'

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth()
  const isRegistered = isAuthenticated
  const openRegisteredDate = new Date('2025-03-14T00:00:00').getTime()
  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof getTimer> | null>(
    null
  )

  useEffect(() => {
    setTimeLeft(getTimer())
    const interval = setInterval(() => {
      setTimeLeft(getTimer())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const actionButtonsDetail = isRegistered
    ? actionButtonsRegistered
    : actionButtonsNotRegistered

  return (
    <div className='flex flex-col justify-center bg-[#FCF3F8]'>
      <Popup />
      <Navbar />
      <ContentSlider />
      <Timer />
      <div className='flex flex-col items-center justify-center gap-4 p-[20px]'>
        {/* Register Button */}
        {!isRegistered && (
          <>
            <Button className='px-11 py-4 shadow-xl'>
              <Link href='/register'>
                <p className='font-cloud-soft text-2xl text-white'>
                  ลงทะเบียนเลย!
                </p>
              </Link>
            </Button>
            {timeLeft && timeLeft.nowDate < openRegisteredDate ? (
              <p className='font-mitr text-[15px] font-normal text-[#064E41]'>
                พร้อมลงทะเบียนวันที่ 14 มีนาคมนี้
              </p>
            ) : null}
          </>
        )}
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
