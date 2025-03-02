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
    <div className='relative flex w-full items-center justify-center overflow-hidden py-6'>
      {/* Images */}
      <div className='relative min-h-[300px] w-full'>
        {ImageSliderImages.length > 0 ? (
          ImageSliderImages.map((img, index) => (
            <Image
              key={img}
              alt={`Slide ${index + 1}`}
              className={`absolute transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
              layout='fill'
              objectFit='cover'
              src={`/assets/homepage/${img}`}
            />
          ))
        ) : (
          <Image
            key='banner_null'
            alt='banner_null'
            layout='fill'
            objectFit='cover'
            src='/assets/homepage/banner_null.png'
          />
        )}
      </div>

      {ImageSliderImages.length > 1 && (
        <>
          {/* Previous Button */}
          <button
            className='absolute left-[16px] top-[50%] flex -translate-y-1/2 flex-col items-center justify-center'
            type='button'
            onClick={prevSlide}
          >
            <span className='h-[14px] w-[2px] rotate-45 rounded-full bg-white' />
            <span className='h-[14px] w-[2px] -translate-y-1 -rotate-45 rounded-full bg-white' />
          </button>

          {/* Next Button */}
          <button
            className='absolute right-[16px] top-[50%] flex -translate-y-1/2 flex-col items-center justify-center'
            type='button'
            onClick={nextSlide}
          >
            <span className='h-[14px] w-[2px] -rotate-45 rounded-full bg-white' />
            <span className='h-[14px] w-[2px] -translate-y-1 rotate-45 rounded-full bg-white' />
          </button>

          {/* Dots */}
          <div className='absolute bottom-8 left-1/2 flex -translate-x-1/2 transform space-x-2'>
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
