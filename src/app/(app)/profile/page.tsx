'use client'
import { EditSolid } from '@mynaui/icons-react'
import { IconFlowerFilled } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import QRCode from 'react-qr-code'

import { LiffError } from '@/components/liff/liff-error'
import { LiffLoading } from '@/components/liff/liff-loading'
import { useLiffContext } from '@/components/liff/liff-provider'
import InterestedItem from '@/components/profile/interested-item'
import { Button } from '@/components/ui/button'
import { faculties } from '@/const/faculties'

const Profile: React.FC = () => {
  const favFaculties = faculties.slice(0, 3)
  const { profile, isInit } = useLiffContext()
  const userName = profile?.displayName

  if (!isInit) {
    return <LiffLoading />
  }

  if (!profile) {
    return <LiffError error='Failed to load profile' />
  }

  return (
    <div className='flex h-full w-full grow flex-col items-center gap-3 py-8'>
      <div className='flex items-center'>
        <IconFlowerFilled className='text-dark-pink' />
        <h1 className='text-2xl font-normal tracking-tight text-primary-green'>
          Your Profile
        </h1>
      </div>
      <p className='text-base font-light text-primary-green'>{userName}</p>
      <Link href='/profile/edit'>
        <Button className='font-normal' size='sm' variant='outline'>
          <EditSolid />
          แก้ไขข้อมูล
        </Button>
      </Link>
      <div className='relative'>
        <Image
          alt='mascot'
          className='absolute bottom-[-15px] left-[-30px]'
          height={86}
          src='/assets/profile/girl_mascot.png'
          width={57}
        />
        <div className='flex flex-col items-center overflow-hidden rounded-lg border-2 border-dark-pink bg-white p-1'>
          <QRCode className='bg-white p-5' value={profile.userId} />
          <p className='font-light'>ID: {profile.userId}</p>
        </div>
      </div>
      <h2 className='mt-2 text-lg font-normal text-dark-pink'>
        คณะที่สนใจที่สุด / Faculties interested
      </h2>
      <div className='auto-number flex w-[20rem] flex-wrap justify-center gap-y-5'>
        {favFaculties.map((faculty) => (
          <InterestedItem key={faculty.en} faculty={faculty} />
        ))}
      </div>
      <div className='my-2 w-[20rem] border border-b-0 border-primary-green' />
      <Link href='/profile/certificate'>
        <Button className='w-[20rem] font-cloud-soft text-2xl font-bold'>
          <Image
            alt='cert'
            className='mb-1'
            height={24}
            src='/assets/icons/cert.svg'
            width={24}
          />
          รับเกียรติบัตร
        </Button>
      </Link>
    </div>
  )
}

export default Profile
