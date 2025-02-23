'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { getImageURL } from '@/utils/image'

interface MenuItem {
  title: string
  link: string
}

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems: MenuItem[] = [
    { title: 'Navigator', link: '/' },
    { title: 'Event', link: '/' },
    { title: 'Faculties', link: '/' },
    { title: 'Workshop', link: '/' },
    { title: 'Pick Your Flower', link: '/' },
    { title: 'Account', link: '/' },
  ]

  return (
    <div className='relative'>
      <header className='z-50 flex w-full flex-col'>
        <div className='flex h-[72px] w-full items-center justify-between bg-[#064E41] px-2 py-1'>
          {/* Logo is at the left */}
          <Image
            alt='logo'
            height={64}
            src={getImageURL('/homepage/oph_logo-01.svg')}
            width={64}
          />
          {/* Burger Button is at the right */}
          <button
            className='group'
            type='button'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className='relative grid justify-items-center gap-1.5'>
              <span
                className={`h-0.5 w-6 rounded-full bg-white transition-transform duration-300 ${
                  isMenuOpen ? 'translate-y-2 rotate-45' : ''
                }`}
              />
              <span
                className={`h-0.5 w-6 rounded-full bg-white transition-transform duration-300 ${
                  isMenuOpen ? 'scale-x-0' : ''
                }`}
              />
              <span
                className={`h-0.5 w-6 rounded-full bg-white transition-transform duration-300 ${
                  isMenuOpen ? '-translate-y-2 -rotate-45' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Burger's Content */}
      <div
        className={`absolute left-0 top-[72px] z-40 w-[245px] border-r bg-[#076855] transition-all duration-500 ease-in-out ${
          isMenuOpen
            ? 'translate-x-[0px] opacity-100'
            : 'pointer-events-none -translate-x-full opacity-0'
        }`}
      >
        <ul className='flex flex-col items-center justify-center'>
          {menuItems.map((item) => (
            <Link
              key={item.title} // Simplified key since title should be unique
              className='w-full cursor-pointer py-[36px] pl-[41px] text-xl font-semibold text-white hover:bg-[#064E41]'
              href={item.link}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {item.title}
            </Link>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Navbar
