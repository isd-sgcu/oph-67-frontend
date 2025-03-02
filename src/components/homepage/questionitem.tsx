'use client'

import React, { type JSX, useState } from 'react'

interface QuestionItem {
  title: string
  detail: string
}

const QuestionComponent: React.FC<QuestionItem> = ({ title, detail }) => {
  const [isOpen, setIsOpen] = useState(false)

  const regex = /(\\b.*?\\b)/g

  const formatText = (text: string): JSX.Element[] => {
    return text.split(/\n/).map((line, index) => {
      const parts = line.split(regex).map((part, i) => {
        if (part.startsWith('\\b') && part.endsWith('\\b')) {
          return <strong key={`${line}-${i}`}>{part.slice(2, -2)}</strong>
        }
        return <span key={`${line.toString()}-${i}`}>{part}</span>
      })
      return (
        <React.Fragment key={`${line.toString()}-${index}`}>
          {parts}
          <br />
        </React.Fragment>
      )
    })
  }

  return (
    <div>
      {/* Title */}
      <div
        className={`mb-[8px] flex items-center justify-between rounded-[14px] border border-[#DD579B] bg-gradient-to-r from-white to-[#F7D3E8] px-[14px] py-[7px] transition-all duration-500 ${isOpen ? 'mb-[8px] shadow-lg' : 'mb-0 shadow-none'}`}
      >
        <h2 className='font-mitr text-base font-normal text-[#FB549C]'>
          {formatText(title)}
        </h2>
        <button
          className={`flex cursor-pointer transition-all duration-500 ${isOpen ? '-translate-x-2 rotate-180' : ''}`}
          type='button'
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className='h-[14px] w-[2px] -translate-x-[7.2px] rotate-45 rounded-full bg-[#DD579B]' />
          <span className='h-[14px] w-[2px] -rotate-45 rounded-full bg-[#DD579B]' />
        </button>
      </div>

      {/* Detail */}
      <div
        className={`overflow-hidden rounded-md border border-[#FDDDEB] bg-white px-[14px] py-[7px] transition-all duration-500 ${isOpen ? 'mb-[12px] max-h-[500px] translate-y-0 opacity-100 shadow-lg' : 'mb-0 max-h-0 -translate-y-4 opacity-0 shadow-none'}`}
      >
        <p className='font-mitr text-sm font-light leading-[18.84px] text-[#DD579B]'>
          {formatText(detail)}
        </p>
      </div>
    </div>
  )
}

export default QuestionComponent
