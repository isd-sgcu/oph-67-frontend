import Link from 'next/link'

import { type Faculty } from '@/const/faculties'
import { workshops } from '@/const/workshops'
import { isWorkshopBookmarked } from '@/utils/local-storage'

import { Button } from '../ui/button'
import Notfound from '../ui/notfound'

import WorkshopCard from './workshop-card'

interface WorkshopListProps {
  faculty: Faculty
}

const WorkshopList: React.FC<WorkshopListProps> = ({ faculty }) => {
  const _workshops = workshops[faculty.id]
  if (!_workshops) return <Notfound text='workshop' />

  return (
    <>
      <Link href={faculty.contact}>
        <Button
          className='w-[18rem] bg-dark-pink font-mitr text-lg font-light shadow-[0_4px_4px_rgba(0,0,0,0.2)]'
          size='lg'
        >
          ช่องทางติดต่อกับคณะ
        </Button>
      </Link>
      <div className='mt-2 flex w-5/6 flex-col items-center justify-center gap-4'>
        {_workshops.map((workshop) => (
          <WorkshopCard
            key={workshop.id}
            isBookmarked={isWorkshopBookmarked(workshop.id)}
            workshop={workshop}
          />
        ))}
      </div>
    </>
  )
}

export default WorkshopList
