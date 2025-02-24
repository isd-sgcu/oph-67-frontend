'use client'

import Image from 'next/image'

import QuestionComponent from './questionitem'

interface QuestionItem {
  title: string
  detail: string
}

const Faq: React.FC = () => {
  const questions: QuestionItem[] = [
    {
      title: 'Question1',
      detail:
        'Lorem ipsum dolor sit amet consectetur. Ultrices tortor egestas viverra placerat volutpat vulputate tempor pellentesque. Etiam sit egestas urna amet. Mauris natoque tristique non imperdiet. Magnis diam non id nec purus.',
    },
    { title: 'Question2', detail: 'lorem ipsum2' },
    { title: 'Question3', detail: 'lorem ipsum3' },
    { title: 'Question4', detail: 'lorem ipsum4' },
  ]
  return (
    <div className='flex w-full flex-col'>
      <Image alt='faq' height={45.81} src='/homepage/faq.svg' width={79.48} />
      <div className='flex w-full flex-col justify-start gap-[4px]'>
        {questions.map((q) => (
          <QuestionComponent key={q.title} detail={q.detail} title={q.title} />
        ))}
      </div>
    </div>
  )
}

export default Faq
