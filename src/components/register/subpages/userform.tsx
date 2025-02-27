'use client'
import Image from 'next/image'
import { useState } from 'react'
import { type UseFormReturn } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { FacultyTH } from '@/const/faculties'
import { news } from '@/const/news'
import { provinces } from '@/const/province'
import { statusMap } from '@/const/status'
import { type RegisterForm } from '@/schema/register'

import CheckBox from '../policy/checkbox'

interface UserFormProps {
  setStep: (value: number) => void
  form: UseFormReturn<RegisterForm>
}

const UserForm: React.FC<UserFormProps> = ({ setStep, form }) => {
  const [showOtherInput, setShowOtherInput] = useState(false)

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
                <input
                  className='h-9 w-full rounded-md border border-[#064E41] p-2.5 text-sm font-light text-[#064E41] placeholder-[#064E41] placeholder-opacity-50 focus:outline-none focus:ring-1 focus:ring-[#064E41]'
                  placeholder='ชื่อ'
                  {...form.register('name')}
                  name='name'
                />
                <input
                  className='h-9 w-full rounded-md border border-[#064E41] p-2.5 text-sm font-light text-[#064E41] placeholder-[#064E41] placeholder-opacity-50 focus:outline-none focus:ring-1 focus:ring-[#064E41]'
                  placeholder='นามสกุล'
                  {...form.register('surname')}
                  name='surname'
                />
              </div>
            </div>
            <div className='flex gap-2'>
              <div className='flex w-1/2 flex-col gap-1'>
                <div className='text-xs font-normal text-[#064E41]'>
                  วัน/เดือน/ปีเกิด<span className='text-[#FF0000]'>*</span>
                </div>
                <label className='flex cursor-pointer items-center justify-center gap-2'>
                  <input
                    className='h-9 w-full rounded-md border border-[#064E41] p-2.5 text-sm font-light text-[#064E41] placeholder-[#064E41] placeholder-opacity-50 focus:outline-none focus:ring-1 focus:ring-[#064E41]'
                    placeholder='dd/mm/yy'
                    type='date'
                    {...form.register('dob')}
                    name='dob'
                  />
                </label>
              </div>
              <div className='flex w-1/2 flex-col gap-1'>
                <div className='text-xs font-normal text-[#064E41]'>
                  สถานภาพ<span className='text-[#FF0000]'>*</span>
                </div>
                <div className='flex items-center justify-center gap-2'>
                  <select
                    className='h-9 w-full rounded-md border border-[#064E41] p-1 text-sm font-light text-[#064E41] placeholder-opacity-50 focus:outline-none focus:ring-1 focus:ring-[#064E41]'
                    {...form.register('status')}
                    defaultValue=''
                    name='status'
                  >
                    <option disabled value=''>
                      สถานภาพ
                    </option>
                    {Object.entries(statusMap).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-1'>
              <div className='text-xs font-normal text-[#064E41]'>
                Email<span className='text-[#FF0000]'>*</span>
              </div>
              <input
                className='h-9 w-full rounded-md border border-[#064E41] p-2.5 text-sm font-light text-[#064E41] placeholder-[#064E41] placeholder-opacity-50 focus:outline-none focus:ring-1 focus:ring-[#064E41]'
                placeholder='@email.com'
                {...form.register('email')}
                name='email'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <div className='text-xs font-normal text-[#064E41]'>
                จังหวัดที่อยู่<span className='text-[#FF0000]'>*</span>
              </div>
              <select
                className='h-9 w-1/2 rounded-md border border-[#064E41] p-1 text-sm font-light text-[#064E41] placeholder-[#064E41] placeholder-opacity-50 focus:outline-none focus:ring-1 focus:ring-[#064E41]'
                {...form.register('province')}
                defaultValue=''
                name='province'
              >
                <option disabled value=''>
                  เลือกจังหวัดที่อยู่
                </option>
                {provinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
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
            <input
              className='h-9 w-full rounded-md border border-[#064E41] p-2.5 text-sm font-light text-[#064E41] placeholder-[#064E41] placeholder-opacity-50 focus:outline-none focus:ring-1 focus:ring-[#064E41]'
              placeholder='โรงเรียน'
              {...form.register('school')}
              name='school'
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
                    <input
                      className={`w-9/12 border-b border-[#064E41] bg-transparent text-sm font-light text-[#064E41] placeholder-[#064E41] placeholder-opacity-50 focus:outline-none focus:ring-0 ${showOtherInput ? 'visible' : 'invisible'}`}
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
              <select
                className='h-9 w-3/4 rounded-md border border-[#064E41] p-1 text-sm font-light text-[#064E41] placeholder-[#064E41] placeholder-opacity-50 focus:outline-none focus:ring-1 focus:ring-[#064E41]'
                {...form.register('faculty1')}
                defaultValue=''
                name='faculty1'
              >
                <option disabled value=''>
                  เลือกคณะที่สนใจ
                </option>
                {FacultyTH.map((faculty) => (
                  <option key={faculty} value={faculty}>
                    {faculty}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex items-center justify-center justify-between'>
              <div className='text-base font-light text-[#064E41]'>
                อันดับ 2<span className='text-[#FF0000]'>*</span>
              </div>
              <select
                className='h-9 w-3/4 rounded-md border border-[#064E41] p-1 text-sm font-light text-[#064E41] placeholder-[#064E41] placeholder-opacity-50 focus:outline-none focus:ring-1 focus:ring-[#064E41]'
                {...form.register('faculty2')}
                defaultValue=''
                name='faculty2'
              >
                <option disabled value=''>
                  เลือกคณะที่สนใจ
                </option>
                {FacultyTH.map((faculty) => (
                  <option key={faculty} value={faculty}>
                    {faculty}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex items-center justify-center justify-between'>
              <div className='text-base font-light text-[#064E41]'>
                อันดับ 3<span className='text-[#FF0000]'>*</span>
              </div>
              <select
                className='h-9 w-3/4 rounded-md border border-[#064E41] p-1 text-sm font-light text-[#064E41] placeholder-[#064E41] placeholder-opacity-50 focus:outline-none focus:ring-1 focus:ring-[#064E41]'
                {...form.register('faculty3')}
                defaultValue=''
                name='faculty3'
              >
                <option disabled value=''>
                  เลือกคณะที่สนใจ
                </option>
                {FacultyTH.map((faculty) => (
                  <option key={faculty} value={faculty}>
                    {faculty}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='flex gap-2 border-b border-[#064E41] p-2 pb-1'>
            <div className='text-base font-normal text-[#064E41]'>
              จุดประสงค์ในการเข้าร่วม Open House
              <span className='text-[#FF0000]'>*</span>
            </div>
          </div>
          <textarea
            className='mt-2 h-32 w-full rounded-md border border-[#064E41] p-2.5 text-sm font-light text-[#064E41] placeholder-[#064E41] placeholder-opacity-50 focus:outline-none focus:ring-1 focus:ring-[#064E41]'
            placeholder='กรอกจุดประสงค์'
            {...form.register('purpose')}
            name='purpose'
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
