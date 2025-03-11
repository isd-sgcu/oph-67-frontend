import { type Faculty } from '@/const/faculties'
import { workshops } from '@/const/workshops'
import { isWorkshopBookmarked } from '@/utils/local-storage'

import Notfound from '../ui/notfound'

import WorkshopCard from './workshop-card'

interface WorkshopListProps {
  faculty: Faculty
}

const WorkshopList: React.FC<WorkshopListProps> = ({ faculty }) => {
  const _workshops = workshops[faculty.id]
  if (!_workshops) return <Notfound text='workshop' />

  return (
    <div className='mt-2 flex w-full flex-col items-center justify-center gap-4'>
      {_workshops.map((workshop) => (
        <WorkshopCard
          key={workshop.id}
          isBookmarked={isWorkshopBookmarked(workshop.id)}
          workshop={workshop}
        />
      ))}
    </div>
  )
}

export default WorkshopList
