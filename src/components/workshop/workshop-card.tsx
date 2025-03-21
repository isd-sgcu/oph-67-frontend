'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { type Workshop } from '@/const/workshops'
import { toggleWorkshopBookmark } from '@/utils/local-storage'

interface WorkshopCardProps {
  workshop: Workshop
  isBookmarked: boolean
  onToggleBookmark?: (workshopId: string) => void
}

const WorkshopCard: React.FC<WorkshopCardProps> = ({
  workshop,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [isSet, setIsSet] = useState(isBookmarked)

  return (
    <div className='flex h-auto w-full justify-between rounded-lg border border-[#FBDAED] bg-white p-3 font-mitr shadow-[0_2px_8px_0_rgba(0,0,0,0.1)]'>
      <div className='flex h-full w-80 flex-col gap-2'>
        <div className='text-base font-normal leading-5 tracking-tight'>
          <p className='whitespace-normal'>{workshop.name}</p>
          <p>{workshop.faculty}</p>
        </div>
        <div className='flex flex-col gap-1'>
          <div className='flex items-start gap-1 text-xs font-light tracking-tight'>
            <Image
              alt='major icon'
              className='mt-0.5'
              height={12}
              src='/assets/workshop/school.svg'
              width={12}
            />
            <p>
              <strong>เอก/สาขา :</strong> {workshop.organizer}
            </p>
          </div>
          <div className='flex items-start gap-1 text-xs font-light tracking-tight'>
            <Image
              alt='location icon'
              className='mt-0.5'
              height={12}
              src='/assets/workshop/location.svg'
              width={12}
            />
            <p>
              <strong>สถานที่จัด :</strong> {workshop.location}
            </p>
          </div>
          <div className='flex items-start gap-1 text-xs font-light tracking-tight'>
            <Image
              alt='schedule icon'
              className='mt-0.5'
              height={12}
              src='/assets/workshop/schedule.svg'
              width={12}
            />
            <p>
              <strong>เวลา :</strong> {workshop.time}
            </p>
          </div>
        </div>
        <Link href={`/workshop/${workshop.id}`}>
          <div className='flex h-6 w-40 items-center justify-center rounded bg-[#EA88BD] px-2 py-0.5 font-mitr text-xs font-light text-white'>
            ดูรายละเอียดเพิ่มเติม
          </div>
        </Link>
      </div>
      <button
        className='flex items-start'
        type='button'
        onClick={() => {
          toggleWorkshopBookmark(workshop.id)
          setIsSet(!isSet)
          if (onToggleBookmark) {
            onToggleBookmark(workshop.id)
          }
        }}
      >
        {isSet ? (
          <Image
            alt='heart'
            height={18}
            src='/assets/workshop/heartful.svg'
            width={20}
          />
        ) : (
          <Image
            alt='heart'
            height={18}
            src='/assets/workshop/heartless.svg'
            width={20}
          />
        )}
      </button>
    </div>
  )
}

export default WorkshopCard
