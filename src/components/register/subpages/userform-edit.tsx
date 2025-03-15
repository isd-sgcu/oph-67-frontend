'use client'
import { CalendarIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { type UseFormReturn } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { Toaster, toast } from 'react-hot-toast'

import { getAuthToken } from '@/app/actions/auth'
import { updateUser } from '@/app/actions/edit-profile/edit-profile'
import { getUser } from '@/app/actions/get-profile/get-user'
import { config } from '@/app/config'
import { LiffError } from '@/components/liff/liff-error'
import { LiffLoading } from '@/components/liff/liff-loading'
import { useLiffContext } from '@/components/liff/liff-provider'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { FacultyTH } from '@/const/faculties'
import { provinces } from '@/const/province'
import translations from '@/const/register-title'
import { status } from '@/const/status'
import { type RegisterForm } from '@/types/register'
import { type StudentData } from '@/types/student-data'
import { formatDateSafe } from '@/utils/date'
import { validateEmail } from '@/utils/email-validation'
import { validatePhone } from '@/utils/phone-validation'
import transformToStudentData from '@/utils/transform-student-data'

interface UserFormProps {
  form: UseFormReturn<RegisterForm>
}

const UserForm: React.FC<UserFormProps> = ({ form }) => {
  const router = useRouter()
  const { profile, isInit } = useLiffContext()
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [isCorrectEmail, setIsCorrectEmail] = useState(true)
  const [isCorrectPhone, setIsCorrectPhone] = useState(true)
  const [token, setToken] = useState<string | undefined>(undefined)
  const userId = profile?.userId

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        if (!userId) {
          throw new Error('User ID is undefined')
        }
        const token = await getAuthToken()
        if (!token) {
          throw new Error('Not authenticated')
        }
        setToken(token)
        const data = await getUser(userId, token)
        if (data.role === 'student') {
          const studentData = data as StudentData

          const [name, surname] = studentData.name.split(' ')

          form.reset({
            name,
            surname,
            birthDate: studentData.birthDate
              ? new Date(studentData.birthDate)
              : undefined,
            status: studentData.status,
            email: studentData.email,
            phone: studentData.phone,
            province: studentData.province,
            school: studentData.school,
            otherSource: studentData.otherSource,
            firstInterest: studentData.firstInterest,
            secondInterest: studentData.secondInterest,
            thirdInterest: studentData.thirdInterest,
            objective: studentData.objective,
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
    const requiredFields: (keyof RegisterForm)[] = [
      'name',
      'surname',
      'birthDate',
      'status',
      'email',
      'phone',
      'province',
      'school',
      'firstInterest',
      'secondInterest',
      'thirdInterest',
      'objective',
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
        const updates = transformToStudentData(values)
        await updateUser({
          id: userId ?? '',
          token: token ?? '',
          updates,
        })
        toast.dismiss(loadingToastId)
        router.push('/profile')
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
        <Image
          alt='logo'
          height={125}
          src={`${config.cdnURL}/assets/register/oph-logo.svg`}
          width={125}
        />
        <div className='flex flex-col items-center justify-center gap-0 font-mitr tracking-tight text-[#064E41]'>
          <div className='flex gap-1 text-xl font-medium'>
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
            <div>แก้ไขข้อมูล</div>
          </div>
          <div className='text-base font-light'>Registration Form</div>
        </div>
      </div>
      <div className='flex flex-col gap-4 bg-white px-3 py-3 font-mitr'>
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
            <div className='flex gap-2'>
              <div className='flex w-1/2 flex-col gap-1'>
                <div className='text-xs font-normal text-[#064E41]'>
                  วัน/เดือน/ปีเกิด<span className='text-[#FF0000]'>*</span>
                </div>
                <Controller
                  control={form.control}
                  {...form.register('birthDate')}
                  defaultValue={undefined}
                  render={({ field }) => (
                    <div className='relative'>
                      <Input
                        readOnly
                        className='h-9 border-[#064E41] text-sm font-light text-[#064E41] placeholder:text-[#064E41] placeholder:opacity-50 focus-visible:ring-[#064E41]'
                        name='birthDate'
                        placeholder='dd/mm/yyyy'
                        type='text'
                        value={formatDateSafe(field.value)}
                        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                      />
                      <CalendarIcon className='absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 transform opacity-50' />
                      {isCalendarOpen ? (
                        <div className='absolute z-10 mt-1'>
                          <Calendar
                            className='rounded-md border border-[#064E41]'
                            disabled={(date) => date > new Date()}
                            mode='single'
                            selected={field.value}
                            onSelect={(date: Date | undefined) => {
                              if (date) {
                                field.onChange(date)

                                // Remove red border when user selects value
                                const inputElement =
                                  document.querySelector(`[name="birthDate"]`)
                                if (inputElement) {
                                  inputElement.classList.remove(
                                    'border-red-500'
                                  )
                                }

                                setIsCalendarOpen(false)
                              }
                            }}
                          />
                        </div>
                      ) : null}
                    </div>
                  )}
                />
              </div>
              <div className='flex w-1/2 flex-col gap-1'>
                <div className='text-xs font-normal text-[#064E41]'>
                  สถานภาพ<span className='text-[#FF0000]'>*</span>
                </div>
                <Controller
                  control={form.control}
                  name='status'
                  render={({ field }) => (
                    <Select
                      defaultValue=''
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value)
                        // Remove red border when user selects value
                        const inputElement =
                          document.querySelector(`[name="status"]`)
                        if (inputElement) {
                          inputElement.classList.remove('border-red-500')
                        }
                      }}
                    >
                      <SelectTrigger
                        className='h-9 border-[#064E41] text-sm font-light text-[#064E41] focus:ring-[#064E41]'
                        name='status'
                      >
                        <SelectValue placeholder='สถานภาพ' />
                      </SelectTrigger>
                      <SelectContent
                        className='w-[var(--radix-select-trigger-width)]'
                        position='popper'
                        side='bottom'
                      >
                        {status.map((st) => (
                          <SelectItem key={st.th} value={st.th}>
                            {st.th}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
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
            <div className='flex flex-col gap-1'>
              <div className='text-xs font-normal text-[#064E41]'>
                จังหวัดที่อยู่ (ที่อยู่อาศัยปัจจุบัน)
                <span className='text-[#FF0000]'>*</span>
              </div>
              <Controller
                control={form.control}
                name='province'
                render={({ field }) => (
                  <Select
                    defaultValue=''
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value)
                      // Remove red border when user selects value
                      const inputElement =
                        document.querySelector(`[name="province"]`)
                      if (inputElement) {
                        inputElement.classList.remove('border-red-500')
                      }
                    }}
                  >
                    <SelectTrigger
                      className='h-9 w-1/2 border-[#064E41] text-sm font-light text-[#064E41] focus:ring-[#064E41]'
                      name='province'
                    >
                      <SelectValue placeholder='เลือกจังหวัดที่อยู่' />
                    </SelectTrigger>
                    <SelectContent position='popper' side='bottom'>
                      {provinces.map((province) => (
                        <SelectItem key={province.th} value={province.th}>
                          {province.th}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex gap-2 border-b border-[#064E41] pb-1'>
            <Image
              alt='person pin'
              height={20}
              src={`${config.cdnURL}/assets/register/school.svg`}
              width={20}
            />
            <div className='text-base font-normal text-[#064E41]'>การศึกษา</div>
          </div>
          <div className='flex flex-col gap-1 p-2'>
            <div className='text-xs font-normal text-[#064E41]'>
              สถานศึกษา<span className='text-[#FF0000]'>*</span>
            </div>
            <Input
              className='h-9 border-[#064E41] text-sm font-light text-[#064E41] placeholder:text-[#064E41] placeholder:opacity-50 focus-visible:ring-[#064E41]'
              placeholder='โรงเรียน'
              {...form.register('school')}
              name='school'
              onInput={(e) => {
                const inputElement = e.currentTarget
                inputElement.classList.remove('border-red-500')
              }}
            />
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex gap-2 border-b border-[#064E41] pb-1'>
            <Image
              alt='person pin'
              height={13}
              src={`${config.cdnURL}/assets/register/lightbulb.svg`}
              width={13}
            />
            <div className='text-base font-normal text-[#064E41]'>
              จัดอันดับคณะที่สนใจ
            </div>
          </div>
          <div className='flex flex-col gap-4 p-2'>
            <div className='flex items-center justify-center justify-between'>
              <div className='text-base font-light text-[#064E41]'>
                อันดับ 1<span className='text-[#FF0000]'>*</span>
              </div>
              <Controller
                control={form.control}
                name='firstInterest'
                render={({ field }) => (
                  <Select
                    defaultValue=''
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value)
                      // Remove red border when user selects value
                      const inputElement = document.querySelector(
                        `[name="firstInterest"]`
                      )
                      if (inputElement) {
                        inputElement.classList.remove('border-red-500')
                      }
                    }}
                  >
                    <SelectTrigger
                      className='h-9 w-3/4 border-[#064E41] text-sm font-light text-[#064E41] focus:ring-[#064E41]'
                      name='firstInterest'
                    >
                      <SelectValue placeholder='เลือกคณะที่สนใจ' />
                    </SelectTrigger>
                    <SelectContent
                      className='w-[var(--radix-select-trigger-width)]'
                      position='popper'
                      side='bottom'
                    >
                      {FacultyTH.map((faculty) => (
                        <SelectItem key={faculty} value={faculty}>
                          {faculty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className='flex items-center justify-center justify-between'>
              <div className='text-base font-light text-[#064E41]'>
                อันดับ 2<span className='text-[#FF0000]'>*</span>
              </div>
              <Controller
                control={form.control}
                name='secondInterest'
                render={({ field }) => (
                  <Select
                    defaultValue=''
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value)
                      // Remove red border when user selects value
                      const inputElement = document.querySelector(
                        `[name="secondInterest"]`
                      )
                      if (inputElement) {
                        inputElement.classList.remove('border-red-500')
                      }
                    }}
                  >
                    <SelectTrigger
                      className='h-9 w-3/4 border-[#064E41] text-sm font-light text-[#064E41] focus:ring-[#064E41]'
                      name='secondInterest'
                    >
                      <SelectValue placeholder='เลือกคณะที่สนใจ' />
                    </SelectTrigger>
                    <SelectContent
                      className='w-[var(--radix-select-trigger-width)]'
                      position='popper'
                      side='bottom'
                    >
                      {FacultyTH.map((faculty) => (
                        <SelectItem key={faculty} value={faculty}>
                          {faculty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className='flex items-center justify-center justify-between'>
              <div className='text-base font-light text-[#064E41]'>
                อันดับ 3<span className='text-[#FF0000]'>*</span>
              </div>
              <Controller
                control={form.control}
                name='thirdInterest'
                render={({ field }) => (
                  <Select
                    defaultValue=''
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value)
                      // Remove red border when user selects value
                      const inputElement = document.querySelector(
                        `[name="thirdInterest"]`
                      )
                      if (inputElement) {
                        inputElement.classList.remove('border-red-500')
                      }
                    }}
                  >
                    <SelectTrigger
                      className='h-9 w-3/4 border-[#064E41] text-sm font-light text-[#064E41] focus:ring-[#064E41]'
                      name='thirdInterest'
                    >
                      <SelectValue placeholder='เลือกคณะที่สนใจ' />
                    </SelectTrigger>
                    <SelectContent
                      className='w-[var(--radix-select-trigger-width)]'
                      position='popper'
                      side='bottom'
                    >
                      {FacultyTH.map((faculty) => (
                        <SelectItem key={faculty} value={faculty}>
                          {faculty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
          <div className='flex gap-2 border-b border-[#064E41] p-2 pb-1'>
            <div className='text-base font-normal text-[#064E41]'>
              จุดประสงค์ในการเข้าร่วม Open House
              <span className='text-[#FF0000]'>*</span>
            </div>
          </div>
          <Textarea
            className='mt-2 h-32 border-[#064E41] text-sm font-light text-[#064E41] placeholder:text-[#064E41] placeholder:opacity-50 focus-visible:ring-[#064E41]'
            placeholder='กรอกจุดประสงค์'
            {...form.register('objective')}
            name='objective'
            onInput={(e) => {
              const inputElement = e.currentTarget
              inputElement.classList.remove('border-red-500')
            }}
          />
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

export default UserForm
