'use client'
import Image from 'next/image'
import { type UseFormReturn } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { yearMap } from '@/const/staff-year'
import { statusMap } from '@/const/status-staff'
import { type AdminRegisterForm } from '@/types/admin-register'

interface UserFormProps {
  setStep: (value: number) => void
  form: UseFormReturn<AdminRegisterForm>
}

const AdminForm: React.FC<UserFormProps> = ({ setStep, form }) => {
  function onNext(): void {
    const values = form.getValues()
    const requiredFields: (keyof AdminRegisterForm)[] = [
      'name',
      'surname',
      'nickname',
      'status',
      'email',
      'tel',
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
            <div className='flex flex-col gap-1'>
              <div className='text-xs font-normal text-[#064E41]'>
                ชื่อเล่น<span className='text-[#FF0000]'>*</span>
              </div>
              <input
                className='h-9 w-full rounded-md border border-[#064E41] p-2.5 text-sm font-light text-[#064E41] placeholder-[#064E41] placeholder-opacity-50 focus:outline-none focus:ring-1 focus:ring-[#064E41]'
                placeholder='ชื่อเล่น'
                {...form.register('nickname')}
                name='nickname'
              />
            </div>
            <div className='flex gap-2'>
              <div className='flex w-1/2 flex-col gap-1'>
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
              </div>
              <div className='flex w-1/2 flex-col gap-1'>
                <div className='flex flex-col gap-1'>
                  <div className='text-xs font-normal text-[#064E41]'>
                    เบอร์ติดต่อ<span className='text-[#FF0000]'>*</span>
                  </div>
                  <input
                    className='h-9 w-full rounded-md border border-[#064E41] p-2.5 text-sm font-light text-[#064E41] placeholder-[#064E41] placeholder-opacity-50 focus:outline-none focus:ring-1 focus:ring-[#064E41]'
                    placeholder='xxx-xxx-xxxx'
                    {...form.register('tel')}
                    name='tel'
                  />
                </div>
              </div>
            </div>
            <div className='flex gap-2'>
              <div className='flex w-full flex-col gap-1'>
                <div className='text-xs font-normal text-[#064E41]'>
                  สถานภาพ Staff<span className='text-[#FF0000]'>*</span>
                </div>
                <div className='flex items-center justify-center gap-2'>
                  <select
                    className='h-9 w-full rounded-md border border-[#064E41] p-1 text-sm font-light text-[#064E41] placeholder-opacity-50 focus:outline-none focus:ring-1 focus:ring-[#064E41]'
                    {...form.register('status')}
                    defaultValue=''
                    name='status'
                  >
                    <option disabled value=''>
                      Staff
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
            <div className='flex gap-2'>
              <div className='flex w-full flex-col gap-1'>
                <div className='text-xs font-normal text-[#064E41]'>
                  ชั้นปี<span className='text-[#FF0000]'>*</span>
                </div>
                <div className='flex items-center justify-center gap-2'>
                  <select
                    className='h-9 w-full rounded-md border border-[#064E41] p-1 text-sm font-light text-[#064E41] placeholder-opacity-50 focus:outline-none focus:ring-1 focus:ring-[#064E41]'
                    {...form.register('year')}
                    defaultValue=''
                    name='year'
                  >
                    <option disabled value=''>
                      ชั้นปี
                    </option>
                    {Object.entries(yearMap).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
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

export default AdminForm
