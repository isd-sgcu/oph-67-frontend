'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { type UseFormReturn } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { Toaster, toast } from 'react-hot-toast'

import { updateUser } from '@/app/actions/edit-profile/edit-profile'
import { getUser } from '@/app/actions/get-profile/get-user'
import { config } from '@/app/config'
import { useAuth } from '@/components/auth/auth-provider'
import { LiffError } from '@/components/liff/liff-error'
import { LiffLoading } from '@/components/liff/liff-loading'
import { useLiffContext } from '@/components/liff/liff-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import translations from '@/const/register-title'
import { years } from '@/const/staff-year'
import { type AdminRegisterForm } from '@/types/admin-register'
import { type StaffData } from '@/types/staff-data'
import { validateEmail } from '@/utils/email-validation'
import { validatePhone } from '@/utils/phone-validation'
import transformToStaffData from '@/utils/transform-staff-data'

interface StaffFormProps {
  form: UseFormReturn<AdminRegisterForm>
}

const AdminFormEdit: React.FC<StaffFormProps> = ({ form }) => {
  const router = useRouter()
  const { profile, isInit } = useLiffContext()
  const { accessToken } = useAuth()
  const [isCorrectEmail, setIsCorrectEmail] = useState(true)
  const [isCorrectPhone, setIsCorrectPhone] = useState(true)
  const userId = profile?.userId

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        if (!userId) {
          throw new Error('User ID is undefined')
        }

        if (!accessToken) {
          throw new Error('Not authenticated')
        }

        const data = await getUser(userId, accessToken)
        if (data.role === 'staff') {
          const staffData = data as StaffData

          const [name, surname] = staffData.name.split(' ')

          form.reset({
            name,
            surname,
            nickname: staffData.nickname,
            studentId: staffData.studentId,
            email: staffData.email,
            phone: staffData.phone,
            year: staffData.year?.toString() as
              | '1'
              | '2'
              | '3'
              | '4'
              | '5'
              | '6'
              | undefined,
            faculty: staffData.faculty,
          })
        } else {
          console.error('User is not a staff member')
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    void fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Reason: This effect should only run once when the component mounts
  }, [])

  if (!isInit) {
    return <LiffLoading />
  }

  if (!profile) {
    return <LiffError error='Failed to load profile' />
  }

  if (!userId) {
    return <LiffError error='Failed to load user ID' />
  }

  async function onNext(): Promise<void> {
    const values = form.getValues()
    const requiredFields: (keyof AdminRegisterForm)[] = [
      'name',
      'surname',
      'nickname',
      'studentId',
      'status',
      'email',
      'phone',
      'year',
    ]
    let isFormValid = true
    let firstInvalidField: HTMLElement | null = null

    requiredFields.forEach((field) => {
      const inputElement = document.querySelector(`[name="${field}"]`)
      if (!values[field]) {
        isFormValid = false
        if (inputElement) {
          inputElement.classList.add('border-red-500')
          if (!firstInvalidField) {
            firstInvalidField = inputElement as HTMLElement
          }
        }
      } else if (inputElement) {
        inputElement.classList.remove('border-red-500')
      }
    })

    if (values.status === 'Staff ประจำคณะ' && !values.faculty) {
      isFormValid = false
      const facultyInput = document.querySelector(`[name="faculty"]`)
      if (facultyInput) {
        facultyInput.classList.add('border-red-500')
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- เหตุผล: ค่า someVariable อาจมีการเปลี่ยนแปลงแบบ asynchronous ที่ไม่สามารถตรวจจับได้
        if (!firstInvalidField) {
          firstInvalidField = facultyInput as HTMLElement
        }
      }
    }

    // Check if the email is valid
    if (!isCorrectEmail) {
      isFormValid = false
      const emailElement = document.querySelector(`[name="email"]`)
      if (emailElement) {
        emailElement.classList.add('border-red-500')
        firstInvalidField = emailElement as HTMLElement
      }
    }

    // Check if the phone number is valid
    if (!isCorrectPhone) {
      isFormValid = false
      const phoneElement = document.querySelector(`[name="phone"]`)
      if (phoneElement) {
        phoneElement.classList.add('border-red-500')
        firstInvalidField = phoneElement as HTMLElement
      }
    }

    if (!isFormValid && firstInvalidField) {
      firstInvalidField.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
      console.log('Form is invalid')
    } else {
      const loadingToastId = toast.loading('Loading...')
      try {
        const updates = transformToStaffData(values)
        await updateUser({
          id: userId ?? '',
          token: accessToken ?? '',
          updates,
        })
        toast.dismiss(loadingToastId)
        router.push('/3a9805a5')
      } catch (error) {
        toast.dismiss(loadingToastId)
        console.error('Error updating user data:', error)
        toast.error('This phone number is already taken.')
      }
    }
  }

  return (
    <div className='flex flex-col'>
      <Toaster
        position='top-center'
        toastOptions={{
          duration: 3000,
        }}
      />
      <div className='flex flex-col items-center justify-center gap-4 bg-[#FAE9F3] py-6'>
        <div className='flex flex-col items-center justify-center gap-0 font-mitr tracking-tight text-[#064E41]'>
          <object
            className='h-[125px] w-[125px]'
            data={`${config.cdnURL}/assets/register/oph-logo.svg`}
            type='image/svg+xml'
          >
            <Image
              alt='logo'
              height={125}
              src={`${config.cdnURL}/assets/register/oph-logo.svg`}
              width={125}
            />
          </object>
          <div className='mt-2 flex gap-1 text-xl font-medium'>
            <Image
              alt='edit'
              height={16}
              src={`${config.cdnURL}/assets/register/edit.svg`}
              width={16}
            />
            <div>แก้ไขข้อมูล</div>
          </div>
          <div className='text-base font-light'>Registration Form</div>
        </div>
      </div>
      <div className='flex flex-col gap-4 px-3 py-3 font-mitr'>
        <div className='flex flex-col gap-2'>
          <div className='flex gap-2 border-b border-[#064E41] pb-1'>
            <Image
              alt='person pin'
              height={20}
              src={`${config.cdnURL}/assets/register/person-pin.svg`}
              width={20}
            />
            <div className='text-base font-normal text-[#064E41]'>
              ข้อมูลส่วนตัว
            </div>
          </div>
          <div className='flex flex-col gap-3 p-2'>
            <div className='flex flex-col gap-1'>
              <div className='text-xs font-normal text-[#064E41]'>
                ชื่อ - นามสกุล<span className='text-[#FF0000]'>*</span>
              </div>
              <div className='flex items-center justify-center gap-2'>
                <Input
                  className='h-9 border-[#064E41] text-sm font-light text-[#064E41] placeholder:text-[#064E41] placeholder:opacity-50 focus-visible:ring-[#064E41]'
                  placeholder='ชื่อ'
                  {...form.register('name')}
                  name='name'
                  onInput={(e) => {
                    const inputElement = e.currentTarget
                    inputElement.classList.remove('border-red-500')
                  }}
                />
                <Input
                  className='h-9 border-[#064E41] text-sm font-light text-[#064E41] placeholder:text-[#064E41] placeholder:opacity-50 focus-visible:ring-[#064E41]'
                  placeholder='นามสกุล'
                  {...form.register('surname')}
                  name='surname'
                  onInput={(e) => {
                    const inputElement = e.currentTarget
                    inputElement.classList.remove('border-red-500')
                  }}
                />
              </div>
            </div>
            <div className='flex items-center justify-center gap-2'>
              <div className='flex w-full flex-col gap-1'>
                <div className='text-xs font-normal text-[#064E41]'>
                  ชื่อเล่น<span className='text-[#FF0000]'>*</span>
                </div>
                <Input
                  className='h-9 border-[#064E41] text-sm font-light text-[#064E41] placeholder:text-[#064E41] placeholder:opacity-50 focus-visible:ring-[#064E41]'
                  placeholder='ชื่อเล่น'
                  {...form.register('nickname')}
                  name='nickname'
                  onInput={(e) => {
                    const inputElement = e.currentTarget
                    inputElement.classList.remove('border-red-500')
                  }}
                />
              </div>
              <div className='flex w-full flex-col gap-1'>
                <div className='text-xs font-normal text-[#064E41]'>
                  รหัสนิสิต<span className='text-[#FF0000]'>*</span>
                </div>
                <Input
                  className='h-9 border-[#064E41] text-sm font-light text-[#064E41] placeholder:text-[#064E41] placeholder:opacity-50 focus-visible:ring-[#064E41]'
                  placeholder='รหัสนิสิต'
                  {...form.register('studentId')}
                  name='studentId'
                  onInput={(e) => {
                    const inputElement = e.currentTarget
                    inputElement.classList.remove('border-red-500')
                  }}
                />
              </div>
            </div>
            <div className='flex gap-2'>
              <div className='flex w-1/2 flex-col gap-1'>
                <div className='text-xs font-normal text-[#064E41]'>
                  Email
                  <span className='text-[#FF0000]'>
                    * {!isCorrectEmail ? translations.th.email.invalid : ''}
                  </span>
                </div>
                <Input
                  className='h-9 border-[#064E41] text-sm font-light text-[#064E41] placeholder:text-[#064E41] placeholder:opacity-50 focus-visible:ring-[#064E41]'
                  placeholder='@email.com'
                  {...form.register('email')}
                  name='email'
                  onInput={(e) => {
                    const inputElement = e.currentTarget
                    if (validateEmail(e.currentTarget.value)) {
                      setIsCorrectEmail(true)

                      inputElement.classList.remove('border-red-500')
                    } else {
                      setIsCorrectEmail(false)

                      inputElement.classList.add('border-red-500')
                    }
                  }}
                />
              </div>
              <div className='flex w-1/2 flex-col gap-1'>
                <div className='text-xs font-normal text-[#064E41]'>
                  เบอร์ติดต่อ
                  <span className='text-[#FF0000]'>
                    * {!isCorrectPhone ? translations.th.phone.invalid : ''}
                  </span>
                </div>
                <Input
                  className='h-9 border-[#064E41] text-sm font-light text-[#064E41] placeholder:text-[#064E41] placeholder:opacity-50 focus-visible:ring-[#064E41]'
                  placeholder='09xxxxxxxx'
                  {...form.register('phone')}
                  name='phone'
                  onInput={(e) => {
                    const inputElement = e.currentTarget
                    if (validatePhone(e.currentTarget.value)) {
                      setIsCorrectPhone(true)
                      inputElement.classList.remove('border-red-500')
                    } else {
                      setIsCorrectPhone(false)
                      inputElement.classList.add('border-red-500')
                    }
                  }}
                />
              </div>
            </div>
            <div className='flex gap-2'>
              <div className='flex w-full flex-col gap-1'>
                <div className='text-xs font-normal text-[#064E41]'>
                  ชั้นปี<span className='text-[#FF0000]'>*</span>
                </div>
                <Controller
                  control={form.control}
                  name='year'
                  render={({ field }) => (
                    <Select
                      defaultValue=''
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value)
                        // Remove red border when user selects value
                        const inputElement =
                          document.querySelector(`[name="year"]`)
                        if (inputElement) {
                          inputElement.classList.remove('border-red-500')
                        }
                      }}
                    >
                      <SelectTrigger
                        className='h-9 border-[#064E41] text-sm font-light text-[#064E41] focus:ring-[#064E41]'
                        name='year'
                      >
                        <SelectValue placeholder='ชั้นปี' />
                      </SelectTrigger>
                      <SelectContent position='popper' side='bottom'>
                        {years.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <Button
          className='mb-32 w-full font-cloud-soft text-2xl font-medium'
          variant='filled'
          onClick={onNext}
        >
          ยืนยัน
        </Button>
      </div>
    </div>
  )
}

export default AdminFormEdit
