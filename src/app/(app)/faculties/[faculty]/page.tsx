'use client'

import { useParams } from 'next/navigation'
import { type ReactNode, useEffect, useState } from 'react'

import FacultyInfo from '@/components/faculties/faculty-info'
import Notfound from '@/components/ui/notfound'
import WorkshopList from '@/components/workshop/workshop-list'
import { faculties } from '@/const/faculties'

interface FacultyPageProps {
  params: {
    faculty: string
  }
}

const FacultyPage: React.FC<FacultyPageProps> = () => {
  const { faculty } = useParams()
  const [step, setStep] = useState(1)

  const goToNextStep = (newStep: number): void => {
    history.pushState({ step: newStep }, '', '') // Add state to history
    setStep(newStep)
  }

  // intercept browser navigation (back/forward) to change step
  useEffect(() => {
    const handlePopState = (e: PopStateEvent): void => {
      if (step === 1) return
      e.preventDefault()
      setStep(1)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [step])

  const _faculty = faculties.find((f) => f.id.toString() === faculty)
  if (!_faculty) return <Notfound text='faculty' />

  const getPage = (): ReactNode => {
    switch (step) {
      case 1:
        return <FacultyInfo faculty={_faculty} setStep={goToNextStep} />
      case 2:
        return <WorkshopList faculty={_faculty} />

      default:
        return <Notfound />
    }
  }

  return (
    <div className='flex h-full w-full grow flex-col items-center gap-3 overflow-hidden py-8'>
      <div className='text-center'>
        <h1 className='text-2xl font-normal tracking-tight text-primary-green'>
          {_faculty.th}
        </h1>
        <p className='text-base font-light text-primary-green'>{_faculty.en}</p>
      </div>
      <div className='my-2 w-5/6 border border-b-0 border-dark-pink' />
      {getPage()}
    </div>
  )
}

export default FacultyPage
