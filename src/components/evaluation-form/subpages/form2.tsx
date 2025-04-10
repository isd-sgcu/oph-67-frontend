'use client'
import Image from 'next/image'
import { useEffect } from 'react'
import { type UseFormReturn } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import FaceRating from '@/components/evaluation-form/face-rating'
import { Button } from '@/components/ui/button'
import { useEvaluationStore } from '@/hooks/use-eval'
import { evaluationQuestions } from '@/types/evaluation-questions'
import { type EvaluationForm } from '@/types/evaluation-schema'

interface EvaluationFormProps {
  setStep: (value: number) => void
  form: UseFormReturn<EvaluationForm>
}

const EvaluationForm2: React.FC<EvaluationFormProps> = ({ setStep, form }) => {
  const { formData, setFormValue } = useEvaluationStore()

  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      evaluationQuestions.part2.questions.forEach((question) => {
        const fieldId = question.id as keyof EvaluationForm
        if (formData[fieldId]) {
          form.setValue(fieldId, formData[fieldId])
        }
      })
    }
  }, [formData, form])

  function onBack(): void {
    setStep(1)
  }

  function onNext(): void {
    const values = form.getValues()

    const requiredFields: (keyof EvaluationForm)[] =
      evaluationQuestions.part2.questions
        .slice(0, 6)
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
      setStep(3)
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
          {evaluationQuestions.part2.title}
        </div>
      </div>
      <div className='flex flex-col gap-2 p-2'>
        {evaluationQuestions.part2.questions.map((question) => (
          <div key={question.id} data-name={question.id}>
            <FaceRating
              field={question.id}
              form={form}
              question={question.label}
              onRatingChange={(rating) => {
                setFormValue(question.id as keyof EvaluationForm, rating)
              }}
            />
          </div>
        ))}
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
            ถัดไป
          </Button>
        </div>
      </div>
    </div>
  )
}

export default EvaluationForm2
