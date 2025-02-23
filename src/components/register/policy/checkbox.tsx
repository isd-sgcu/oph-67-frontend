import { Check } from 'lucide-react'

interface CheckBoxProps {
  isChecked?: boolean
  setIsChecked?: (value: boolean) => void
}

const CheckBox: React.FC<CheckBoxProps> = ({ isChecked, setIsChecked }) => {
  return (
    <div
      aria-checked={isChecked} // Added aria-checked attribute
      role='checkbox' // Added role attribute
      tabIndex={0} // Added tabIndex for keyboard navigation
      className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded ${
        isChecked ? 'bg-[#076855]' : 'border border-[#757575]'
      }`}
      onClick={() => setIsChecked && setIsChecked(!isChecked)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setIsChecked && setIsChecked(!isChecked)
        }
      }} // Added onKeyDown event listener for keyboard interaction
    >
      {isChecked ? <Check className='h-4 w-4 text-white' /> : null}
    </div>
  )
}

export default CheckBox
