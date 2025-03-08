'use client'
import { CalendarIcon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { type UseFormReturn } from 'react-hook-form'
import { Controller } from 'react-hook-form'

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
import { news } from '@/const/news'
import { provinces } from '@/const/province'
import { status } from '@/const/status'
import { type RegisterForm } from '@/types/register'
import { formatDateSafe } from '@/utils/date'

import CheckBox from '../policy/checkbox'

interface UserFormProps {
  setStep: (value: number) => void
  form: UseFormReturn<RegisterForm>
}

const UserForm: React.FC<UserFormProps> = ({ setStep, form }) => {
  const [showOtherInput, setShowOtherInput] = useState(false)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  function onNext(): void {
    const values = form.getValues()
    const requiredFields: (keyof RegisterForm)[] = [
      'name',
      'surname',
      'dob',
      'status',
      'email',
      'province',
      'school',
      'faculty1',
      'faculty2',
      'faculty3',
      'purpose',
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

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- เหตุผล: ค่า someVariable อาจมีการเปลี่ยนแปลงแบบ asynchronous ที่ไม่สามารถตรวจจับได้
    if (!isFormValid && firstInvalidField) {
      ;(firstInvalidField as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
      console.log('Form is invalid')
    } else {
      console.log(form.getValues())
      setStep(2)
    }
  }

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col items-center justify-center gap-2 bg-[#FAE9F3] py-6'>
        <Image
          alt='logo'
          height={125}
          src='/assets/register/oph-logo.svg'
          width={125}
        />
        <div className='flex flex-col items-center justify-center gap-0 font-mitr tracking-tight text-[#064E41]'>
          <div className='text-xl font-medium'>ลงทะเบียน</div>
          <div className='text-base font-light'>Registration Form</div>
        </div>
      </div>
      <div className='flex flex-col gap-4 px-3 py-3 font-mitr'>
        <div className='flex flex-col gap-2'>
          <div className='flex gap-2 border-b border-[#064E41] pb-1'>
            <Image
              alt='person pin'
              height={20}
              src='/assets/register/person-pin.svg'
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
                  {...form.register('dob')}
                  defaultValue={undefined}
                  render={({ field }) => (
                    <div className='relative'>
                      <Input
                        readOnly
                        className='h-9 border-[#064E41] text-sm font-light text-[#064E41] placeholder:text-[#064E41] placeholder:opacity-50 focus-visible:ring-[#064E41]'
                        name='dob'
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
                                  document.querySelector(`[name="dob"]`)
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
                          <SelectItem key={st} value={st}>
                            {st}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
            <div className='flex flex-col gap-1'>
              <div className='text-xs font-normal text-[#064E41]'>
                Email<span className='text-[#FF0000]'>*</span>
              </div>
              <Input
                className='h-9 border-[#064E41] text-sm font-light text-[#064E41] placeholder:text-[#064E41] placeholder:opacity-50 focus-visible:ring-[#064E41]'
                placeholder='@email.com'
                {...form.register('email')}
                name='email'
                onInput={(e) => {
                  const inputElement = e.currentTarget
                  inputElement.classList.remove('border-red-500')
                }}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <div className='text-xs font-normal text-[#064E41]'>
                จังหวัดที่อยู่<span className='text-[#FF0000]'>*</span>
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
                        document.querySelector(`[name="status"]`)
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
                        <SelectItem key={province} value={province}>
                          {province}
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
              src='/assets/register/school.svg'
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
          <div className='flex gap-2 border-b border-[#064E41] p-2 pb-1'>
            <div className='text-base font-normal text-[#064E41]'>
              ทราบข่าวการประชาสัมพันธ์ได้อย่างไร?
            </div>
          </div>
          <table className='w-full'>
            <tbody>
              <tr>
                <td className='w-1/2'>
                  {news.slice(0, 3).map((option) => (
                    <label
                      key={option}
                      className='mb-1.5 flex items-center gap-1.5'
                    >
                      <CheckBox
                        isChecked={(form.watch('news') ?? []).includes(option)}
                        setIsChecked={(checked) => {
                          const currentNews = form.getValues('news') ?? []
                          if (checked) {
                            form.setValue('news', [...currentNews, option])
                          } else {
                            form.setValue(
                              'news',
                              currentNews.filter((item) => item !== option)
                            )
                          }
                        }}
                      />
                      <span className='text-sm font-light leading-4 text-[#064E41]'>
                        {option}
                      </span>
                    </label>
                  ))}
                </td>
                <td className='w-1/2'>
                  {news.slice(3).map((option) => (
                    <label
                      key={option}
                      className='mb-1.5 flex items-center gap-1.5'
                    >
                      <CheckBox
                        isChecked={(form.watch('news') ?? []).includes(option)}
                        setIsChecked={(checked) => {
                          const currentNews = form.getValues('news') ?? []
                          if (checked) {
                            form.setValue('news', [...currentNews, option])
                          } else {
                            form.setValue(
                              'news',
                              currentNews.filter((item) => item !== option)
                            )
                          }
                          if (option === 'อื่น ๆ') {
                            setShowOtherInput(checked)
                          }
                        }}
                      />
                      <span className='text-sm font-light leading-4 text-[#064E41]'>
                        {option}
                      </span>
                    </label>
                  ))}
                  <div className='flex gap-2'>
                    <div className='flex w-1/12' />
                    <Input
                      className={`w-9/12 border-x-0 border-b border-t-0 border-[#064E41] bg-transparent text-sm font-light text-[#064E41] placeholder:text-[#064E41] placeholder:opacity-50 focus-visible:border-b focus-visible:ring-0 ${showOtherInput ? 'visible' : 'invisible'}`}
                      placeholder='โปรดระบุ'
                      type='text'
                      {...form.register('otherNews')}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex gap-2 border-b border-[#064E41] pb-1'>
            <Image
              alt='person pin'
              height={13}
              src='/assets/register/lightbulb.svg'
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
                name='faculty1'
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
                      className='h-9 w-3/4 border-[#064E41] text-sm font-light text-[#064E41] focus:ring-[#064E41]'
                      name='faculty1'
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
                name='faculty2'
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
                      className='h-9 w-3/4 border-[#064E41] text-sm font-light text-[#064E41] focus:ring-[#064E41]'
                      name='faculty2'
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
                name='faculty3'
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
                      className='h-9 w-3/4 border-[#064E41] text-sm font-light text-[#064E41] focus:ring-[#064E41]'
                      name='faculty3'
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
            {...form.register('purpose')}
            name='purpose'
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
          ลงทะเบียน
        </Button>
      </div>
    </div>
  )
}

export default UserForm
