'use client'

import Link from 'next/link'
import { useState } from 'react'

import { NavbarItems } from '@/const/navbar'

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  // const isRegistered = false

  return (
    <div>
      <header className='z-10 flex w-full flex-col'>
        {/* Burger's Content */}
        <div
          className={`duration-[500ms] absolute left-0 z-20 w-full bg-[#076855] transition-all ease-in-out ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}
        >
          {/* X Button */}
          <div
            className={`flex w-full justify-end px-[41px] py-[36px] transition-opacity duration-100 ${
              isOpen ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <button type='button' onClick={() => setIsOpen(!isOpen)}>
              <div className='relative grid gap-1.5'>
                <span className='h-0.5 w-6 translate-y-1 rotate-45 rounded-full bg-white' />
                <span className='h-0.5 w-6 -translate-y-1 -rotate-45 rounded-full bg-white' />
              </div>
            </button>
          </div>

          {/* Content */}
          <ul
            className={`flex flex-col items-center justify-center transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          >
            {NavbarItems.map((item) => (
              <Link
                key={item.title}
                className='w-full cursor-pointer py-[36px] pl-[41px] text-xl font-semibold text-white hover:bg-[#064E41]'
                href={item.link}
                onClick={() => setIsOpen(!isOpen)}
              >
                {item.title}
              </Link>
            ))}
          </ul>
        </div>

        <div className='flex h-[72px] w-full items-center justify-between bg-[#064E41] py-1 pl-2 pr-4'>
          {/* Logo is at the left */}
          <Link
            className='h-[64px] w-[64px]'
            href='/'
            style={{
              backgroundImage: 'url(/homepage/oph_logo-01.svg)',
            }}
          />

          {/* Burger Button is at the right */}
          <div className='flex gap-4'>
            {/* {isRegistered && ( */}
            <Link
              className='h-[31.5px] w-[31.5px]'
              href='/profile'
              style={{
                backgroundImage: 'url(/homepage/profile.svg)',
              }}
            />
            {/* )} */}
            <button type='button' onClick={() => setIsOpen(!isOpen)}>
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
