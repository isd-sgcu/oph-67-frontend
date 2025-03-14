'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { config } from '@/app/config'
import Sidebar from '@/components/homepage/sidebar'

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = (): void => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <header className='z-10 flex w-full flex-col'>
        {/* Sidebar Component */}
        <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

        <div className='flex h-[72px] w-full items-center justify-between bg-[#064E41] py-1 pl-2 pr-4'>
          {/* Logo is at the left */}
          <Link href='/'>
            <object
              className='h-[64px] w-[64px]'
              data={`${config.cdnURL}/assets/homepage/oph_logo-01.svg`}
              type='image/svg+xml'
            >
              <Image
                alt='logo'
                className='h-[64px] w-[64px]'
                height={64}
                src={`${config.cdnURL}/assets/homepage/oph_logo-01.svg`}
                width={64}
              />
            </object>
          </Link>

          {/* Burger Button is at the right */}
          <div className='flex gap-4'>
            <Link
              className='h-[31.5px] w-[31.5px]'
              href='/profile'
              style={{
                backgroundImage: `url(${config.cdnURL}/assets/homepage/profile.svg)`,
              }}
            />
            <button type='button' onClick={toggleSidebar}>
              <div className='relative grid justify-items-center gap-1.5'>
                <span className='h-0.5 w-6 rounded-full bg-white' />
                <span className='h-0.5 w-6 rounded-full bg-white' />
                <span className='h-0.5 w-6 rounded-full bg-white' />
              </div>
            </button>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Navbar
