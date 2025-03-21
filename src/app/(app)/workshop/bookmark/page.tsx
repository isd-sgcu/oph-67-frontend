'use client'

import { useEffect, useState } from 'react'

import WorkshopCard from '@/components/workshop/workshop-card'
import { allWorkshops } from '@/const/workshops'
import {
  isWorkshopBookmarked,
  toggleWorkshopBookmark,
} from '@/utils/local-storage'

const WorkshopBookmark: React.FC = () => {
  const [bookmarkWorkshops, setBookmarkWorkshops] = useState<
    typeof allWorkshops
  >([])

  useEffect(() => {
    const _bookmarkWorkshops = allWorkshops.filter((workshop) =>
      isWorkshopBookmarked(workshop.id)
    )
    setBookmarkWorkshops(_bookmarkWorkshops)
  }, [])

  const _toggleWorkshopBookmark = (workshopId: string): void => {
    if (typeof window !== 'undefined') {
      setBookmarkWorkshops((currentWorkshops) => {
        const workshopExists = currentWorkshops.some(
          (workshop) => workshop.id === workshopId
        )
        if (!workshopExists) return currentWorkshops
        return currentWorkshops.filter((workshop) => workshop.id !== workshopId)
      })

      if (isWorkshopBookmarked(workshopId)) {
        toggleWorkshopBookmark(workshopId)
      }
    }
  }

  return (
    <div className='flex h-full w-full grow flex-col items-center gap-3 overflow-hidden py-8'>
      <div className='text-center'>
        <h1 className='text-2xl font-normal tracking-tight text-primary-green'>
          Workshop ที่สนใจ
        </h1>
        <p className='text-base font-light text-primary-green'>My Workshop</p>
      </div>
      <div className='my-2 w-5/6 border border-b-0 border-dark-pink' />
      {bookmarkWorkshops.length === 0 ? (
        <div className='text-center'>No workshop💨🍃</div>
      ) : (
        <div className='flex w-5/6 flex-col gap-4'>
          {bookmarkWorkshops.map((workshop) => (
            <WorkshopCard
              key={workshop.id}
              isBookmarked
              workshop={workshop}
              onToggleBookmark={_toggleWorkshopBookmark}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default WorkshopBookmark
