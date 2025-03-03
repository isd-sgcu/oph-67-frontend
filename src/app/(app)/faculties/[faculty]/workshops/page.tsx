import WorkshopCard from '@/components/workshop/workshop-card'
import { faculties } from '@/const/faculties'
import { workshops } from '@/const/workshops'

interface WorkshopsPageProps {
  params: {
    faculty: string
  }
}

const WorkshopsPage: React.FC<WorkshopsPageProps> = ({ params }) => {
  const faculty = faculties.find((f) => f.id.toString() === params.faculty)
  if (!faculty) return <div>Faculty not found</div>

  const _workshops = workshops[faculty.id]
  if (!_workshops) return <div>Workshop not found</div>

  return (
    <div className='flex h-full w-full grow flex-col items-center gap-3 overflow-hidden py-8'>
      <div className='text-center'>
        <h1 className='text-2xl font-normal tracking-tight text-primary-green'>
          {faculty.th}
        </h1>
        <p className='text-base font-light text-primary-green'>{faculty.en}</p>
      </div>
      <div className='w-5/6 border border-b-0 border-dark-pink' />
      <div className='mt-2 flex w-full flex-col items-center justify-center gap-4'>
        {_workshops.map((workshop) => (
          <WorkshopCard key={workshop.name} workshop={workshop} />
        ))}
      </div>
    </div>
  )
}

export default WorkshopsPage
