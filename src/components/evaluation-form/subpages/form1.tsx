'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { type UseFormReturn } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import FaceRating from '@/components/evaluation-form/face-rating'
import CheckBox from '@/components/register/policy/checkbox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { news } from '@/const/evalution-news'
import { useEvaluationStore } from '@/hooks/use-eval'
import { evaluationQuestions } from '@/types/evaluation-questions'
import { type EvaluationForm } from '@/types/evaluation-schema'

interface EvaluationFormProps {
  setStep: (value: number) => void
  form: UseFormReturn<EvaluationForm>
}

const EvaluationForm1: React.FC<EvaluationFormProps> = ({ setStep, form }) => {
  const [showOtherInput, setShowOtherInput] = useState(false)
  const { formData, setFormValue } = useEvaluationStore()

  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      if (formData.q11) form.setValue('q11', formData.q11)
      if (formData.q11_other) form.setValue('q11_other', formData.q11_other)
      if (formData.q12) form.setValue('q12', formData.q12)
      if (formData.q13) form.setValue('q13', formData.q13)
      if (formData.q14) form.setValue('q14', formData.q14)
      if (formData.q15) form.setValue('q15', formData.q15)
      if (formData.q16) form.setValue('q16', formData.q16)
      if (formData.q11?.includes('อื่น ๆ (โปรดระบุ)')) {
        setShowOtherInput(true)
      }
    }
  }, [formData, form])

  function onBack(): void {
    // TODO: implement onback function
  }

  function onNext(): void {
    const values = form.getValues()

    const requiredFields: (keyof EvaluationForm)[] =
      evaluationQuestions.part1.questions
        .slice(0, 5)
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
      setStep(2)
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
          {evaluationQuestions.part1.title}
        </div>
      </div>
      <div className='flex flex-col gap-2 p-2'>
        <div className='text-sm font-normal text-[#064E41]'>
          {evaluationQuestions.part1.questions[0].label}
          <span className='text-[#FF0000]'>*</span>
        </div>
        <table className='w-full'>
          <tbody>
            <tr className='align-top'>
              <td className='h-full w-1/2'>
                <div className='flex h-full flex-col justify-between'>
                  {news.slice(0, 4).map((option) => (
                    <label
                      key={option}
                      className='mb-1.5 flex items-center gap-1.5'
                      data-name='q11'
                    >
                      <CheckBox
                        isChecked={(form.watch('q11') ?? []).includes(option)}
                        setIsChecked={(checked) => {
                          const currentNews = form.getValues('q11') ?? []
                          if (checked) {
                            const updatedNews = [...currentNews, option]
                            form.setValue('q11', updatedNews)
                            setFormValue('q11', updatedNews)
                          } else {
                            const updatedNews = currentNews.filter(
                              (item) => item !== option
                            )
                            form.setValue('q11', updatedNews)
                            setFormValue('q11', updatedNews)
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
                  {news.slice(4).map((option) => (
                    <label
                      key={option}
                      className='mb-1.5 flex items-center gap-1.5'
                      data-name='q11'
                    >
                      <CheckBox
                        isChecked={(form.watch('q11') ?? []).includes(option)}
                        setIsChecked={(checked) => {
                          const currentNews = form.getValues('q11') ?? []
                          if (checked) {
                            const updatedNews = [...currentNews, option]
                            form.setValue('q11', updatedNews)
                            setFormValue('q11', updatedNews)
                          } else {
                            const updatedNews = currentNews.filter(
                              (item) => item !== option
                            )
                            form.setValue('q11', updatedNews)
                            setFormValue('q11', updatedNews)
                          }
                          if (option === 'อื่น ๆ (โปรดระบุ)') {
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
                      placeholder='โปรดระบุ'
                      type='text'
                      {...form.register('q11_other', {
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                          setFormValue('q11_other', e.target.value),
                      })}
                    />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className='w-full border-b border-[#064E41]' />
        {evaluationQuestions.part1.questions.slice(1, 5).map((question) => (
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
        <div className='mb-8 flex flex-col gap-2 pt-2 font-mitr text-[#064E41]'>
          {evaluationQuestions.part1.questions[5].label}
          <Input
            className='h-9 border-[#064E41] text-sm font-light text-[#064E41] placeholder:text-[#064E41] placeholder:opacity-50 focus-visible:ring-[#064E41]'
            placeholder='กรอก'
            {...form.register('q16', {
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                setFormValue('q16', e.target.value),
            })}
            name='q16'
          />
        </div>
        <div className='flex w-full items-center justify-center gap-4'>
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

export default EvaluationForm1
