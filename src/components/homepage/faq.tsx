'use client'

import Image from 'next/image'

import { config } from '@/app/config'
import { FaqItems } from '@/const/faq'

import QuestionComponent from './questionitem'

const Faq: React.FC = () => {
  return (
    <div className='flex w-full flex-col'>
      <Image
        alt='faq'
        height={45.81}
        src={`${config.cdnURL}/assets/homepage/faq.svg`}
        width={79.48}
      />
      <div className='flex w-full flex-col justify-start gap-[4px]'>
        {FaqItems.map((q) => (
          <QuestionComponent key={q.title} detail={q.detail} title={q.title} />
        ))}
      </div>
    </div>
  )
}

export default Faq
