'use client'

import { useState } from 'react'

import WorkshopSmallCard from '@/components/workshop/workshop-small-card'
import { allWorkshops } from '@/const/workshops'
import {
  isWorkshopBookmarked,
  toggleWorkshopBookmark,
} from '@/utils/local-storage'

const WorkshopBookmark: React.FC = () => {
  const _bookmarkWorkshops = allWorkshops.filter((workshop) =>
    isWorkshopBookmarked(workshop.id)
  )

  const [bookmarkWorkshops, setBookmarkWorkshops] = useState(_bookmarkWorkshops)

  const _toggleWorkshopBookmark = (workshopId: string): void => {
    toggleWorkshopBookmark(workshopId)
    setBookmarkWorkshops(
      bookmarkWorkshops.filter((workshop) => workshop.id !== workshopId)
    )
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
        <div className='grid grid-cols-2 gap-6'>
          {bookmarkWorkshops.map((workshop) => (
            <WorkshopSmallCard
              key={workshop.id}
              toggleBookmark={_toggleWorkshopBookmark}
              workshop={workshop}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default WorkshopBookmark
