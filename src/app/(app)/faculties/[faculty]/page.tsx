import Image from 'next/image'

import ImageCarousel from '@/components/faculties/image-carousel'
import { Button } from '@/components/ui/button'
import { faculties } from '@/const/faculties'

interface FacultyPageProps {
  params: {
    faculty: string
  }
}

const FacultyPage: React.FC<FacultyPageProps> = ({ params }) => {
  const faculty = faculties.find((f) => f.id === params.faculty)
  if (!faculty) return <div>Faculty not found</div>

  return (
    <div className='flex h-full w-full grow flex-col items-center gap-3 overflow-hidden py-8'>
      <div className='text-center'>
        <h1 className='text-2xl font-normal tracking-tight text-primary-green'>
          {faculty.th}
        </h1>
        <p className='text-base font-light text-primary-green'>{faculty.en}</p>
      </div>
      <div className='my-2 w-5/6 border border-b-0 border-dark-pink' />
      <Button
        className='w-[18rem] bg-dark-pink font-mitr text-lg font-light shadow-lg'
        size='lg'
      >
        ดู Workshop ทั้งหมด
      </Button>
      {faculty.images ? <ImageCarousel images={faculty.images} /> : null}
      {faculty.about ? (
        <>
          <div className='w-5/6 text-primary-green'>
            <div className='flex'>
              <Image
                alt='info icon'
                className='mr-2'
                height={20}
                src='/assets/icons/info.svg'
                width={20}
              />
              <h2>เกี่ยวกับคณะ</h2>
            </div>
            <p className='mt-2 text-sm font-extralight'>{faculty.about}</p>
          </div>
          <div className='my-2 w-5/6 border border-b-0 border-primary-green' />
        </>
      ) : null}
      {faculty.location ? (
        <>
          <div className='w-5/6 text-primary-green'>
            <div className='flex w-full items-center'>
              <Image
                alt='location icon'
                className='mr-2'
                height={20}
                src='/assets/icons/location.svg'
                width={20}
              />
              <h2>สถานที่</h2>
              <Button
                className='ms-auto h-7 text-xs font-light'
                size='sm'
                variant='outline'
              >
                google maps
              </Button>
            </div>
            <p className='mt-2 justify-end self-end text-sm font-extralight'>
              {faculty.location}
            </p>
          </div>
          <div className='my-2 w-5/6 border border-b-0 border-primary-green' />
        </>
      ) : null}
      {(faculty.webUrl ?? faculty.fbUrl) ? (
        <div className='flex w-5/6 flex-col gap-4 text-primary-green'>
          <div className='flex'>
            <Image
              alt='call icon'
              className='mr-3'
              height={20}
              src='/assets/icons/call.svg'
              width={20}
            />
            <h2 className='font-light'>ช่องทางการติดต่อ</h2>
          </div>
          {faculty.webUrl ? (
            <div className='ms-10 w-5/6 text-primary-green'>
              <div className='flex'>
                <Image
                  alt='captive-portal icon'
                  className='mr-3'
                  height={20}
                  src='/assets/icons/captive-portal.svg'
                  width={20}
                />
                <p className='font-extralight'>{faculty.webUrl}</p>
              </div>
            </div>
          ) : null}
          {faculty.fbUrl ? (
            <div className='ms-10 w-5/6 text-primary-green'>
              <div className='flex'>
                <Image
                  alt='facebook icon'
                  className='mr-3'
                  height={20}
                  src='/assets/icons/facebook.svg'
                  width={20}
                />
                <p className='font-extralight'>{faculty.fbUrl}</p>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export default FacultyPage
