import CheckBox from './checkbox'

interface PolicyProps {
  topic: string
  content: string
  consent: string
  isAccepted: boolean
  SetIsAccepted: (isAccepted: boolean) => void
}

const Policy: React.FC<PolicyProps> = ({
  topic,
  content,
  consent,
  isAccepted,
  SetIsAccepted,
}) => {
  return (
    <div className='space-y-3'>
      <div className='text-lg font-[700]'>{topic}</div>
      <div className='border-dark-gray h-64 overflow-y-auto rounded-md border-2 p-2 text-base'>
        {content}
      </div>
      <div className='flex'>
        <CheckBox isChecked={isAccepted} setIsChecked={SetIsAccepted} />
        <div>{consent}</div>
      </div>
    </div>
  )
}

export default Policy
