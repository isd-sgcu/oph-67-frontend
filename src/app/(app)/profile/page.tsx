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
  const [isEntered, setIsEntered] = useState<boolean>(false)
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
        if (profileInfo?.lastEntered) {
          setIsEntered(true)
        }
      } catch (error) {
        console.error('Failed to fetch user data', error)
      }
    }

    if (profile) {
      void fetchData()
    }
  }, [profile, profileInfo?.lastEntered]) // Ensure effect runs only when profile is available

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
      {isEntered ? (
        <div className='mb-8 mt-2 flex flex-col items-center justify-center gap-2 px-4'>
          <div className='flex items-center justify-center gap-2 rounded-lg bg-[#346D08] px-3 py-1.5 text-white drop-shadow-xl'>
            <Image
              alt='certificate icon'
              className=''
              height={24}
              src={`${config.cdnURL}/assets/icons/cert.svg`}
              width={24}
            />
            <p>คุณมีสิทธิ์ได้รับเกียรติบัตร</p>
          </div>
          <div className='my-2 w-[20rem] border border-b-0 border-primary-green' />
          <div className='flex flex-col gap-2 text-lg font-normal leading-5 text-[#DD579B]'>
            <p className='mb-2 text-center underline'>
              ขั้นตอนการรับเกียรติบัตร
            </p>
            <p>1. แคปหน้าจอนี้ให้เห็น QR Code และกรอบข้อความสีแดงชัดเจน</p>
            <p>2. กรอกแบบประเมินและขอรับเกียรติบัตรได้ที่:</p>
            <div className='flex justify-center'>
              <Link
                className='flex w-[140px] items-center justify-center gap-1.5 rounded-lg bg-[#6D3E08] px-2 py-0.5 text-base text-white drop-shadow-xl'
                href='https://forms.gle/SgPQX9BcPFgMpvAw8'
              >
                <Image
                  alt='link icon'
                  className=''
                  height={16}
                  src={`${config.cdnURL}/assets/pick-your-flower/link.svg`}
                  width={16}
                />
                <p> Google form</p>
              </Link>
            </div>
            <p>
              3. สามารถประเมินเพื่อรับเกียรติบัตรได้ ภายในวันที่ 30 เมษายน 2568
              เท่านั้น
            </p>
            <p>4. คุณจะได้รับเกียรติบัตรผ่านอีเมล หลังจากประเมิน 1-2 วัน</p>
          </div>
        </div>
      ) : (
        <div className='mb-8 mt-2 flex flex-col items-center justify-center gap-2 px-4'>
          <div className='flex items-center justify-center gap-2 rounded-lg bg-[#FF4242] px-3 py-1.5 text-white drop-shadow-xl'>
            <Image
              alt='certificate icon'
              className=''
              height={24}
              src={`${config.cdnURL}/assets/icons/cert.svg`}
              width={24}
            />
            <p>คุณจะได้รับเกียรติบัตร หากปฏิบัติตามเงื่อนไข</p>
          </div>
          <div className='my-2 w-[20rem] border border-b-0 border-primary-green' />
          <div className='flex flex-col gap-2 text-lg font-normal leading-5 text-[#DD579B]'>
            <p className='mb-2 text-center underline'>คำชี้แจง</p>
            <p>
              • หากคุณมาเข้าร่วมงาน แต่ไม่ได้รับการแสกนโดย staff ของ cu open
              house คุณต้อง “กรอกฟอร์มยืนยัน” การเข้าร่วมงาน ซึ่งปิดรับในวันที่
              8 เมษายน 2568
            </p>
            <p>• หากกรอกฟอร์มแล้ว จะได้รับเกียรติบัตรผ่านอีเมล</p>
            <p>• หากไม่ได้กรอกฟอร์ม จะไม่ได้รับเกียรติบัตร</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
