'use client'
import Image from 'next/image'
import Link from 'next/link'
import { type UseFormReturn } from 'react-hook-form'
import { toast } from 'react-hot-toast'

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
    setStep(2)
  }

  function onNext(): void {
    const values = form.getValues()

    const requiredFields: (keyof EvaluationForm)[] =
      evaluationQuestions.part3.questions
        .slice(0, 4)
        .map((question) => question.id) as (keyof EvaluationForm)[]

    let isFormValid = true
    let firstInvalidField: HTMLElement | null = null
    requiredFields.forEach((field) => {
      const inputElement = document.querySelector(`[data-name="${field}"]`)
      if (!values[field]) {
        isFormValid = false
        if (inputElement) {
          if (!firstInvalidField) {
            firstInvalidField = inputElement as HTMLElement
          }
        }
      }
    })

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- Reason: This is a necessary check to ensure the form is valid before proceeding.
    if (!isFormValid && firstInvalidField) {
      ;(firstInvalidField as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
      toast.error('กรุณากรอกแบบประเมินให้ครบถ้วน')
      console.log('Form is invalid')
    } else {
      console.log(form.getValues())
      setStep(4)
      sessionStorage.clear()
    }
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
          {evaluationQuestions.part3.title}
        </div>
      </div>
      <div className='flex flex-col gap-2 p-2'>
        {evaluationQuestions.part3.questions.slice(0, 2).map((question) => (
          <div key={question.id} data-name={question.id}>
            <FaceRating
              field={question.id}
              form={form}
              question={question.label}
            />
          </div>
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
            data-name='q33'
            defaultValue={sessionStorage.getItem('q33') ?? ''}
            onInput={(e) => {
              sessionStorage.setItem('q33', e.currentTarget.value)
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
          <p className='text-xs'>
            {evaluationQuestions.part3.questions[3].label}
          </p>
          <div className='flex w-2/3 items-center justify-center gap-2'>
            <p className='aspect-square h-10 w-10 rounded-lg border border-[#064E41] pt-0.5 text-center text-2xl'>
              @
            </p>
            <Input
              className='h-9 border-[#064E41] text-sm font-light text-[#064E41] placeholder:text-[#064E41] placeholder:opacity-50 focus-visible:ring-[#064E41]'
              placeholder='your_username'
              {...form.register('igusername')}
              data-name='igusername'
              defaultValue={sessionStorage.getItem('igusername') ?? ''}
              onInput={(e) => {
                sessionStorage.setItem('igusername', e.currentTarget.value)
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
