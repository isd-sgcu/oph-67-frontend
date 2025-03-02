import { ImageIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { type Faculty } from '@/const/faculties'

interface FacultyCardProps {
  faculty: Faculty
}

const FacultyCard: React.FC<FacultyCardProps> = ({ faculty }) => {
  return (
    <Link href={`/faculties/${faculty.id}`}>
      <div className='card-pink-gradient flex h-[13rem] w-[10rem] flex-col items-start justify-between gap-1 rounded-md border border-dark-pink p-2 shadow-lg'>
        <div className='relative h-full w-full'>
          {faculty.thumbnail ? (
            <Image
              fill
              alt='faculty-logo'
              className='rounded-md border border-dark-pink'
              src={faculty.thumbnail}
            />
          ) : (
            <div className='flex h-full w-full items-center justify-center'>
              <ImageIcon opacity={0.5} size={48} />
            </div>
          )}
        </div>
        <div className='relative w-full text-nowrap'>
          <p className='w-full truncate'>{faculty.th}</p>
          <p className='truncate text-xs font-light'>{faculty.en}</p>
        </div>
      </div>
    </Link>
  )
}

export default FacultyCard
