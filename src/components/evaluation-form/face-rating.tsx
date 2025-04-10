'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { type UseFormReturn } from 'react-hook-form'

import { type EvaluationForm } from '@/types/evaluation-schema'

interface FaceRatingProps {
  question: string
  form: UseFormReturn<EvaluationForm>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Reason: The type is dynamically determined at runtime and cannot be strictly typed.
  field: any
  onRatingChange?: (value: number) => void
}

const FaceRating: React.FC<FaceRatingProps> = ({
  question,
  form,
  field,
  onRatingChange,
}) => {
  const [selectedValue, setSelectedValue] = useState<number | null>(null)

  useEffect((): void => {
    const value = form.getValues(field) as number | undefined
    if (value) {
      setSelectedValue(value)
    }
  }, [field, form])

  const handleSelect = (value: number): void => {
    form.setValue(field, value)
    setSelectedValue(value)
    if (onRatingChange) {
      onRatingChange(value)
    }
  }

  return (
    <div className='flex flex-col gap-4 border-b border-[#064E41] pb-5 pt-2 font-mitr'>
      <div className='text-sm font-normal text-[#064E41]'>
        {question}
        <span className='text-[#FF0000]'>*</span>
      </div>
      <div className='flex items-center justify-between text-sm font-normal text-[#064E41]'>
        <p>น้อย</p>
        {[1, 2, 3, 4, 5].map((value) => (
          <div
            key={value}
            className={`relative flex cursor-pointer items-center justify-center ${
              selectedValue === value ? 'rounded-full bg-[#F2AFD4]' : ''
            }`}
          >
            <Image
              alt={`face ${value}`}
              height={33}
              src={`/assets/evaluation-form/face${value}.svg`}
              width={33}
              onClick={() => handleSelect(value)}
            />
          </div>
        ))}
        <p>มาก</p>
      </div>
    </div>
  )
}

export default FaceRating
