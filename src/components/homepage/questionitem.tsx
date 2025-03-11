'use client'

import React, { type JSX, useState } from 'react'

interface QuestionItem {
  title: string
  detail: string
}

const QuestionComponent: React.FC<QuestionItem> = ({ title, detail }) => {
  const [isOpen, setIsOpen] = useState(false)
  const boldTextRegex = /(?:\\b.*?\\b)/g

  const getStableKey = (text: string, prefix = ''): string => {
    const truncated = text.slice(0, 10).replace(/\s+/g, '-')
    return `${prefix}-${truncated}-${text.length}`
  }

  const formatText = (text: string): JSX.Element[] => {
    const lines = text.split('\n')

    return lines.map((line, lineIndex) => {
      const lineKey = getStableKey(line, `line-${lineIndex}`)

      if (!boldTextRegex.test(line)) {
        return (
          <React.Fragment key={lineKey}>
            {line}
            {lineIndex < lines.length - 1 && <br />}
          </React.Fragment>
        )
      }

      boldTextRegex.lastIndex = 0

      const parts: JSX.Element[] = []
      let lastIndex = 0

      let match
      while ((match = boldTextRegex.exec(line)) !== null) {
        const startIdx = match.index

        if (startIdx > lastIndex) {
          const beforeText = line.substring(lastIndex, startIdx)
          parts.push(
            <span key={getStableKey(beforeText, 'regular')}>{beforeText}</span>
          )
        }

        const boldText = match[0].substring(2, match[0].length - 2)
        parts.push(
          <strong key={getStableKey(boldText, 'bold')}>{boldText}</strong>
        )

        lastIndex = startIdx + match[0].length
      }

      if (lastIndex < line.length) {
        const remainingText = line.substring(lastIndex)
        parts.push(
          <span key={getStableKey(remainingText, 'end')}>{remainingText}</span>
        )
      }

      return (
        <React.Fragment key={lineKey}>
          {parts}
          {lineIndex < lines.length - 1 && <br />}
        </React.Fragment>
      )
    })
  }

  return (
    <div>
      <div
        className={`mb-0 flex items-center justify-between rounded-[14px] border border-[#DD579B] bg-gradient-to-r from-white to-[#F7D3E8] px-[14px] py-[7px] transition-all duration-500 ${isOpen ? 'mb-[8px] shadow-lg' : 'mb-0 shadow-none'}`}
      >
        <h2 className='font-mitr text-base font-normal text-[#FB549C]'>
          {formatText(title)}
        </h2>
        <button
          aria-label={isOpen ? 'Close details' : 'Open details'}
          className={`flex cursor-pointer p-2 transition-all duration-500 ${isOpen ? '-translate-x-2 rotate-180' : ''}`}
          type='button'
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className='h-[14px] w-[2px] -translate-x-[7.2px] rotate-45 rounded-full bg-[#DD579B]' />
          <span className='h-[14px] w-[2px] -rotate-45 rounded-full bg-[#DD579B]' />
        </button>
      </div>
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
