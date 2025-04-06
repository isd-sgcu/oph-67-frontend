'use client'

import Image from 'next/image'
import { useState } from 'react'
import { type UseFormReturn } from 'react-hook-form'

import { type EvaluationForm } from '@/types/evaluation-schema'

interface FaceRatingProps {
  question: string
  form: UseFormReturn<EvaluationForm>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Reason: The type is dynamically determined at runtime and cannot be strictly typed.
  field: any
}

const FaceRating: React.FC<FaceRatingProps> = ({ question, form, field }) => {
  const [selectedValue, setSelectedValue] = useState<number | null>(null)

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
            className={`relative flex items-center justify-center ${
              selectedValue === value ? 'rounded-full bg-[#F2AFD4]' : ''
            }`}
          >
            <Image
              alt={`face ${value}`}
              height={33}
              src={`/assets/evaluation-form/face${value}.svg`}
              width={33}
              onClick={() => {
                form.setValue(field, value)
                setSelectedValue(value)
              }}
            />
          </div>
        ))}
        <p>มาก</p>
      </div>
    </div>
  )
}

export default FaceRating
