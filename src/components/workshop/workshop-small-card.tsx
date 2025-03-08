import { ImageIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

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
            src='/assets/icons/trash.svg'
            width={20}
          />
        ) : null}
      </Button>
      <Link href={workshop.registerUrl}>
        <div className='workshop-small-card-gradient relative flex h-[13rem] w-[10rem] flex-col items-start justify-between gap-1 rounded-md border border-dark-pink p-2 shadow-lg'>
          <div className='relative h-full w-full'>
            {workshop.thumbnail ? (
              <Image
                fill
                alt='faculty-logo'
                className='rounded-md border border-dark-pink object-cover'
                src={workshop.thumbnail}
              />
            ) : (
              <div className='flex h-full w-full items-center justify-center'>
                <ImageIcon opacity={0.5} size={48} />
              </div>
            )}
          </div>
          <div className='relative w-full text-nowrap'>
            <p className='w-full truncate'>{workshop.name}</p>
            <p className='truncate text-xs font-light'>{workshop.faculty}</p>
            <p className='truncate text-xs font-light'>
              {workshop.description}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default WorkshopSmallCard
