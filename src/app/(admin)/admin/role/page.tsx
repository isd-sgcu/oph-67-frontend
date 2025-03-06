'use client'

import Image from 'next/image'
import { useState } from 'react'

import { PanelItems } from '@/const/adminpanel'

const Adminrole: React.FC = () => {
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null)
  const [items, setItems] = useState(PanelItems)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchInput, setSearchInput] = useState('')

  const handleRemove = (uid: number): void => {
    const updatedItems = items.filter((item) => item.uid !== uid)
    setItems(updatedItems)
    setDropdownIndex(null)
  }

  const handleRoleChange = (uid: number, newRole: string): void => {
    const updatedItems = items.map((item) =>
      item.uid === uid ? { ...item, role: newRole } : item
    )
    setItems(updatedItems)

    setSearchQuery(searchQuery)
    setSearchInput(searchQuery)
    setDropdownIndex(null)
  }

  const handleSearchClick = (): void => {
    setSearchQuery(searchInput)
  }

  const handleKeyDown = (
    event: React.KeyboardEvent,
    action: () => void
  ): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      action()
    }
  }

  const filteredItems =
    searchQuery !== ''
      ? items.filter((item) =>
          item.name.toLowerCase().startsWith(searchQuery.toLowerCase())
        )
      : items

  return (
    <div className='flex min-h-screen flex-col items-center gap-4 bg-gradient-to-r from-[#FFA2CB] via-[#EA88BD] to-[#EAF7B3] py-8 font-anuphan'>
      {/* Logo */}
      <div className='relative'>
        <div className='absolute z-0 h-[100px] w-[100px] bg-white blur-2xl' />
        <Image
          alt='logo'
          className='relative z-10'
          height={105}
          src='/assets/admin/oph_logo-04.svg'
          width={118}
        />
      </div>

      <h1 className='text-2xl font-medium text-white'>Admin Panel</h1>

      {/* Content */}
      <div className='w-full bg-white'>
        {/* Search Box */}
        <div className='relative m-4'>
          <input
            className='w-full rounded-full border p-2'
            placeholder='searching staff'
            type='text'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <div
            className='absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer'
            role='button'
            tabIndex={0}
            onClick={handleSearchClick}
            onKeyDown={(e) => handleKeyDown(e, handleSearchClick)}
          >
            <Image
              alt='Search Icon'
              height={24}
              src='/assets/admin/search.svg'
              width={24}
            />
          </div>
        </div>

        {/* Table */}
        <div className='grid grid-cols-5 gap-4 border-y-2'>
          <div className='p-3 text-center font-anuphan text-sm font-normal text-black'>
            UID
          </div>
          <div className='p-3 text-center font-anuphan text-sm font-normal text-black'>
            Name
          </div>
          <div className='p-3 text-center font-anuphan text-sm font-normal text-black'>
            Role
          </div>
          <div className='p-3 text-center font-anuphan text-sm font-normal text-black'>
            Faculty
          </div>
          <div className='p-3 text-center font-anuphan text-sm font-normal text-black'>
            Action
          </div>
        </div>

        {filteredItems.map((item, index) => (
          <div
            key={item.uid}
            className='grid grid-cols-5 gap-4 border-b bg-white'
          >
            <div className='p-3 text-center font-anuphan text-sm font-normal text-black'>
              #{item.uid}
            </div>
            <div className='p-3 text-center font-anuphan text-sm font-normal text-black'>
              {item.name}
            </div>
            <div className='p-3'>
              <span
                className='inline-block w-[60px] text-center font-anuphan text-[12px] font-normal text-white'
                style={{
                  backgroundColor:
                    item.role === 'admin' ? '#064E41' : '#DD579B',
                }}
              >
                {item.role.charAt(0).toUpperCase() + item.role.slice(1)}
              </span>
            </div>
            <div className='p-3'>
              <span
                className='inline-block w-[60px] text-center font-anuphan text-[12px] font-normal text-white'
                style={{
                  backgroundColor:
                    item.faculty === 'ส่วนกลาง' ? '#4E2406' : '#D8894F',
                }}
              >
                {item.faculty}
              </span>
            </div>
            <div className='relative p-3'>
              <div className='relative flex items-center justify-center'>
                <button
                  className='text-black'
                  type='button'
                  onClick={() =>
                    setDropdownIndex(dropdownIndex === index ? null : index)
                  }
                >
                  ...
                </button>
                {dropdownIndex === index && (
                  <div className='absolute right-0 z-10 mt-2 w-48'>
                    <button
                      className='flex w-full items-center gap-2 bg-[#ff0000] p-2 font-anuphan text-sm font-medium text-white'
                      type='button'
                      onClick={() => handleRemove(item.uid)}
                    >
                      <Image
                        alt='remove'
                        height={16}
                        src='/assets/admin/remove.svg'
                        width={16}
                      />
                      Remove
                    </button>
                    <button
                      className='flex w-full items-center gap-2 bg-[#DD579B] p-2 font-anuphan text-sm font-medium text-white'
                      type='button'
                      onClick={() => handleRoleChange(item.uid, 'staff')}
                    >
                      <Image
                        alt='staff'
                        height={16}
                        src='/assets/admin/staff.svg'
                        width={16}
                      />
                      Change to Staff
                    </button>
                    <button
                      className='flex w-full items-center gap-2 bg-[#064E41] p-2 font-anuphan text-sm font-medium text-white'
                      type='button'
                      onClick={() => handleRoleChange(item.uid, 'admin')}
                    >
                      <Image
                        alt='admin'
                        height={16}
                        src='/assets/admin/admin.svg'
                        width={16}
                      />
                      Change to Admin
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Adminrole
