import ReactMarkdown from 'react-markdown'

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
    <div className='space-y-3 font-anuphan'>
      <div className='text-base font-bold text-[#064E41]'>{topic}</div>
      <div className='border-dark-gray h-64 overflow-y-auto rounded-md border-2 p-2 text-sm font-light'>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
      <div className='flex items-center gap-2 text-xs font-normal'>
        <CheckBox isChecked={isAccepted} setIsChecked={SetIsAccepted} />
        <div>
          {consent}
          <span className='text-[#FF0000]'>*</span>
        </div>
      </div>
    </div>
  )
}

export default Policy
