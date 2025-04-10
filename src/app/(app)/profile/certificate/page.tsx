'use client'

import { useEffect, useState } from 'react'

import { getCertToken } from '@/app/actions/get-cert-token/get-cert-token'
import { getUser } from '@/app/actions/get-profile/get-user'
import { useAuth } from '@/components/auth/auth-provider'
import { LiffLoading } from '@/components/liff/liff-loading'
import CertificateGenerator from '@/components/profile/certificate-generator'

const Certificate: React.FC = () => {
  const [userName, setUserName] = useState<string>('')
  const [certToken, setCertToken] = useState<string>('')
  const { userId, accessToken, isLoading } = useAuth()
  const [isFetched, setIsFetched] = useState(false)

  useEffect(() => {
    async function fetchData(): Promise<void> {
      try {
        console.log(userId, accessToken)
        if (!userId || !accessToken) {
          throw new Error('User ID or access token is not available')
        }

        const data = await getUser(userId, accessToken)
        console.log('User data:', data)
        if (!data.name) {
          throw new Error('User name is not available')
        }
        setUserName(data.name)
        const res = await getCertToken(userId, accessToken)
        setCertToken(res.certToken)
        setIsFetched(true)
      } catch (error) {
        console.error('Failed to fetch user data', error)
      }
    }
    if (userId && accessToken) {
      void fetchData()
    }
  }, [userId, accessToken]) // Ensure effect runs only when userId is available

  if (isLoading) {
    return <LiffLoading />
  }

  return (
    <div className='flex h-full w-full grow flex-col items-center gap-3 bg-light-pink pt-8 font-mitr'>
      {isFetched ? (
        <CertificateGenerator token={certToken} userName={userName} />
      ) : (
        <>Loading...</>
      )}
    </div>
  )
}

export default Certificate
