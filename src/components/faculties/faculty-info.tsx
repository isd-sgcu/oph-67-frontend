import Image from 'next/image'

import { type Faculty } from '@/const/faculties'

import { Button } from '../ui/button'

import ImageCarousel from './image-carousel'

interface FacultyInfoProps {
  faculty: Faculty
  setStep: (step: number) => void
}

const FacultyInfo: React.FC<FacultyInfoProps> = ({ faculty, setStep }) => {
  return (
    <>
      <Button
        className='w-[18rem] bg-dark-pink font-mitr text-lg font-light shadow-lg'
        size='lg'
        onClick={() => setStep(2)}
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
    </>
  )
}

export default FacultyInfo
