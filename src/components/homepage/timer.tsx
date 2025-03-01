'use client'

import { useEffect, useState } from 'react'

import { getTimer } from '@/utils/timer'

const Timer: React.FC = () => {
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

  if (!timeLeft)
    return (
      <div className='flex h-[175px] flex-col items-center justify-center gap-3 border border-[#F0ADBE] bg-[radial-gradient(circle,_white,_#F0ADBE)] p-3' />
    )

  return (
    <div className='flex h-[175px] flex-col items-center justify-center gap-3 border border-[#F0ADBE] bg-[radial-gradient(circle,_white,_#F0ADBE)] p-3'>
      {timeLeft.time_left === 0 ? (
        <p className='font-anuphan text-2xl font-semibold text-[#064E41]'>
          Live
        </p>
      ) : (
        <>
          <h2 className='text-3xl font-semibold text-[#064E41]'>
            {timeLeft.days} {timeLeft.days !== 1 ? 'DAYS' : 'DAY'}
          </h2>
          <div className='flex justify-center gap-4'>
            {/* Hours */}
            <div className='flex flex-col items-center justify-center gap-[5px]'>
              <div className='flex justify-center gap-[4px]'>
                <p className='border-text-2xl rounded-lg bg-white px-[6px] py-[3px] text-center text-2xl font-semibold text-[#064E41]'>
                  {Math.floor(timeLeft.hours / 10)}
                </p>
                <p className='border-text-2xl rounded-lg bg-white px-[6px] py-[3px] text-center text-2xl font-semibold text-[#064E41]'>
                  {timeLeft.hours % 10}
                </p>
              </div>
              <p className='text-center text-sm font-semibold text-[#064E41]'>
                hour
              </p>
            </div>

            {/* : */}
            <p className='text-center text-2xl font-semibold text-[#064E41]'>
              :
            </p>

            {/* Minutes */}
            <div className='flex flex-col items-center justify-center gap-[5px]'>
              <div className='flex justify-center gap-[4px]'>
                <p className='border-text-2xl rounded-lg bg-white px-[6px] py-[3px] text-center text-2xl font-semibold text-[#064E41]'>
                  {Math.floor(timeLeft.minutes / 10)}
                </p>
                <p className='border-text-2xl rounded-lg bg-white px-[6px] py-[3px] text-center text-2xl font-semibold text-[#064E41]'>
                  {timeLeft.minutes % 10}
                </p>
              </div>
              <p className='text-center text-sm font-semibold text-[#064E41]'>
                min
              </p>
            </div>

            {/* : */}
            <p className='text-center text-2xl font-semibold text-[#064E41]'>
              :
            </p>

            {/* Seconds */}
            <div className='flex flex-col items-center justify-center gap-[5px]'>
              <div className='flex justify-center gap-[4px]'>
                <p className='border-text-2xl rounded-lg bg-white px-[6px] py-[3px] text-center text-2xl font-semibold text-[#064E41]'>
                  {Math.floor(timeLeft.seconds / 10)}
                </p>
                <p className='border-text-2xl rounded-lg bg-white px-[6px] py-[3px] text-center text-2xl font-semibold text-[#064E41]'>
                  {timeLeft.seconds % 10}
                </p>
              </div>
              <p className='text-center text-sm font-semibold text-[#064E41]'>
                sec
              </p>
            </div>
          </div>
          <h3 className='text-base font-semibold text-[#064E41]'>
            Before D-Day
          </h3>
        </>
      )}
    </div>
  )
}

export default Timer
