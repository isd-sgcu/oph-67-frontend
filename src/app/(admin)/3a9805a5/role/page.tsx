'use client'

import { Search } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'

import { addStaff } from '@/app/actions/staff/add-staff'
import { changeRole } from '@/app/actions/staff/change-role'
import { deleteStaff } from '@/app/actions/staff/delete-staff'
import { getStaff } from '@/app/actions/staff/get-staff'
import { config } from '@/app/config'
import { useAuth } from '@/components/auth/auth-provider'
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

interface StaffItem {
  uid: number
  name: string
  role: string
  faculty: string
  phone?: string
}

const Adminrole: React.FC = () => {
  const [items, setItems] = useState<StaffItem[]>([])
  const [searchInput, setSearchInput] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isAddingRole, setIsAddingRole] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSearching, setIsSearching] = useState(false)
  const [isRemovingStaff, setIsRemovingStaff] = useState<number | null>(null)
  const [isChangingRole, setIsChangingRole] = useState<{
    uid: number
    role: string
  } | null>(null)
  const { accessToken } = useAuth()
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const fetchInitialData = async (): Promise<void> => {
      try {
        setIsLoading(true)

        if (!accessToken) {
          console.error('No authentication token found')
          toast.error('Authentication failed. Please log in again.')
          setIsLoading(false)
          return
        }

        await fetchStaffData(accessToken)
      } catch (error) {
        console.error('Error fetching initial data:', error)
        toast.error('Failed to load staff data. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    void fetchInitialData()
  }, [accessToken])

  useEffect(() => {
    if (!accessToken) return

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    searchTimeoutRef.current = setTimeout(() => {
      const performSearch = async (): Promise<void> => {
        if (searchInput.trim() !== '') {
          setIsSearching(true)
          try {
            await fetchStaffData(accessToken, searchInput)
          } catch (error) {
            console.error('Error searching staff:', error)
          } finally {
            setIsSearching(false)
          }
        } else {
          try {
            await fetchStaffData(accessToken)
          } catch (error) {
            console.error('Error fetching all staff:', error)
          }
        }
      }

      void performSearch()
    }, 500)

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [searchInput, accessToken])

  const fetchStaffData = async (
    authToken: string,
    name?: string
  ): Promise<void> => {
    try {
      const staffData = await getStaff(authToken, name)

      const formattedStaff: StaffItem[] = staffData.map((staff) => ({
        uid: staff.id || Math.floor(Math.random() * 1000) + 100,
        name: staff.name || 'Unknown',
        role: staff.role || 'staff',
        faculty: staff.school || 'ส่วนกลาง',
        phone: staff.phone,
      }))

      setItems(formattedStaff)

      if (!name) {
        toast.success('Staff data loaded successfully')
      }
    } catch (error) {
      console.error('Error fetching staff data:', error)
      if (!name) {
        toast.error('Failed to load staff data. Please try again.')
      }
      throw error
    }
  }

  const handleRemove = async (uid: number): Promise<void> => {
    if (!accessToken) {
      toast.error('Authentication failed. Please log in again.')
      return
    }

    try {
      setIsRemovingStaff(uid)

      await deleteStaff(accessToken, uid.toString())

      const updatedItems = items.filter((item) => item.uid !== uid)
      setItems(updatedItems)

      toast.success('Staff member removed successfully')
    } catch (error) {
      console.error('Error removing staff:', error)
      toast.error('Failed to remove staff member. Please try again.')
    } finally {
      setIsRemovingStaff(null)
    }
  }

  const handleRoleChange = async (
    uid: number,
    newRole: string
  ): Promise<void> => {
    if (!accessToken) {
      toast.error('Authentication failed. Please log in again.')
      return
    }

    try {
      setIsChangingRole({ uid, role: newRole })

      await changeRole(accessToken, uid, newRole)

      const updatedItems = items.map((item) =>
        item.uid === uid ? { ...item, role: newRole } : item
      )
      setItems(updatedItems)

      toast.success(`Role updated to ${newRole} successfully`)
    } catch (error) {
      console.error('Error changing role:', error)
      toast.error('Failed to update role. Please try again.')
    } finally {
      setIsChangingRole(null)
    }
  }

  const handleAddRole = async (): Promise<void> => {
    if (!phoneNumber || phoneNumber.trim() === '') {
      toast.error('Please enter a valid phone number')
      return
    }

    if (!accessToken) {
      toast.error('Authentication failed. Please log in again.')
      return
    }

    setIsAddingRole(true)

    try {
      await addStaff(accessToken, phoneNumber)
      setPhoneNumber('')

      toast.success('Staff member added successfully')
    } catch (error) {
      console.error('Error adding staff:', error)
      toast.error('Failed to add staff member. Please try again.')
    } finally {
      setIsAddingRole(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#DD579B] via-[#EA88BD] to-[#ECF3C0]'>
      <Toaster position='top-center' />
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
              onClick={() => void handleAddRole()}
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
            <div className='relative w-full'>
              <Input
                className='h-12 w-full rounded-full border border-gray-200 bg-white pl-4 pr-12 text-gray-600 placeholder-gray-400 shadow-sm'
                placeholder='Search staff by name...'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <div className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400'>
                {isSearching ? (
                  <div className='h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent' />
                ) : (
                  <Search className='h-4 w-4' />
                )}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className='p-4'>
            {isLoading ? (
              <div className='flex items-center justify-center py-10'>
                <div className='h-8 w-8 animate-spin rounded-full border-4 border-[#DD579B] border-t-transparent' />
                <span className='ml-3 text-gray-600'>
                  Loading staff data...
                </span>
              </div>
            ) : (
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
                  {items.length > 0 ? (
                    items.map((item) => (
                      <TableRow key={item.uid}>
                        <TableCell className='font-medium'>
                          #{item.uid.toString().slice(0, 3)}
                        </TableCell>
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
                            {item.role.charAt(0).toUpperCase() +
                              item.role.slice(1)}
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
                            <DropdownMenuContent
                              align='end'
                              className='w-[160px]'
                            >
                              <DropdownMenuItem
                                className='bg-green-800 text-white'
                                disabled={
                                  isChangingRole?.uid === item.uid ||
                                  item.role === 'admin'
                                }
                                onClick={() =>
                                  void handleRoleChange(item.uid, 'admin')
                                }
                              >
                                {isChangingRole?.uid === item.uid &&
                                isChangingRole.role === 'admin' ? (
                                  <>
                                    <div className='mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
                                    Updating...
                                  </>
                                ) : (
                                  <>
                                    <Image
                                      alt='admin'
                                      className='mr-2'
                                      height={16}
                                      src={`${config.cdnURL}/assets/admin/admin.svg`}
                                      width={16}
                                    />
                                    Make Admin
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className='bg-pink-500 text-white'
                                disabled={
                                  isChangingRole?.uid === item.uid ||
                                  item.role === 'staff'
                                }
                                onClick={() =>
                                  void handleRoleChange(item.uid, 'staff')
                                }
                              >
                                {isChangingRole?.uid === item.uid &&
                                isChangingRole.role === 'staff' ? (
                                  <>
                                    <div className='mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
                                    Updating...
                                  </>
                                ) : (
                                  <>
                                    <Image
                                      alt='staff'
                                      className='mr-2'
                                      height={16}
                                      src={`${config.cdnURL}/assets/admin/staff.svg`}
                                      width={16}
                                    />
                                    Make Staff
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className='bg-red-500 text-white'
                                disabled={isRemovingStaff === item.uid}
                                onClick={() => void handleRemove(item.uid)}
                              >
                                {isRemovingStaff === item.uid ? (
                                  <>
                                    <div className='mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
                                    Removing...
                                  </>
                                ) : (
                                  <>
                                    <Image
                                      alt='remove'
                                      className='mr-2'
                                      height={16}
                                      src={`${config.cdnURL}/assets/admin/remove.svg`}
                                      width={16}
                                    />
                                    Remove
                                  </>
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        className='py-8 text-center text-gray-500'
                        colSpan={5}
                      >
                        {searchInput
                          ? 'No staff members found matching your search'
                          : 'No staff members found'}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Adminrole
