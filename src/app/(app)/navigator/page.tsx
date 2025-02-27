'use client'

import Frame from '@/components/event_and_map/frame'
import ToggleButtons from '@/components/event_and_map/togglebutton'
import Footer from '@/components/homepage/footer'
import Navbar from '@/components/homepage/navbar'
import { MapButtons } from '@/const/togglebutton'

const Navigator: React.FC = () => {
  return (
    <div className='bg-[#FCF3F8]'>
      <Navbar />
      <div className='flex flex-col items-center justify-center pt-8'>
        <h1 className='pb-6 font-mitr text-2xl font-normal text-[#064E41]'>
          แผนที่
        </h1>
        <ToggleButtons initialSelected='Navigator' labels={MapButtons} />
        <Frame />
      </div>
      <Footer />
    </div>
  )
}

export default Navigator
