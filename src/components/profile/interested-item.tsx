import { type Faculty } from '@/const/faculties'

interface InterestedItemProps {
  faculty: Faculty
}

const InterestedItem: React.FC<InterestedItemProps> = ({ faculty }) => {
  return (
    <div className='flex w-1/2 flex-col items-center text-nowrap text-base font-light text-primary-green'>
      <p>{faculty.th}</p>
      <p className='text-xs'>{faculty.en}</p>
    </div>
  )
}

export default InterestedItem
