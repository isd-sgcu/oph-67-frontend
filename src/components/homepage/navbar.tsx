'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

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
    <div>
      <header className='z-10 flex w-full flex-col'>
        {/* Burger's Content */}
        <div
          className={`absolute left-0 z-20 w-full bg-[#076855] transition-all duration-500 ease-in-out ${
            isMenuOpen ? 'translate-x-[0px]' : '-translate-x-full'
          }`}
        >
          {/* X Button */}
          <div className='flex w-full justify-end px-[41px] py-[36px]'>
            <button type='button' onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <div className='relative grid gap-1.5'>
                <span className='h-0.5 w-6 translate-y-1 rotate-45 rounded-full bg-white' />
                <span className='h-0.5 w-6 -translate-y-1 -rotate-45 rounded-full bg-white' />
              </div>
            </button>
          </div>

          {/* Content */}
          <ul className='flex flex-col items-center justify-center'>
            {menuItems.map((item) => (
              <Link
                key={item.title}
                className='w-full cursor-pointer py-[36px] pl-[41px] text-xl font-semibold text-white hover:bg-[#064E41]'
                href={item.link}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {item.title}
              </Link>
            ))}
          </ul>
        </div>

        <div className='flex h-[72px] w-full items-center justify-between bg-[#064E41] px-2 py-1'>
          {/* Logo is at the left */}
          <Image
            alt='logo'
            height={64}
            src='/homepage/oph_logo-01.svg'
            width={64}
          />

          {/* Burger Button is at the right */}
          <button type='button' onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div className='relative grid justify-items-center gap-1.5'>
              <span className='h-0.5 w-6 rounded-full bg-white' />
              <span className='h-0.5 w-6 rounded-full bg-white' />
              <span className='h-0.5 w-6 rounded-full bg-white' />
            </div>
          </button>
        </div>
      </header>
    </div>
  )
}

export default Navbar
