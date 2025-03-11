'use client'

import { Bookmark, ImageIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { config } from '@/app/config'
import { type Workshop } from '@/const/workshops'
import { toggleWorkshopBookmark } from '@/utils/local-storage'

import { Button } from '../ui/button'

interface WorkshopCardProps {
  workshop: Workshop
  isBookmarked: boolean
}

const WorkshopCard: React.FC<WorkshopCardProps> = ({
  workshop,
  isBookmarked,
}) => {
  const [isSet, setIsSet] = useState(isBookmarked)

  return (
    <div className='workshop-card-shadow h-[13.5rem] w-[20rem] min-w-[80%] max-w-[90%] rounded-md'>
      <div className='workshop-card-gradient workshop-card-inset flex h-full w-full flex-col items-start justify-between gap-1 rounded-md p-2'>
        <p>{workshop.major}</p>
        <div className='flex h-full min-h-0 w-full gap-3'>
          <div className='relative h-full w-[45%] shrink-0'>
            {workshop.thumbnail ? (
              <Image
                fill
                alt='workshop-logo'
                className='rounded-md border object-cover'
                src={workshop.thumbnail}
              />
            ) : (
              <div className='flex h-full w-full items-center justify-center'>
                <ImageIcon opacity={0.5} size={48} />
              </div>
            )}
          </div>
          <div className='flex h-full w-full flex-col justify-between'>
            <div className='no-scrollbar h-1/2 max-w-full overflow-y-scroll'>
              <h2 className='text-base font-normal'>{workshop.name}</h2>
              <p className='text-wrap text-xs font-extralight'>
                {workshop.description}
              </p>
            </div>
            <div>
              <Link href={workshop.registerUrl}>
                <Button
                  className='mt-3 w-full bg-dark-pink font-mitr text-xs font-normal shadow-lg'
                  size='sm'
                >
                  <Image
                    alt='link icon'
                    height={16}
                    src={`${config.cdnURL}/assets/icons/link.svg`}
                    width={16}
                  />
                  ลงทะเบียนเข้าร่วม
                </Button>
              </Link>
              <Button
                className='mt-[4px] w-full bg-white font-mitr text-xs font-normal shadow-lg'
                size='sm'
                style={{
                  color: isSet ? '#FFD700' : 'inherit',
                }}
                onClick={() => {
                  toggleWorkshopBookmark(workshop.id)
                  setIsSet(!isSet)
                }}
              >
                <Bookmark />
                สนใจเข้าร่วม
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkshopCard
