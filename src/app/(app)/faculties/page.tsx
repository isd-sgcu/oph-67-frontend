'use client'

import { useEffect, useState } from 'react'

import FacultyCard from '@/components/faculties/faculty-card'
import SearchBar from '@/components/faculties/searchbar'
import { faculties } from '@/const/faculties'

const Faculties: React.FC = () => {
  const [search, setSearch] = useState('')
  const [filteredFaculties, setFilteredFaculties] = useState(faculties)

  useEffect(() => {
    setFilteredFaculties(
      faculties.filter(
        (faculty) =>
          faculty.th.toLowerCase().includes(search.toLowerCase()) ||
          faculty.en.toLowerCase().includes(search.toLowerCase())
      )
    )
  }, [search])

  return (
    <div className='flex h-full w-full grow flex-col items-center gap-3 px-4 py-8'>
      <h1 className='text-2xl font-normal tracking-tight text-primary-green'>
        ค้นหาคณะ / Faculties
      </h1>
      <div className='mt-2 w-5/6'>
        <SearchBar
          placeholder='คณะอักษรศาสตร์'
          search={search}
          setSearch={setSearch}
        />
      </div>
      <div className='my-2 w-5/6 border border-b-0 border-dark-pink' />
      <div className='grid grid-cols-2 gap-6'>
        {filteredFaculties.map((faculty) => (
          <FacultyCard key={faculty.en} faculty={faculty} />
        ))}
      </div>
    </div>
  )
}

export default Faculties
