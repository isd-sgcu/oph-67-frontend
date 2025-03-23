'use client'

import { Info } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import Bookmark from '@/components/svg/bookmark'
import { Button } from '@/components/ui/button'
import Notfound from '@/components/ui/notfound'
import { allWorkshops } from '@/const/workshops'

const WorkshopDetailPage: React.FC = () => {
  const params = useParams()
  const workshopId = params.workshopId as string

  const _workshop = allWorkshops.find((w) => w.id.toString() === workshopId)
  if (!_workshop) return <Notfound text='workshop' />

  return (
    <div className='flex h-full w-full grow flex-col items-center gap-5 px-4 py-5'>
      <Link className='mx-auto' href='/workshop/bookmark'>
        <Button className='gap-2 font-normal' size='sm' variant='outline'>
          <Bookmark />
          My Workshop
        </Button>
      </Link>
      <div className='h-full w-full rounded-lg bg-white px-5 py-4 text-primary-green'>
        <h1 className='mb-4 text-2xl font-normal tracking-tight'>
          {_workshop.name}
        </h1>
        <div>
          <h2 className='flex items-center gap-1 text-base font-normal'>
            <Info className='aspect-square h-5' /> รายละเอียดกิจกรรม
          </h2>
          <p className='text-sm font-extralight'>{_workshop.description}</p>
        </div>
        <div className='my-3 w-full border border-b-0 border-primary-green' />
        <div>
          <h2 className='flex items-center gap-1 text-base font-normal'>
            <Image
              alt='school'
              height={20}
              src='/assets/workshop/details/school.svg'
              width={20}
            />{' '}
            คณะ
          </h2>
          <p className='text-sm font-extralight'>{_workshop.faculty}</p>
        </div>
        <div className='my-3 w-full border border-b-0 border-primary-green' />
        <div>
          <h2 className='flex items-center gap-1 text-base font-normal'>
            <Image
              alt='shape'
              height={20}
              src='/assets/workshop/details/shape.svg'
              width={20}
            />
            ผู้จัดกิจกรรม
          </h2>
          <p className='text-sm font-extralight'>{_workshop.organizer}</p>
        </div>
        <div className='my-3 w-full border border-b-0 border-primary-green' />
        <div>
          <h2 className='flex items-center gap-1 text-base font-normal'>
            <Image
              alt='schedule'
              height={20}
              src='/assets/workshop/details/schedule.svg'
              width={20}
            />
            เวลา
          </h2>
          <p className='text-sm font-extralight'>{_workshop.time}</p>
        </div>
        <div className='my-3 w-full border border-b-0 border-primary-green' />
        <div>
          <h2 className='flex items-center gap-1 text-base font-normal'>
            <Image
              alt='location'
              height={20}
              src='/assets/workshop/details/location.svg'
              width={20}
            />{' '}
            สถานที่จัด
          </h2>
          <p className='text-sm font-extralight'>{_workshop.location}</p>
        </div>
        <div className='my-3 w-full border border-b-0 border-primary-green' />
        <div>
          <h2 className='flex items-center gap-1 text-base font-normal'>
            <Image
              alt='calendar-clock'
              height={20}
              src='/assets/workshop/details/calendar-clock.svg'
              width={20}
            />
            จำนวนรอบที่จัด
          </h2>
          <p className='text-sm font-extralight'>{_workshop.numberOfRounds}</p>
        </div>
        <div className='my-3 w-full border border-b-0 border-primary-green' />
        <div>
          <h2 className='flex items-center gap-1 text-base font-normal'>
            <Image
              alt='person'
              height={20}
              src='/assets/workshop/details/person.svg'
              width={20}
            />{' '}
            จำนวนผู้เข้าร่วมในแต่ละรอบ
          </h2>
          <p className='text-sm font-extralight'>
            {_workshop.participantsPerRound}
          </p>
        </div>
        <div className='my-3 w-full border border-b-0 border-primary-green' />
        <div className='flex w-full items-start gap-4'>
          <h2 className='flex items-center gap-1 text-base font-normal'>
            <Image
              alt='call'
              height={20}
              src='/assets/workshop/details/call.svg'
              width={20}
            />{' '}
            ช่องทางการติดต่อ
          </h2>
          <div className='w-1/2 truncate'>
            <p className='mb-2 flex items-center gap-1 text-sm font-extralight'>
              <Image
                alt='instagram'
                height={24}
                src='/assets/workshop/details/instagram.svg'
                width={24}
              />{' '}
              @{_workshop.instagram}
            </p>
            <p className='flex items-center gap-1 text-sm font-extralight'>
              <Image
                alt='facebook'
                height={24}
                src='/assets/workshop/details/facebook.svg'
                width={24}
              />{' '}
              {_workshop.facebook}
            </p>
          </div>
        </div>
        <Link href='https://www.instagram.com/chulaforall'>
          <Image
            alt='workshop-help-banner'
            className='mt-5 max-w-full'
            height={200}
            src='/assets/workshop/details/banner.png'
            width={600}
          />
        </Link>
      </div>
    </div>
  )
}

export default WorkshopDetailPage
