'use client'

import { Heart } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import SearchBar from '@/components/faculties/searchbar'
import { Button } from '@/components/ui/button'
import WorkshopCard from '@/components/workshop/workshop-card'
import { allWorkshops } from '@/const/workshops'
import { isWorkshopBookmarked } from '@/utils/local-storage'

const WorkshopPage: React.FC = () => {
  const [search, setSearch] = useState('')
  const [filteredWorkshops, setFilteredWorkshops] = useState(allWorkshops)
  useEffect(() => {
    setFilteredWorkshops(
      allWorkshops.filter(
        (workshop) =>
          workshop.name.toLowerCase().includes(search.toLowerCase()) ||
        (workshop.faculty ?? '')
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      workshop.facultyId.toLowerCase().includes(search.toLowerCase()) ||
      workshop.description.toLowerCase().includes(search.toLowerCase())
      )
    )
  }, [search])

  return (
    <div className='flex h-full w-full grow flex-col items-center gap-3 overflow-hidden pb-20 pt-5'>
      <Link className='' href='/workshop/bookmark'>
        <Button
          className='gap-2 border font-normal'
          size='sm'
          variant='outline'
        >
          <Heart />
          My Workshop
        </Button>
      </Link>
      <h1 className='text-2xl font-normal tracking-tight text-primary-green'>
        ค้นหา Workshop
      </h1>
      <div className='mt-2 w-5/6'>
        <SearchBar
          placeholder='workshop'
          search={search}
          setSearch={setSearch}
        />
      </div>
      <div className='my-2 w-5/6 border border-b-0 border-dark-pink' />
      <div className='flex w-5/6 flex-col gap-4'>
        {filteredWorkshops.map((workshop) => (
          <WorkshopCard
            key={workshop.id}
            isBookmarked={isWorkshopBookmarked(workshop.id)}
            workshop={workshop}
          />
        ))}
      </div>
    </div>
  )
}

export default WorkshopPage
