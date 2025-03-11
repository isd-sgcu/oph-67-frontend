'use client'

import { Search } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import { config } from '@/app/config'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { PanelItems } from '@/const/adminpanel'

const Adminrole: React.FC = () => {
  const [items, setItems] = useState(PanelItems)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isAddingRole, setIsAddingRole] = useState(false)

  const handleRemove = (uid: number): void => {
    const updatedItems = items.filter((item) => item.uid !== uid)
    setItems(updatedItems)
  }

  const handleRoleChange = (uid: number, newRole: string): void => {
    const updatedItems = items.map((item) =>
      item.uid === uid ? { ...item, role: newRole } : item
    )
    setItems(updatedItems)
  }

  const handleSearch = (e: React.FormEvent): void => {
    e.preventDefault()
    setSearchQuery(searchInput)
  }

  const handleAddRole = (): void => {
    if (!phoneNumber || phoneNumber.trim() === '') {
      return
    }

    // TODO: add api call
    setIsAddingRole(true)

    // Simulate API call delay
    setTimeout(() => {
      const newUser = {
        uid: Math.floor(Math.random() * 1000) + 100,
        name: `New User (${phoneNumber})`,
        role: 'staff',
        faculty: 'ส่วนกลาง',
      }

      setItems([newUser, ...items])
      setPhoneNumber('')
      setIsAddingRole(false)
    }, 1000)
  }

  const filteredItems = searchQuery
    ? items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : items

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#DD579B] via-[#EA88BD] to-[#ECF3C0]'>
      <div className='mx-auto max-w-6xl'>
        {/* Header */}
        <div className='mb-8 flex flex-col items-center justify-center'>
          <div className='relative mb-4'>
            <div className='absolute left-1/2 top-1/2 z-0 h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white/50 blur-xl' />
            <Image
              alt='logo'
              className='relative z-10'
              height={105}
              src={`${config.cdnURL}/assets/admin/oph_logo-04.svg`}
              width={118}
            />
          </div>
          <h1 className='text-2xl font-semibold text-white'>
            Staff Management
          </h1>
        </div>

        <div className='flex justify-center bg-white p-4'>
          <div className='flex w-full max-w-xl items-center justify-between gap-3'>
            <Input
              className='h-12 flex-1 rounded-full border border-gray-200 bg-white pl-6 text-gray-600 placeholder-gray-400 shadow-sm'
              disabled={isAddingRole}
              placeholder='add phone number'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Button
              className='flex h-12 items-center justify-center gap-2 rounded-full border-2 border-[#245E45] bg-white px-6 font-medium text-[#245E45] hover:bg-white/90'
              disabled={isAddingRole || !phoneNumber}
              variant='outline'
              onClick={handleAddRole}
            >
              {isAddingRole ? (
                <div className='h-4 w-4 animate-spin rounded-full border-2 border-[#245E45] border-t-transparent' />
              ) : (
                <svg
                  className='h-5 w-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z' />
                </svg>
              )}
              Add Role
            </Button>
          </div>
        </div>

        {/* Main Content Card */}
        <div className='bg-white shadow-lg'>
          {/* Search Bar */}
          <div className='border-b p-4'>
            <form className='flex space-x-1' onSubmit={handleSearch}>
              <div className='relative w-full'>
                <Input
                  className='h-12 w-full rounded-full border border-gray-200 bg-white pl-4 pr-12 text-gray-600 placeholder-gray-400 shadow-sm'
                  placeholder='Search staff by name...'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <div className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400'>
                  <Search className='h-4 w-4' />
                </div>
              </div>
            </form>
          </div>

          {/* Table */}
          <div className='p-4'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-[100px]'>UID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Faculty</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.uid}>
                    <TableCell className='font-medium'>#{item.uid}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          item.role === 'admin'
                            ? 'bg-[#064E41] hover:bg-[#064E41]/80'
                            : 'bg-[#DD579B] hover:bg-[#DD579B]/80'
                        }
                        variant={
                          item.role === 'admin' ? 'default' : 'secondary'
                        }
                      >
                        {item.role.charAt(0).toUpperCase() + item.role.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant='outline'
                        className={
                          item.faculty === 'ส่วนกลาง'
                            ? 'text-nowrap border-[#4E2406] text-[#4E2406]'
                            : 'text-nowrap border-[#D8894F] text-[#D8894F]'
                        }
                      >
                        {item.faculty}
                      </Badge>
                    </TableCell>
                    <TableCell className='text-right'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size='sm' variant='ghost'>
                            <span className='sr-only'>Open menu</span>
                            <div className='h-4 w-4'>•••</div>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end' className='w-[160px]'>
                          <DropdownMenuItem
                            className='bg-green-800 text-white'
                            onClick={() => handleRoleChange(item.uid, 'admin')}
                          >
                            <Image
                              alt='admin'
                              className='mr-2'
                              height={16}
                              src={`${config.cdnURL}/assets/admin/admin.svg`}
                              width={16}
                            />
                            Make Admin
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className='bg-pink-500 text-white'
                            onClick={() => handleRoleChange(item.uid, 'staff')}
                          >
                            <Image
                              alt='staff'
                              className='mr-2'
                              height={16}
                              src={`${config.cdnURL}/assets/admin/staff.svg`}
                              width={16}
                            />
                            Make Staff
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className='bg-red-500 text-white'
                            onClick={() => handleRemove(item.uid)}
                          >
                            <Image
                              alt='remove'
                              className='mr-2'
                              height={16}
                              src={`${config.cdnURL}/assets/admin/remove.svg`}
                              width={16}
                            />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Adminrole
