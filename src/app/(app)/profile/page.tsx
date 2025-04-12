'use client'
import { EditSolid } from '@mynaui/icons-react'
import { IconFlowerFilled } from '@tabler/icons-react'
import { Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import QRCode from 'react-qr-code'

import { getAuthToken } from '@/app/actions/auth'
import { getUser } from '@/app/actions/get-profile/get-user'
import { config } from '@/app/config'
import { LiffError } from '@/components/liff/liff-error'
import { LiffLoading } from '@/components/liff/liff-loading'
import { useLiffContext } from '@/components/liff/liff-provider'
import { Button } from '@/components/ui/button'
import { type UserData } from '@/types/user-data'

const Profile: React.FC = () => {
  const [profileInfo, setProfileInfo] = useState<UserData | null>(null)
  const { profile, isInit } = useLiffContext()

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const token = await getAuthToken()
        if (!token) {
          throw new Error('Not authenticated')
        }
        if (!profile) {
          throw new Error('Profile is not available')
        }
        const data = await getUser(profile.userId, token)
        setProfileInfo(data)
      } catch (error) {
        console.error('Failed to fetch user data', error)
      }
    }

    if (profile) {
      void fetchData()
    }
  }, [profile]) // Ensure effect runs only when profile is available

  if (!isInit) {
    return <LiffLoading />
  }

  if (!profile) {
    return <LiffError error='Failed to load profile' />
  }
  const { displayName } = profile

  return (
    <div className='relative flex h-full w-full grow flex-col items-center gap-3 py-8'>
      <Link className='-my-2 -mt-4 ml-auto mr-2' href='/workshop/bookmark'>
        <Button
          className='gap-2 border-none font-normal'
          size='sm'
          variant='outline'
        >
          <Heart />
          My Workshop
        </Button>
      </Link>
      <div className='flex items-center'>
        <IconFlowerFilled className='text-dark-pink' />
        <h1 className='text-2xl font-normal tracking-tight text-primary-green'>
          Your Profile
        </h1>
      </div>
      <p className='text-base font-light text-primary-green'>
        {profileInfo?.name ?? displayName}
      </p>
      <Link href='/profile/edit'>
        <Button className='font-normal' size='sm' variant='outline'>
          <EditSolid />
          แก้ไขข้อมูล
        </Button>
      </Link>
      <div className='relative'>
        <div className='flex flex-col items-center overflow-hidden rounded-lg border-2 border-dark-pink bg-white p-1'>
          <QRCode className='bg-white p-5' value={profile.userId} />
          <p className='font-light'>ID: {profile.userId.substring(0, 6)}</p>
        </div>
      </div>
      <div className='my-2 w-[20rem] border border-b-0 border-primary-green' />
      <Link href='/profile/certificate'>
        <Button className='w-[20rem] font-cloud-soft text-2xl font-bold'>
          <Image
            alt='cert'
            className='mb-1'
            height={24}
            src={`${config.cdnURL}/assets/icons/cert.svg`}
            width={24}
          />
          รับเกียรติบัตร
        </Button>
      </Link>
    </div>
  )
}

export default Profile
