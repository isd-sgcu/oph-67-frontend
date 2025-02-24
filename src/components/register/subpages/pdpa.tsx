'use client'

import { Button } from '@/components/register/button'
import { PDPA, termAndCondition } from '@/const/policy'

import Policy from '../policy/policy'

interface PdpaProps {
  isTerm: boolean
  isPDPA: boolean
  setStep: (value: number) => void
  setIsTerm: (value: boolean) => void
  setIsPDPA: (value: boolean) => void
}

const Pdpa: React.FC<PdpaProps> = ({
  isPDPA,
  isTerm,
  setStep,
  setIsPDPA,
  setIsTerm,
}) => {
  const isValid = isPDPA && isTerm

  function onNext(): void {
    if (isValid) setStep(3)
  }

  return (
    <div>
      <div className='flex flex-col gap-6 px-5 py-8'>
        <Policy
          SetIsAccepted={setIsTerm}
          consent={termAndCondition.consent}
          content={termAndCondition.content}
          isAccepted={isTerm}
          topic={termAndCondition.topic}
        />

        <Policy
          SetIsAccepted={setIsPDPA}
          consent={PDPA.consent}
          content={PDPA.content}
          isAccepted={isPDPA}
          topic={PDPA.topic}
        />

        <div className='text-center'>
          <Button
            className='font-cloud-soft text-2xl font-medium'
            variant={isValid ? 'filled' : 'disabled'}
            onClick={onNext}
          >
            ยินยอม
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Pdpa
