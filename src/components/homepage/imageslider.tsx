'use client'

import Image from 'next/image'
import { useState } from 'react'

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

  return (
    <div className='relative flex w-full flex-col items-center justify-center py-2 sm:py-6'>
      <div className='relative flex min-h-[200px] w-full justify-center'>
        {ImageSliderImages.length > 0 ? (
          ImageSliderImages.map((img, index) => (
            <div
              key={img}
              className={`relative flex h-full w-full items-center justify-center transition-opacity duration-700 ease-in-out ${
                index === currentIndex ? 'opacity-100' : 'absolute opacity-0'
              }`}
            >
              <Image
                alt={`Slide ${index + 1}`}
                className='max-h-[50vh] w-auto sm:max-h-[60vh] md:max-h-[70vh] lg:max-h-[80vh]'
                height={600}
                priority={index === currentIndex}
                src={`/assets/homepage/${img}`}
                width={1200}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  objectPosition: 'center',
                }}
              />
            </div>
          ))
        ) : (
          <div className='relative flex h-full w-full items-center justify-center'>
            <Image
              key='banner_null'
              alt='banner_null'
              height={400}
              src='/assets/homepage/banner_null.png'
              width={800}
              style={{
                maxWidth: '100%',
                height: 'auto',
                objectFit: 'contain',
                objectPosition: 'center',
              }}
            />
          </div>
        )}
      </div>

      {ImageSliderImages.length > 1 && (
        <>
          {/* Previous Button */}
          <button
            aria-label='Previous slide'
            className='absolute left-[8px] top-[50%] flex -translate-y-1/2 flex-col items-center justify-center rounded-full bg-black/20 p-2 sm:left-[16px] sm:p-3'
            type='button'
            onClick={prevSlide}
          >
            <span className='h-[10px] w-[2px] rotate-45 rounded-full bg-white sm:h-[14px]' />
            <span className='h-[10px] w-[2px] -translate-y-1 -rotate-45 rounded-full bg-white sm:h-[14px]' />
          </button>

          {/* Next Button */}
          <button
            aria-label='Next slide'
            className='absolute right-[8px] top-[50%] flex -translate-y-1/2 flex-col items-center justify-center rounded-full bg-black/20 p-2 sm:right-[16px] sm:p-3'
            type='button'
            onClick={nextSlide}
          >
            <span className='h-[10px] w-[2px] -rotate-45 rounded-full bg-white sm:h-[14px]' />
            <span className='h-[10px] w-[2px] -translate-y-1 rotate-45 rounded-full bg-white sm:h-[14px]' />
          </button>

          {/* Dots */}
          <div className='mt-2 flex space-x-2 sm:mt-4'>
            {ImageSliderImages.map((img, index) => (
              <Image
                key={img}
                alt={img}
                className='cursor-pointer'
                height={12}
                src={`/assets/homepage/flower_icon${index === currentIndex ? '_selected' : ''}.svg`}
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
