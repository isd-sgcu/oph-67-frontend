'use client'

import Image from 'next/image'

import { config } from '@/app/config'

interface SearchBarProps {
  search: string
  setSearch: (search: string) => void
  placeholder?: string
}

const SearchBar: React.FC<SearchBarProps> = ({
  search,
  setSearch,
  placeholder,
}) => {
  return (
    <div className='relative flex items-center'>
      <Image
        alt='search icon'
        className='absolute left-3'
        height={12}
        src={`${config.cdnURL}/assets/icons/search.svg`}
        width={12}
      />
      <input
        className='w-full rounded-md border p-2 pl-9'
        placeholder={placeholder}
        type='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  )
}

export default SearchBar
