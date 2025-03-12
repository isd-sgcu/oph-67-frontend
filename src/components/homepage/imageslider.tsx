'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import { config } from '@/app/config'
import { ImageSliderImages } from '@/const/imageslider'

const Imageslider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % ImageSliderImages.length)
  }

  const prevSlide = (): void => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + ImageSliderImages.length) % ImageSliderImages.length
    )
  }

  const goToSlide = (index: number): void => {
    setCurrentIndex(index)
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000)

    return () => clearInterval(interval)
  }, [currentIndex])

  return (
    <div className='relative flex w-full items-center justify-center overflow-hidden py-2 sm:py-6'>
      {/* Images */}
      <div className='relative flex aspect-[120/63] w-full justify-center'>
        {ImageSliderImages.length > 0 ? (
          ImageSliderImages.map((img, index) => (
            <Image
              key={img}
              alt={`Slide ${index + 1}`}
              className={`relative flex w-full bg-[#CCB9C4] transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
              layout='fill'
              objectFit='cover'
              src={`${config.cdnURL}/assets/homepage/${img}`}
            />
          ))
        ) : (
          <Image
            key='first_banner'
            alt='first_banner'
            layout='fill'
            objectFit='cover'
            src={`${config.cdnURL}/assets/homepage/first_banner.png`}
          />
        )}
      </div>

      {ImageSliderImages.length > 1 && (
        <>
          {/* Previous Button */}
          <button
            aria-label='Previous Slide'
            className='absolute left-[8px] top-[50%] flex -translate-y-1/2 flex-col items-center justify-center rounded-full bg-black/20 p-2 sm:left-[16px] sm:p-3'
            type='button'
            onClick={prevSlide}
          >
            <span className='h-[10px] w-[2px] rotate-45 rounded-full bg-white sm:h-[14px]' />
            <span className='h-[10px] w-[2px] -translate-y-1 -rotate-45 rounded-full bg-white sm:h-[14px]' />
          </button>

          {/* Next Button */}
          <button
            aria-label='Next Slide'
            className='absolute right-[8px] top-[50%] flex -translate-y-1/2 flex-col items-center justify-center rounded-full bg-black/20 p-2 sm:right-[16px] sm:p-3'
            type='button'
            onClick={nextSlide}
          >
            <span className='h-[10px] w-[2px] -rotate-45 rounded-full bg-white sm:h-[14px]' />
            <span className='h-[10px] w-[2px] -translate-y-1 rotate-45 rounded-full bg-white sm:h-[14px]' />
          </button>

          {/* Dots */}
          <div className='absolute bottom-3 left-1/2 flex -translate-x-1/2 justify-center space-x-2 sm:bottom-7'>
            {ImageSliderImages.map((img, index) => (
              <Image
                key={img}
                alt={img}
                className='cursor-pointer'
                height={12}
                src={`${config.cdnURL}/assets/homepage/flower_icon${index === currentIndex ? '_selected' : ''}.svg`}
                width={12}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Imageslider
