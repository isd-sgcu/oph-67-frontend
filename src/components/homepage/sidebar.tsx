'use client'

import { X } from 'lucide-react'
import Link from 'next/link'

import { NavbarItems } from '@/const/navbar'
import { cn } from '@/lib/cn'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      <div
        aria-label='Close sidebar'
        role='button'
        tabIndex={0}
        className={cn(
          'fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onClose()
          }
        }}
      />

      <div
        className={cn(
          'fixed left-0 top-0 z-30 h-full w-64 rounded-br-2xl rounded-tr-2xl bg-[#076855] shadow-lg transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className='flex justify-end p-4'>
          <button
            className='rounded-full p-2 transition-colors hover:bg-[#064E41]'
            type='button'
            onClick={onClose}
          >
            <X color='white' />
          </button>
        </div>
        <ul className='flex flex-col'>
          {NavbarItems.map((item) => (
            <Link
              key={item.en}
              className='cursor-pointer py-4 pl-6 font-anuphan text-white transition-colors hover:bg-[#064E41]'
              href={item.link}
              onClick={onClose}
            >
              <div className='flex flex-col gap-1'>
                <p className='text-xl font-semibold'>{item.en}</p>
                <p className='text-sm font-medium'>{item.th}</p>
              </div>
            </Link>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Sidebar
