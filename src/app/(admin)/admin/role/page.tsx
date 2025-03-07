'use client'

import { Search } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

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
              src='/assets/admin/oph_logo-04.svg'
              width={118}
            />
          </div>
          <h1 className='text-2xl font-medium text-white'>Staff Management</h1>
        </div>

        {/* Main Content Card */}
        <div className='rounded-xl bg-white shadow-lg'>
          {/* Search Bar */}
          <div className='border-b p-4'>
            <form className='relative' onSubmit={handleSearch}>
              <Input
                className='pr-10'
                placeholder='Search staff by name...'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <Button
                className='absolute right-2 top-1/2 -translate-y-1/2'
                size='icon'
                type='submit'
                variant='ghost'
              >
                <Search className='h-4 w-4' />
              </Button>
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
                            ? 'border-[#4E2406] text-[#4E2406]'
                            : 'border-[#D8894F] text-[#D8894F]'
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
                              src='/assets/admin/admin.svg'
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
                              src='/assets/admin/staff.svg'
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
                              src='/assets/admin/remove.svg'
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
