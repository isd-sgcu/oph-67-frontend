'use client'

import Image from 'next/image'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { PanelItems } from '@/const/adminpanel'

const Adminrole: React.FC = () => {
  const [items, setItems] = useState(PanelItems)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchInput, setSearchInput] = useState('')

  const handleRemove = (uid: number): void => {
    const updatedItems = items.filter((item) => item.uid !== uid)
    setItems(updatedItems)
  }

  const handleRoleChange = (uid: number, newRole: string): void => {
    const updatedItems = items.map((item) =>
      item.uid === uid ? { ...item, role: newRole } : item
    )
    setItems(updatedItems)
    setSearchQuery(searchQuery)
    setSearchInput(searchQuery)
  }

  const handleSearchClick = (): void => {
    setSearchQuery(searchInput)
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
        {/* Add Role */}
        <div className='mx-12 my-4 flex items-center justify-center gap-4'>
          <input
            className='w-full rounded-full border p-2'
            placeholder='add phone number'
            type='tel'
          />
          <Button
            className='flex items-center justify-center rounded-full p-5'
            size='sm'
            type='button'
            variant='outline'
          >
            <Image
              alt='add_role'
              height={20}
              src='/assets/admin/add_role.svg'
              width={20}
            />
            Add Role
          </Button>
        </div>
        {/* Search Box */}
        <div className='relative m-4'>
          <Input
            className='rounded-full'
            placeholder='searching staff'
            type='text'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button
            className='absolute right-2 top-1/2 -translate-y-1/2 transform'
            onClick={handleSearchClick}
          >
            <Image
              alt='Search Icon'
              height={20}
              src='/assets/admin/search.svg'
              width={20}
            />
          </Button>
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

        {filteredItems.map((item) => (
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
            <div className='p-3 text-center'>
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
            <div className='p-3 text-center'>
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
            <div className='relative p-3 text-center'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline'>...</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56'>
                  <DropdownMenuItem onClick={() => handleRemove(item.uid)}>
                    <Image
                      alt='remove'
                      className='mr-2'
                      height={16}
                      src='/assets/admin/remove.svg'
                      width={16}
                    />
                    Remove
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleRoleChange(item.uid, 'staff')}
                  >
                    <Image
                      alt='staff'
                      className='mr-2'
                      height={16}
                      src='/assets/admin/staff.svg'
                      width={16}
                    />
                    Change to Staff
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleRoleChange(item.uid, 'admin')}
                  >
                    <Image
                      alt='admin'
                      className='mr-2'
                      height={16}
                      src='/assets/admin/admin.svg'
                      width={16}
                    />
                    Change to Admin
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Adminrole
