'use client'

import { useState } from 'react'

interface ToggleButton {
  labels: string[]
  initialSelected?: string
}

const ToggleButtons: React.FC<ToggleButton> = ({ labels, initialSelected }) => {
  const [selected, setSelected] = useState(initialSelected)

  return (
    <div className='inline-flex rounded-md pb-3'>
      {labels.map((label, index) => (
        <button
          key={label}
          type='button'
          className={`min-w-[113px] px-5 py-2 font-mitr text-base font-normal ${
            selected === label
              ? 'bg-[#DD579B] text-white'
              : 'bg-[#FEFEFE] text-[#064E41]'
          } ${index === 0 ? 'rounded-l-md' : ''} ${
            index === labels.length - 1 ? 'rounded-r-md' : ''
          } `}
          onClick={() => setSelected(label)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export default ToggleButtons
