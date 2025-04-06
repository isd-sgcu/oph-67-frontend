'use client'
import Image from 'next/image'
import Link from 'next/link'
import { type UseFormReturn } from 'react-hook-form'

import FaceRating from '@/components/evaluation-form/face-rating'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { evaluationQuestions } from '@/types/evaluation-questions'
import { type EvaluationForm } from '@/types/evaluation-schema'

interface EvaluationFormProps {
  setStep: (value: number) => void
  form: UseFormReturn<EvaluationForm>
}

const EvaluationForm3: React.FC<EvaluationFormProps> = ({ setStep, form }) => {
  function onBack(): void {
    console.log('Back button clicked')
  }

  function onNext(): void {
    const values = form.getValues()
    const requiredFields: (keyof EvaluationForm)[] = [
      'q21',
      'q22',
      'q23',
      'q24',
      'q25',
      'q26',
    ]
    // let isFormValid = true
    let firstInvalidField: HTMLElement | null = null
    requiredFields.forEach((field) => {
      const inputElement = document.querySelector(`[name="${field}"]`)
      if (!values[field]) {
        // isFormValid = false
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
    // if (!isCorrectEmail) {
    //   isFormValid = false
    //   const emailElement = document.querySelector(`[name="email"]`)
    //   if (emailElement) {
    //     emailElement.classList.add('border-red-500')
    //     firstInvalidField = emailElement as HTMLElement
    //   }
    // }
    // // Check if the phone number is valid
    // if (!isCorrectPhone) {
    //   isFormValid = false
    //   const phoneElement = document.querySelector(`[name="phone"]`)
    //   if (phoneElement) {
    //     phoneElement.classList.add('border-red-500')
    //     firstInvalidField = phoneElement as HTMLElement
    //   }
    // }
    // if (!isFormValid && firstInvalidField) {
    //   firstInvalidField.scrollIntoView({
    //     behavior: 'smooth',
    //     block: 'center',
    //   })
    //   console.log('Form is invalid')
    // } else {
    //   console.log(form.getValues())
    //   setStep(2)
    // }
    console.log(form.getValues())
    console.log('eiei3555555555555555')
    setStep(4)
  }

  return (
    <div className='flex flex-col bg-white px-3 py-3 font-mitr'>
      <div className='flex gap-2 border-b border-[#064E41] pb-1'>
        <Image
          alt='write-icon'
          height={20}
          src='/assets/evaluation-form/write-icon.svg'
          width={20}
        />
        <div className='text-base font-medium text-[#064E41]'>
          {evaluationQuestions.part2.title}
        </div>
      </div>
      <div className='flex flex-col gap-2 p-2'>
        {evaluationQuestions.part3.questions.slice(0, 2).map((question) => (
          <FaceRating
            key={question.id}
            field={question.id}
            form={form}
            question={question.label}
          />
        ))}
        <div className='mb-4 flex flex-col gap-2 pt-2 font-mitr text-[#064E41]'>
          <div className='text-sm font-normal text-[#064E41]'>
            {evaluationQuestions.part3.questions[2].label}
            <span className='text-[#FF0000]'>*</span>
          </div>
          <Textarea
            className='h-32 border-[#064E41] text-sm font-light text-[#064E41] placeholder:text-[#064E41] placeholder:opacity-50 focus-visible:ring-[#064E41]'
            placeholder='กรอกข้อเสนอแนะ'
            {...form.register('q33')}
            name='q33'
            onInput={(e) => {
              const inputElement = e.currentTarget
              inputElement.classList.remove('border-red-500')
            }}
          />
        </div>
        <div className='flex flex-col items-center justify-center gap-2.5 font-mitr font-normal text-[#064E41]'>
          <div className='flex items-center justify-center gap-2'>
            <p className='text-xs'>ติดตาม Instagram :</p>
            <Link href='https://www.instagram.com/chulaforall/'>
              <div className='flex items-center justify-center gap-1 rounded-lg bg-[#076855] px-1.5 py-1'>
                <Image
                  alt='link'
                  height={16}
                  src='/assets/evaluation-form/link.svg'
                  width={16}
                />
                <p className='text-[8px] font-light text-white'>
                  https://www.instagram.com/chulaforall/
                </p>
              </div>
            </Link>
          </div>
          <p className='text-xs'>โปรดกรอก Instagram Username ที่ใช้ติดตาม </p>
          <div className='flex w-2/3 items-center justify-center gap-2'>
            <p className='aspect-square h-10 w-10 rounded-lg border border-[#064E41] pt-0.5 text-center text-2xl'>
              @
            </p>
            <Input
              className='h-9 border-[#064E41] text-sm font-light text-[#064E41] placeholder:text-[#064E41] placeholder:opacity-50 focus-visible:ring-[#064E41]'
              placeholder='your_username'
              {...form.register('igusername')}
              name='igusername'
              onInput={(e) => {
                const inputElement = e.currentTarget
                inputElement.classList.remove('border-red-500')
              }}
            />
          </div>
          <p className='text-xs font-light text-[#FF0000]'>
            *ระบบจะตรวจสอบอัตโนมัติ โปรดกรอกให้ถูกต้อง
          </p>
        </div>
        <div className='mt-6 flex w-full items-center justify-center gap-4'>
          <Button
            className='mb-20 w-1/4 font-cloud-soft text-xl font-normal'
            size='sm'
            variant='filled'
            onClick={onBack}
          >
            กลับ
          </Button>
          <Button
            className='mb-20 w-1/4 font-cloud-soft text-xl font-normal'
            size='sm'
            variant='filled'
            onClick={onNext}
          >
            ส่ง
          </Button>
        </div>
      </div>
    </div>
  )
}

export default EvaluationForm3
