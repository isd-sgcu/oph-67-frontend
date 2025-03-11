'use client'

import Image from 'next/image'
import { useState } from 'react'

import { config } from '@/app/config'
import Frame from '@/components/event-and-map/frame'
import ToggleButtons from '@/components/event-and-map/togglebutton'
import Footer from '@/components/homepage/footer'
import Navbar from '@/components/homepage/navbar'
import { Button } from '@/components/ui/button'
import { faculties } from '@/const/faculties'
import { FaciItems, LocationItems, NavigationItems } from '@/const/navigator'
import { MapButtons } from '@/const/togglebutton'

interface NavigationItem {
  how: string
  from: string
  to: string
}

interface MapItem {
  location: string
  facility: string
}

const Navigator: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>(MapButtons[0])

  const [selectedMapItem, setSelectedMapItem] = useState<MapItem>({
    location: LocationItems[0].title,
    facility: FaciItems[0].title,
  })

  const [selectedNavigationItem, setSelectedNavigationItem] =
    useState<NavigationItem>({
      how: NavigationItems[0].title,
      from: '',
      to: '',
    })

  // console.log(selectedMapItem)
  // console.log(selectedNavigationItem)

  const validSubmit = (): boolean => {
    return (
      selectedNavigationItem.how !== '' &&
      selectedNavigationItem.from !== '' &&
      selectedNavigationItem.to !== ''
    )
  }

  return (
    <div className='bg-[#FCF3F8]'>
      <Navbar />
      <div className='flex flex-col items-center justify-center p-8'>
        <h1 className='pb-6 font-mitr text-2xl font-normal text-[#064E41]'>
          แผนที่
        </h1>
        <div className='flex flex-col items-center justify-center gap-3'>
          <ToggleButtons
            initialSelected={selectedOption}
            labels={MapButtons}
            onSelect={setSelectedOption}
          />
          <Frame
            hasBorder
            imgPath={`${config.cdnURL}/assets/event_map/null.png`}
          />
          {selectedOption === MapButtons[0] ? (
            <div className='flex flex-col items-center gap-5 pb-8'>
              <div className='flex flex-col items-center gap-4'>
                <h2 className='font-mitr text-[16px] font-normal text-[#064E41]'>
                  สถานที่
                </h2>
                <div className='grid w-full grid-cols-2 gap-3'>
                  {LocationItems.map((locationItem) => (
                    <Button
                      key={locationItem.title}
                      className={`font-mitr text-[16px] font-normal shadow-xl ${locationItem.title === selectedMapItem.location ? 'bg-white text-[#DD579B]' : 'bg-[#DD579B] text-white'}`}
                      onClick={() => {
                        setSelectedMapItem((prev) => ({
                          ...prev,
                          location: locationItem.title,
                        }))
                      }}
                    >
                      {locationItem.title}
                    </Button>
                  ))}
                </div>
              </div>
              <div className='flex flex-col items-center gap-4'>
                <h2 className='font-mitr text-[16px] font-normal text-[#064E41]'>
                  สิ่งอำนวยความสะดวก
                </h2>
                <div className='flex flex-wrap items-center justify-center gap-2'>
                  {FaciItems.map((faciItem) => (
                    <Button
                      key={faciItem.title}
                      className={`min-w-[108px] px-[16px] font-mitr text-[16px] font-light shadow-xl ${faciItem.title === selectedMapItem.facility ? 'bg-white text-[#064E41]' : 'bg-[#064E41] text-white'}`}
                      onClick={() => {
                        setSelectedMapItem((prev) => ({
                          ...prev,
                          facility: faciItem.title,
                        }))
                      }}
                    >
                      <Image
                        alt={faciItem.title}
                        height={19}
                        src={`${config.cdnURL}/assets/event_map/${faciItem.iconName}${faciItem.title === selectedMapItem.facility ? '_green' : ''}.svg`}
                        width={19}
                      />
                      {faciItem.title}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className='flex flex-col items-center gap-5 pb-8'>
              <div className='flex flex-col items-center gap-4'>
                <h2 className='font-mitr text-[16px] font-normal text-[#064E41]'>
                  เลือกวิธีการเดินทาง
                </h2>

                {/* How */}
                <div className='flex justify-center gap-2'>
                  {NavigationItems.map((navigationItem) => (
                    <Button
                      key={navigationItem.title}
                      className={`flex h-[35px] min-w-[152px] items-center justify-center gap-1 font-mitr text-[14px] font-light shadow-xl ${navigationItem.title === selectedNavigationItem.how ? 'bg-white text-[#DD579B]' : 'bg-[#DD579B] text-white'}`}
                      onClick={() => {
                        setSelectedNavigationItem((prev) => ({
                          ...prev,
                          how: navigationItem.title,
                        }))
                      }}
                    >
                      <Image
                        alt={navigationItem.title}
                        height={12}
                        src={`${config.cdnURL}/assets/event_map/${navigationItem.iconName}_${navigationItem.title === selectedNavigationItem.how ? 'pink' : 'white'}.svg`}
                        width={12}
                      />
                      {navigationItem.title}
                    </Button>
                  ))}
                </div>

                {/* Break Line */}
                <hr className='w-full border-t border-[#A64174]' />

                {/* From-To */}
                <div className='relative flex w-full flex-col gap-2'>
                  {/* From Section */}
                  <div className='flex w-full items-center gap-2'>
                    <Image
                      alt='icon'
                      height={20}
                      src={`${config.cdnURL}/assets/event_map/flower2.svg`}
                      width={20}
                    />
                    <p className='w-[50px] text-right font-mitr text-base font-normal text-[#064E41]'>
                      From
                    </p>
                    <select
                      className='h-9 w-full rounded-md border border-[#064E41] p-1 text-sm font-light text-[#064E41] placeholder-opacity-50 focus:outline-none focus:ring-1 focus:ring-[#064E41]'
                      defaultValue=''
                      style={{ textOverflow: 'ellipsis' }}
                      onChange={(e) =>
                        setSelectedNavigationItem((prev) => ({
                          ...prev,
                          from: e.target.value,
                        }))
                      }
                    >
                      <option disabled value=''>
                        -- คณะ (Faculty) --
                      </option>
                      {faculties.map((faculty) => (
                        <option
                          key={faculty.th}
                          disabled={faculty.th === selectedNavigationItem.to}
                          value={faculty.th}
                        >
                          {faculty.th} {faculty.en}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Dashed Line */}
                  <div className='absolute left-[10px] top-[30px] h-[20px] w-[2px] border-l-2 border-dashed border-[#DD579B]' />

                  {/* To Section */}
                  <div className='flex w-full items-center gap-2'>
                    <Image
                      alt='icon'
                      height={20}
                      src={`${config.cdnURL}/assets/event_map/flower2.svg`}
                      width={20}
                    />
                    <p className='w-[50px] text-right font-mitr text-base font-normal text-[#064E41]'>
                      To
                    </p>
                    <select
                      className='h-9 w-full rounded-md border border-[#064E41] p-1 text-sm font-light text-[#064E41] placeholder-opacity-50 focus:outline-none focus:ring-1 focus:ring-[#064E41]'
                      defaultValue=''
                      style={{ textOverflow: 'ellipsis' }}
                      onChange={(e) =>
                        setSelectedNavigationItem((prev) => ({
                          ...prev,
                          to: e.target.value,
                        }))
                      }
                    >
                      <option disabled value=''>
                        -- คณะ (Faculty) --
                      </option>
                      {faculties.map((faculty) => (
                        <option
                          key={faculty.th}
                          disabled={faculty.th === selectedNavigationItem.from}
                          value={faculty.th}
                        >
                          {faculty.th} {faculty.en}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  className='px-14 shadow-xl'
                  disabled={!validSubmit()}
                  onClick={() => console.log(selectedNavigationItem)}
                >
                  <p className='font-mitr text-lg font-normal text-white'>
                    ยืนยัน
                  </p>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Navigator
