'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { type UseFormReturn } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import {
  type EvaluationData,
  submitEvaluation,
} from '@/app/actions/evaluation/post-evaluation'
import FaceRating from '@/components/evaluation-form/face-rating'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useEvaluationStore } from '@/hooks/use-eval'
import { evaluationQuestions } from '@/types/evaluation-questions'
import { type EvaluationForm } from '@/types/evaluation-schema'

interface EvaluationFormProps {
  setStep: (value: number) => void
  form: UseFormReturn<EvaluationForm>
}

const EvaluationForm3: React.FC<EvaluationFormProps> = ({ setStep, form }) => {
  const { formData, setFormValue, clearForm } = useEvaluationStore()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize form with data from store
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      // Set form values from store
      evaluationQuestions.part3.questions.slice(0, 2).forEach((question) => {
        const fieldId = question.id as keyof EvaluationForm
        if (formData[fieldId]) {
          form.setValue(fieldId, formData[fieldId])
        }
      })

      if (formData.q33) form.setValue('q33', formData.q33)
      if (formData.igusername) form.setValue('igusername', formData.igusername)
    }
  }, [formData, form])

  function onBack(): void {
    setStep(3)
  }

  async function onNext(): Promise<void> {
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
      try {
        setIsSubmitting(true)
        const formValues = form.getValues()

        // Map form values to API expected format
        const mappedFormData: EvaluationData = {
          newSources: formValues.q11 ?? [],
          overallActivity: formValues.q12,
          interestActivity: formValues.q13,
          receivedFacultyInfoClearly: formValues.q14,
          wouldRecommendCUOpenHouseNextTime: formValues.q15,
          favoriteBooth: formValues.q16 ?? '',
          activityDiversity: formValues.q21,
          perceivedCrowdDensity: formValues.q22,
          hasFullBoothAccess: formValues.q23,
          facilityConvenienceRating: formValues.q24,
          campusNavigationRating: formValues.q25,
          hesitationLevelAfterDisaster: formValues.q26,
          lineOASignupRating: formValues.q31,
          designBeautyRating: formValues.q32,
          websiteImprovementSuggestions: formValues.q33,
          igusername: formValues.igusername,
        }

        const result = await submitEvaluation(mappedFormData)

        if (result.success) {
          toast.success(result.message)
          setStep(5)
          clearForm()
        } else {
          toast.error(result.message)
        }
      } catch (error) {
        console.error('Error submitting evaluation:', error)
        toast.error('เกิดข้อผิดพลาดในการส่งแบบประเมิน โปรดลองอีกครั้ง')
      } finally {
        setIsSubmitting(false)
      }
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
              onRatingChange={(rating) => {
                setFormValue(question.id as keyof EvaluationForm, rating)
              }}
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
            {...form.register('q33', {
              onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setFormValue('q33', e.target.value),
            })}
            data-name='q33'
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
              {...form.register('igusername', {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormValue('igusername', e.target.value),
              })}
              data-name='igusername'
            />
          </div>
          <p className='text-xs font-light text-[#FF0000]'>
            *ระบบจะตรวจสอบอัตโนมัติ โปรดกรอกให้ถูกต้อง
          </p>
        </div>
        <div className='mt-6 flex w-full items-center justify-center gap-4'>
          <Button
            className='mb-20 w-1/4 font-cloud-soft text-xl font-normal'
            disabled={isSubmitting}
            size='sm'
            variant='filled'
            onClick={onBack}
          >
            กลับ
          </Button>
          <Button
            className='mb-20 w-1/4 font-cloud-soft text-xl font-normal'
            disabled={isSubmitting}
            size='sm'
            variant='filled'
            onClick={onNext}
          >
            {isSubmitting ? 'กำลังส่ง...' : 'ส่ง'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default EvaluationForm3
