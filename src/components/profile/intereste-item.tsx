import { type Faculty } from '@/const/faculties'

interface InteresteItemProps {
  faculty: Faculty
}

const InteresteItem: React.FC<InteresteItemProps> = ({ faculty }) => {
  return (
    <div className='relative w-1/2 text-nowrap text-base font-light text-primary-green'>
      <p>{faculty.th}</p>
      <p className='text-xs'>{faculty.en}</p>
    </div>
  )
}

export default InteresteItem
