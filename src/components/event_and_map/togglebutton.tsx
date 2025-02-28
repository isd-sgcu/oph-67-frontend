'use client'

import { useState } from 'react'

interface ToggleButtonProps {
  labels: string[]
  initialSelected?: string
  onSelect: (label: string) => void
}

const ToggleButtons: React.FC<ToggleButtonProps> = ({
  labels,
  initialSelected,
  onSelect,
}) => {
  const [selected, setSelected] = useState(initialSelected)

  const handleClick = (label: string): void => {
    setSelected(label)
    onSelect(label)
  }

  return (
    <div className='inline-flex rounded-md'>
      {labels.map((label, index) => (
        <button
          key={label}
          type='button'
          className={`transition-color min-w-[113px] px-5 py-2 font-mitr text-base font-normal duration-200 ${
            selected === label
              ? 'bg-[#DD579B] text-white'
              : 'bg-[#FEFEFE] text-[#064E41]'
          } ${index === 0 ? 'rounded-l-md' : ''} ${
            index === labels.length - 1 ? 'rounded-r-md' : ''
          } `}
          onClick={() => handleClick(label)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export default ToggleButtons
