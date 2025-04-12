'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'

import { CheckEvaluation } from '@/app/actions/evaluation/get-evaluation'
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
  const [isEvaluated, setIsEvaluated] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkEvaluation = async (): Promise<void> => {
      try {
        if (!userId || !accessToken) {
          throw new Error('User ID or access token is not available')
        }
        const res = await CheckEvaluation(userId)
        if (res.eval === null) {
          setIsEvaluated(false)
          toast.error('โปรดทำแบบประเมินก่อนทำรายการ')
          return
        }
        void fetchData()
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message)
        } else {
          toast.error('An unexpected error occurred')
        }
        console.error('Failed to fetch user data', error)
      }
    }

    const fetchData = async (): Promise<void> => {
      try {
        if (!userId || !accessToken) {
          throw new Error('User ID or access token is not available')
        }

        const data = await getUser(userId, accessToken)
        if (!data.name) {
          toast.error("Failed to fetch user's name")
          return
        }
        setUserName(data.name)
        const res = await getCertToken(userId, accessToken)
        setCertToken(res.certToken)
        setIsFetched(true)
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message)
        } else {
          toast.error('An unexpected error occurred')
        }
        console.error('Failed to fetch user data', error)
      }
    }
    if (userId && accessToken) {
      void checkEvaluation()
    }
  }, [userId, accessToken]) // Ensure effect runs only when userId is available

  if (isLoading) {
    return <LiffLoading />
  }
  if (!isEvaluated) {
    // redirect to home if not evaluated
    router.push('/')
  }

  return (
    <div className='flex h-full w-full grow flex-col items-center gap-3 bg-light-pink pt-8 font-mitr'>
      <Toaster position='top-center' />
      {isFetched ? (
        <CertificateGenerator token={certToken} userName={userName} />
      ) : (
        <>Loading...</>
      )}
    </div>
  )
}

export default Certificate
