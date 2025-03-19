// import { ImageIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { config } from '@/app/config'
import { type Workshop } from '@/const/workshops'

import { Button } from '../ui/button'

interface WorkshopSmallCardProps {
  workshop: Workshop
  toggleBookmark?: (workshopId: string) => void
  reset?: () => void
}

const WorkshopSmallCard: React.FC<WorkshopSmallCardProps> = ({
  workshop,
  toggleBookmark,
}) => {
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    toggleBookmark && toggleBookmark(workshop.id)
  }

  return (
    <div className='relative'>
      <Button
        className='absolute right-2 top-1 z-10 cursor-pointer bg-transparent'
        onClick={handleDelete}
      >
        {toggleBookmark ? (
          <Image
            alt='trash'
            className='absolute'
            height={20}
            src={`${config.cdnURL}/assets/icons/trash.svg`}
            width={20}
          />
        ) : null}
      </Button>
      <div className='flex h-auto w-[330px] justify-between rounded-lg border border-[#FBDAED] bg-white p-3 font-mitr shadow-[0_2px_8px_0_rgba(0,0,0,0.1)]'>
        <div className='flex h-full w-auto flex-col gap-2'>
          <div className='text-base font-normal leading-5 tracking-tight'>
            <p className='truncate'>{workshop.name}</p>
            <p>{workshop.faculty}</p>
          </div>
          <div className='flex flex-col gap-1'>
            <div className='flex items-start gap-1 text-xs font-light tracking-tight'>
              <Image
                alt='major'
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
                alt='major'
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
                alt='major'
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
          <Link href=''>
            <div className='flex h-6 w-40 items-center justify-center rounded bg-[#EA88BD] px-2 py-0.5 font-mitr text-xs font-light text-white'>
              ดูรายละเอียดเพิ่มเติม
            </div>
          </Link>
        </div>
        <div>
          <Image
            alt='heart'
            height={18}
            src='/assets/workshop/heartless.svg'
            width={20}
          />
        </div>
      </div>
    </div>
  )
}

export default WorkshopSmallCard
