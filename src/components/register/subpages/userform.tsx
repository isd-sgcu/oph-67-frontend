'use client'
import { CalendarIcon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { type UseFormReturn } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { Toaster } from 'react-hot-toast'

import { config } from '@/app/config'
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
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { faculties } from '@/const/faculties'
import { news } from '@/const/news'
import { provinces } from '@/const/province'
import translations from '@/const/register-title'
import { status } from '@/const/status'
import { type RegisterForm } from '@/types/register'
import { formatDateSafe } from '@/utils/date'
import { validateEmail } from '@/utils/email-validation'
import { validatePhone } from '@/utils/phone-validation'

import CheckBox from '../policy/checkbox'

interface UserFormProps {
  setStep: (value: number) => void
  form: UseFormReturn<RegisterForm>
}

const UserForm: React.FC<UserFormProps> = ({ setStep, form }) => {
  const [showOtherInput, setShowOtherInput] = useState(false)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [language, setLanguage] = useState<'th' | 'en'>('th')
  const [isCorrectEmail, setIsCorrectEmail] = useState(true)
  const [isCorrectPhone, setIsCorrectPhone] = useState(true)

  function onNext(): void {
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
      console.log(form.getValues())
      setStep(2)
    }
  }

  function onLanguageChange(): void {
    if (language === 'th') {
      setLanguage('en')
    } else {
      setLanguage('th')
    }
  }

  return (
    <div className='flex flex-col bg-white'>
      <Toaster
        position='top-center'
        toastOptions={{
          duration: 3000,
        }}
      />
      <div className='flex flex-col bg-[#FAE9F3]'>
        <div className='ml-auto mr-1.5 mt-2 flex w-auto items-center gap-2 rounded-md bg-white px-2.5 py-1.5'>
          <div className='font-anuphan text-sm font-semibold text-[#064E41]'>
            Switch to Eng ver.
          </div>
          <Switch onClick={() => onLanguageChange()} />
        </div>
        <div className='flex flex-col items-center justify-center gap-4 pb-6 pt-2'>
          <Image
            alt='logo'
            height={125}
            src={`${config.cdnURL}/assets/register/oph-logo.svg`}
            width={125}
          />
          <div className='flex flex-col items-center justify-center gap-0 font-mitr tracking-tight text-[#064E41]'>
            <div className='text-xl font-medium'>ลงทะเบียน</div>
            <div className='text-base font-light'>Registration Form</div>
          </div>
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
              {translations[language].information}
            </div>
          </div>
          <div className='flex flex-col gap-3 p-2'>
            <div className='flex flex-col gap-1'>
              <div className='text-xs font-normal text-[#064E41]'>
                {translations[language].name_surname.label}
                <span className='text-[#FF0000]'>*</span>
              </div>
              <div className='flex items-center justify-center gap-2'>
                <Input
                  className='h-9 border-[#064E41] text-sm font-light text-[#064E41] placeholder:text-[#064E41] placeholder:opacity-50 focus-visible:ring-[#064E41]'
                  placeholder={
                    translations[language].name_surname.placeholder_name
                  }
                  {...form.register('name')}
                  name='name'
                  onInput={(e) => {
                    const inputElement = e.currentTarget
                    inputElement.classList.remove('border-red-500')
                  }}
                />
                <Input
                  className='h-9 border-[#064E41] text-sm font-light text-[#064E41] placeholder:text-[#064E41] placeholder:opacity-50 focus-visible:ring-[#064E41]'
                  placeholder={
                    translations[language].name_surname.placeholder_surname
                  }
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
                  {translations[language].dob.label}
                  <span className='text-[#FF0000]'>*</span>
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
                        placeholder={translations[language].dob.placeholder}
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
                  {translations[language].status.label}
                  <span className='text-[#FF0000]'>*</span>
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
                        <SelectValue
                          placeholder={
                            translations[language].status.placeholder
                          }
                        />
                      </SelectTrigger>
                      <SelectContent
                        className='w-[var(--radix-select-trigger-width)]'
                        position='popper'
                        side='bottom'
                      >
                        {status.map((st) => (
                          <SelectItem key={st.th} value={st.th}>
                            {st[language]}
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
                  {translations[language].email.label}
                  <span className='text-[#FF0000]'>
                    *{' '}
                    {!isCorrectEmail
                      ? translations[language].email.invalid
                      : ''}
                  </span>
                </div>
                <Input
                  className='h-9 border-[#064E41] text-sm font-light text-[#064E41] placeholder:text-[#064E41] placeholder:opacity-50 focus-visible:ring-[#064E41]'
                  placeholder={translations[language].email.placeholder}
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
                  {translations[language].phone.label}
                  <span className='text-[#FF0000]'>
                    *{' '}
                    {!isCorrectPhone
                      ? translations[language].phone.invalid
                      : ''}
                  </span>
                </div>
                <Input
                  className='h-9 border-[#064E41] text-sm font-light text-[#064E41] placeholder:text-[#064E41] placeholder:opacity-50 focus-visible:ring-[#064E41]'
                  placeholder={translations[language].phone.placeholder}
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
                {translations[language].address.label}
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
                      <SelectValue
                        placeholder={translations[language].address.placeholder}
                      />
                    </SelectTrigger>
                    <SelectContent position='popper' side='bottom'>
                      {provinces.map((province) => (
                        <SelectItem key={province.th} value={province.th}>
                          {province[language]}
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
            <div className='text-base font-normal text-[#064E41]'>
              {translations[language].education}
            </div>
          </div>
          <div className='flex flex-col gap-1 p-2'>
            <div className='text-xs font-normal text-[#064E41]'>
              {translations[language].school.label}
              <span className='text-[#FF0000]'>*</span>
            </div>
            <Input
              className='h-9 border-[#064E41] text-sm font-light text-[#064E41] placeholder:text-[#064E41] placeholder:opacity-50 focus-visible:ring-[#064E41]'
              placeholder={translations[language].school.placeholder}
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
              {translations[language].selectedSource.label}
            </div>
          </div>
          <table className='w-full'>
            <tbody>
              <tr className='align-top'>
                <td className='h-full w-1/2'>
                  <div className='flex h-full flex-col justify-between'>
                    {news.slice(0, 3).map((option) => (
                      <label
                        key={option}
                        className='mb-1.5 flex items-center gap-1.5'
                      >
                        <CheckBox
                          isChecked={(
                            form.watch('selectedSources') ?? []
                          ).includes(option)}
                          setIsChecked={(checked) => {
                            const currentNews =
                              form.getValues('selectedSources') ?? []
                            if (checked) {
                              form.setValue('selectedSources', [
                                ...currentNews,
                                option,
                              ])
                            } else {
                              form.setValue(
                                'selectedSources',
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
                  </div>
                </td>
                <td className='h-full w-1/2'>
                  <div className='flex h-full flex-col justify-between'>
                    {news.slice(3).map((option) => (
                      <label
                        key={option}
                        className='mb-1.5 flex items-center gap-1.5'
                      >
                        <CheckBox
                          isChecked={(
                            form.watch('selectedSources') ?? []
                          ).includes(option)}
                          setIsChecked={(checked) => {
                            const currentNews =
                              form.getValues('selectedSources') ?? []
                            if (checked) {
                              form.setValue('selectedSources', [
                                ...currentNews,
                                option,
                              ])
                            } else {
                              form.setValue(
                                'selectedSources',
                                currentNews.filter((item) => item !== option)
                              )
                            }
                            if (option === 'Other') {
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
                        className={`h-4 w-9/12 rounded-none border-x-0 border-b border-t-0 border-[#064E41] bg-transparent px-1 text-xs font-light text-[#064E41] shadow-none placeholder:text-[#064E41] placeholder:opacity-50 focus-visible:border-b focus-visible:ring-0 ${showOtherInput ? 'visible' : 'invisible'}`}
                        type='text'
                        placeholder={
                          translations[language].selectedSource.other
                        }
                        {...form.register('otherSource')}
                      />
                    </div>
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
              src={`${config.cdnURL}/assets/register/lightbulb.svg`}
              width={13}
            />
            <div className='text-base font-normal text-[#064E41]'>
              {translations[language].interesting}
            </div>
          </div>
          <div className='flex flex-col gap-4 p-2'>
            <div className='flex items-center justify-center justify-between'>
              <div className='text-base font-light text-[#064E41]'>
                {translations[language].firstInterest.label}
                <span className='text-[#FF0000]'>*</span>
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
                      <SelectValue
                        placeholder={
                          translations[language].firstInterest.placeholder
                        }
                      />
                    </SelectTrigger>
                    <SelectContent
                      className='w-[var(--radix-select-trigger-width)]'
                      position='popper'
                      side='bottom'
                    >
                      {faculties.map((faculty) => (
                        <SelectItem key={faculty.th} value={faculty.th}>
                          {faculty[language]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className='flex items-center justify-center justify-between'>
              <div className='text-base font-light text-[#064E41]'>
                {translations[language].secondInterest.label}
                <span className='text-[#FF0000]'>*</span>
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
                      <SelectValue
                        placeholder={
                          translations[language].secondInterest.placeholder
                        }
                      />
                    </SelectTrigger>
                    <SelectContent
                      className='w-[var(--radix-select-trigger-width)]'
                      position='popper'
                      side='bottom'
                    >
                      {faculties.map((faculty) => (
                        <SelectItem key={faculty.th} value={faculty.th}>
                          {faculty[language]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className='flex items-center justify-center justify-between'>
              <div className='text-base font-light text-[#064E41]'>
                {translations[language].thirdInterest.label}
                <span className='text-[#FF0000]'>*</span>
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
                      <SelectValue
                        placeholder={
                          translations[language].thirdInterest.placeholder
                        }
                      />
                    </SelectTrigger>
                    <SelectContent
                      className='w-[var(--radix-select-trigger-width)]'
                      position='popper'
                      side='bottom'
                    >
                      {faculties.map((faculty) => (
                        <SelectItem key={faculty.th} value={faculty.th}>
                          {faculty[language]}
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
              {translations[language].objective.label}
              <span className='text-[#FF0000]'>*</span>
            </div>
          </div>
          <Textarea
            className='mt-2 h-32 border-[#064E41] text-sm font-light text-[#064E41] placeholder:text-[#064E41] placeholder:opacity-50 focus-visible:ring-[#064E41]'
            placeholder={translations[language].objective.placeholder}
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
          {translations[language].register}
        </Button>
      </div>
    </div>
  )
}

export default UserForm
