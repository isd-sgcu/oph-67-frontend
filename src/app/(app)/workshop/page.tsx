'use client'

import { Bookmark } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import SearchBar from '@/components/faculties/searchbar'
import { Button } from '@/components/ui/button'
import WorkshopSmallCard from '@/components/workshop/workshop-small-card'
import { allWorkshops } from '@/const/workshops'

const WorkshopPage: React.FC = () => {
  const [search, setSearch] = useState('')
  const [filteredWorkshops, setFilteredWorkshops] = useState(allWorkshops)

  useEffect(() => {
    setFilteredWorkshops(
      allWorkshops.filter(
        (workshop) =>
          workshop.name.toLowerCase().includes(search.toLowerCase()) ||
          workshop.faculty.toLowerCase().includes(search.toLowerCase()) ||
          workshop.major.toLowerCase().includes(search.toLowerCase())
      )
    )
  }, [search])

  return (
    <div className='flex h-full w-full grow flex-col items-center gap-3 overflow-hidden py-8'>
      <Link className='-my-2 -mt-4 ml-auto mr-2' href='/workshop/bookmark'>
        <Button className='gap-2 font-normal' size='sm' variant='outline'>
          <Bookmark />
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
      <div className='grid grid-cols-2 gap-6'>
        {filteredWorkshops.map((workshop) => (
          <WorkshopSmallCard key={workshop.id} workshop={workshop} />
        ))}
      </div>
    </div>
  )
}

export default WorkshopPage
