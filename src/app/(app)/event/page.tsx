'use client'

import { useState } from 'react'

import { config } from '@/app/config'
import Frame from '@/components/event-and-map/frame'
import ToggleButtons from '@/components/event-and-map/togglebutton'
import Footer from '@/components/homepage/footer'
import Navbar from '@/components/homepage/navbar'
import { EventButtons } from '@/const/togglebutton'

const Event: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>(EventButtons[0])
  console.log(selectedOption) // Remove Later !!!
  return (
    <div className='flex min-h-screen flex-col justify-between bg-[#FCF3F8]'>
      <div>
        <Navbar />
        <div className='flex flex-col items-center justify-center p-8'>
          <h1 className='pb-6 font-mitr text-2xl font-normal text-[#064E41]'>
            กิจกรรม
          </h1>
          <div className='flex flex-col items-center justify-center gap-3'>
            <ToggleButtons
              initialSelected={EventButtons[0]}
              labels={EventButtons}
              onSelect={() => {
                setSelectedOption
              }}
            />
            <Frame
              hasBorder={false}
              imgPath={`${config.cdnURL}/assets/event_map/null.png`}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Event
