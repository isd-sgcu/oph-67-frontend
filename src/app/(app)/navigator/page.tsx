'use client'

import Image from 'next/image'
import { useState } from 'react'

import Frame from '@/components/event_and_map/frame'
import ToggleButtons from '@/components/event_and_map/togglebutton'
import Footer from '@/components/homepage/footer'
import Navbar from '@/components/homepage/navbar'
import { Button } from '@/components/ui/button'
import { faculties } from '@/const/faculties'
import { DestinationDirectionItems, LocationItems } from '@/const/map'
import { MapButtons } from '@/const/togglebutton'

interface DestinationItem {
  how: string
  from: string
  to: string
}

const Navigator: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>(MapButtons[0])
  const [selectedLocationItem, setSelectedLocationItem] = useState(
    LocationItems[0]
  )
  const [selectedDestinationItem, setSelectedDestinationItem] =
    useState<DestinationItem>({
      how: DestinationDirectionItems[0].title,
      from: '',
      to: '',
    })

  const validSubmit = (): boolean => {
    return (
      selectedDestinationItem.how !== '' &&
      selectedDestinationItem.from !== '' &&
      selectedDestinationItem.to !== ''
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
          <Frame hasBorder imgPath='/assets/event_map/null.png' />
          {selectedOption === MapButtons[0] ? (
            <div className='flex flex-col items-center gap-5 pb-8'>
              <div className='flex flex-col items-center gap-4'>
                <h2 className='font-mitr text-[16px] font-normal text-[#064E41]'>
                  สถานที่
                </h2>
                <div className='grid w-full grid-cols-2 gap-3'>
                  {LocationItems.map((locationItem) => (
                    <Button
                      key={locationItem.id}
                      className={`font-mitr text-[16px] font-normal shadow-xl ${locationItem.title === selectedLocationItem.title ? 'bg-white text-[#DD579B]' : 'bg-[#DD579B] text-white'}`}
                      onClick={() => {
                        setSelectedLocationItem(locationItem)
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
                  {LocationItems.filter(
                    (locationItem) => locationItem === selectedLocationItem
                  ).flatMap((locationItem) =>
                    locationItem.facilities.map((f) => (
                      <div
                        key={locationItem.title + f.title}
                        className='flex h-[35px] min-w-[108px] items-center justify-center gap-[8px] rounded-sm bg-[#076855] px-[8px] py-[16px] font-mitr text-sm font-light text-white shadow-xl'
                      >
                        <Image
                          alt={f.title}
                          height={19}
                          src={`/assets/event_map/${f.iconName}.svg`}
                          width={19}
                        />
                        {f.title}
                      </div>
                    ))
                  )}
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
                  {DestinationDirectionItems.map((destinationItem) => (
                    <Button
                      key={destinationItem.title}
                      className={`flex h-[35px] min-w-[152px] items-center justify-center gap-1 font-mitr text-[14px] font-light shadow-xl ${destinationItem.title === selectedDestinationItem.how ? 'bg-white text-[#DD579B]' : 'bg-[#DD579B] text-white'}`}
                      onClick={() => {
                        setSelectedDestinationItem((prev) => ({
                          ...prev,
                          how: destinationItem.title,
                        }))
                      }}
                    >
                      <Image
                        alt={destinationItem.title}
                        height={12}
                        src={`/assets/event_map/${destinationItem.iconName}_${destinationItem.title === selectedDestinationItem.how ? 'pink' : 'white'}.svg`}
                        width={12}
                      />
                      {destinationItem.title}
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
                      src='/assets/event_map/flower2.svg'
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
                        setSelectedDestinationItem((prev) => ({
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
                          disabled={faculty.th === selectedDestinationItem.to}
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
                      src='/assets/event_map/flower2.svg'
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
                        setSelectedDestinationItem((prev) => ({
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
                          disabled={faculty.th === selectedDestinationItem.from}
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
                  onClick={() => console.log(selectedDestinationItem)}
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
