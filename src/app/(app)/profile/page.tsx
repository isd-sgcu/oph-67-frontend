'use client'

import { useRouter } from 'next/navigation'

import FaculInterestedItem from '@/components/profile/faculinteresteditem'
import { Button } from '@/components/ui/button'

const Profile: React.FC = () => {
  const router = useRouter()

  const handleGetCertificate = (): void => {
    router.push('/profile/certificate') // Explicitly ignore the Promise
  }

  return (
    <div className='font-mitr flex min-h-screen w-full flex-col items-center gap-3 bg-light-pink pt-8'>
      <h1 className='text-2xl font-normal text-primary-green'>Your Profile</h1>
      <p className='text-base font-light text-primary-green'>Name Lastname</p>
      <Button size="sm" variant="outline">
        แก้ไขข้อมูล
      </Button>
      <div className='aspect-square w-[18rem] bg-white' />
      <h2 className='text-lg font-normal text-dark-pink'>
        คณะที่สนใจที่สุด / Faculties interested
      </h2>
      <div className='auto-number flex w-[17rem] flex-wrap justify-center gap-x-9 gap-y-5'>
        <FaculInterestedItem />
        <FaculInterestedItem />
        <FaculInterestedItem />
      </div>
      <Button
        className='w-[20rem] font-cloud-soft text-2xl font-bold'
        onClick={handleGetCertificate}
      >
        รับเกียรติบัตร
      </Button>
    </div>
  )
}

export default Profile
