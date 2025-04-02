'use client'

import Image from 'next/image'
import type React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { config } from '@/app/config'
import { Slider } from '@/const/contentslider'

interface SliderItem {
  type: 'image' | 'video'
  src: string
  id: string
}

const ContentSlider: React.FC = () => {
  const MAX_DOTS = 18

  const calculateDotGroup = (index: number): number => {
    return Math.floor(index / MAX_DOTS) * MAX_DOTS
  }

  const [startDotIndex, setStartDotIndex] = useState(calculateDotGroup(0))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [isVideoLoading, setIsVideoLoading] = useState(false) // Now used for loading indicator
  const videoRefs = useRef<HTMLVideoElement[]>([])
  const autoPlayInterval = useRef<NodeJS.Timeout | null>(null)
  const videoTimeout = useRef<NodeJS.Timeout | null>(null)

  const clearAutoPlayInterval = useCallback(() => {
    if (autoPlayInterval.current) {
      clearInterval(autoPlayInterval.current)
      autoPlayInterval.current = null
    }
  }, [])

  const pauseAndResetVideos = useCallback(() => {
    videoRefs.current.forEach((videoRef) => {
      videoRef.pause()
      videoRef.currentTime = 0
      videoRef.volume = 0.4
    })
    setVideoPlaying(false)
  }, [])

  const updateDotVisibility = useCallback(
    (index: number): void => {
      if (Slider.length <= MAX_DOTS) return

      const newStartIndex = calculateDotGroup(index)

      if (newStartIndex !== startDotIndex) {
        setStartDotIndex(newStartIndex)
      }
    },
    [startDotIndex]
  )

  const resetAutoPlayInterval = useCallback((): void => {
    clearAutoPlayInterval()
    autoPlayInterval.current = setInterval(() => {
      pauseAndResetVideos()
      const newIndex = (currentIndex + 1) % Slider.length
      setCurrentIndex(newIndex)
      updateDotVisibility(newIndex)
      setIsVideoLoading(Slider[newIndex]?.type === 'video')
    }, 3000)
  }, [
    clearAutoPlayInterval,
    currentIndex,
    pauseAndResetVideos,
    updateDotVisibility,
  ])

  const nextSlide = useCallback((): void => {
    pauseAndResetVideos()
    const newIndex = (currentIndex + 1) % Slider.length
    setCurrentIndex(newIndex)
    updateDotVisibility(newIndex)
    setIsVideoLoading(Slider[newIndex]?.type === 'video')
    resetAutoPlayInterval()
  }, [
    currentIndex,
    updateDotVisibility,
    pauseAndResetVideos,
    resetAutoPlayInterval,
  ])

  const prevSlide = useCallback((): void => {
    pauseAndResetVideos()
    const newIndex = (currentIndex - 1 + Slider.length) % Slider.length
    setCurrentIndex(newIndex)
    updateDotVisibility(newIndex)
    setIsVideoLoading(Slider[newIndex]?.type === 'video')
    resetAutoPlayInterval()
  }, [
    currentIndex,
    updateDotVisibility,
    pauseAndResetVideos,
    resetAutoPlayInterval,
  ])

  const goToSlide = useCallback(
    (index: number): void => {
      pauseAndResetVideos()
      setCurrentIndex(index)
      updateDotVisibility(index)
      setIsVideoLoading(Slider[index]?.type === 'video')
      resetAutoPlayInterval()
    },
    [updateDotVisibility, pauseAndResetVideos, resetAutoPlayInterval]
  )

  useEffect(() => {
    resetAutoPlayInterval()
    return clearAutoPlayInterval
  }, [resetAutoPlayInterval, clearAutoPlayInterval])

  useEffect(() => {
    const currentItem = Slider[currentIndex]

    if (currentItem.type === 'video') {
      setVideoPlaying(true)
      setIsVideoLoading(true)
      const currentVideoRef = videoRefs.current[currentIndex]

      currentVideoRef.volume = 0.4

      currentVideoRef
        .play()
        .catch((error: unknown) => console.error('Playback failed:', error))

      clearAutoPlayInterval()

      if (videoTimeout.current) {
        clearTimeout(videoTimeout.current)
      }

      videoTimeout.current = setTimeout(() => {
        currentVideoRef.pause()
        currentVideoRef.currentTime = 0
        setVideoPlaying(false)
        nextSlide()
      }, 10000)
    } else {
      setVideoPlaying(false)

      clearTimeout(videoTimeout.current ?? undefined)
      videoTimeout.current = null
    }
  }, [currentIndex, nextSlide, clearAutoPlayInterval])

  const getVisibleDots = (): SliderItem[] => {
    if (Slider.length <= MAX_DOTS) {
      return Slider
    }

    return Slider.slice(startDotIndex, startDotIndex + MAX_DOTS)
  }

  const handleVideoCanPlayThrough = useCallback(() => {
    setIsVideoLoading(false)
  }, [])

  const handleVideoError = useCallback(
    (event: React.SyntheticEvent<HTMLVideoElement>) => {
      console.error('Video load error:', event)
      setIsVideoLoading(false)
    },
    []
  )

  return (
    <div className='relative flex w-full items-center justify-center overflow-hidden py-2 sm:py-6'>
      {/* Images and Videos */}
      <div className='relative flex aspect-[120/63] w-full justify-center'>
        {/* Show loading indicator when video is loading */}
        {isVideoLoading ? (
          <div className='absolute inset-0 z-10 flex items-center justify-center bg-black/10'>
            <div className='h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent' />
          </div>
        ) : null}

        {Slider.length > 0 ? (
          Slider.map((item) =>
            item.type === 'image' ? (
              <Image
                key={item.id || item.src}
                alt={`Slide ${item.id || item.src}`}
                layout='fill'
                objectFit='cover'
                src={`${config.cdnURL}/assets/homepage/${item.src}`}
                className={`relative flex w-full bg-[#CCB9C4] transition-opacity duration-700 ease-in-out ${
                  Slider.indexOf(item) === currentIndex
                    ? 'opacity-100'
                    : 'opacity-0'
                }`}
              />
            ) : (
              <video
                key={item.id || `video-${item.src}`}
                ref={(ref) => {
                  if (ref) {
                    videoRefs.current[Slider.indexOf(item)] = ref
                  }
                }}
                playsInline
                controls={!videoPlaying}
                poster='/assets/homepage/video_placeholder.png'
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                className={`relative flex w-full transition-opacity duration-700 ease-in-out ${
                  Slider.indexOf(item) === currentIndex ? '' : 'hidden'
                }`}
                onCanPlayThrough={handleVideoCanPlayThrough}
                onError={handleVideoError}
              >
                <source
                  src={`${config.cdnURL}/assets/homepage/${item.src}`}
                  type='video/mp4'
                />
                <track
                  kind='captions'
                  label='English'
                  src={`${config.cdnURL}/assets/homepage/${item.src.replace('.mp4', '.vtt')}`}
                />
                Your browser does not support the video tag.
              </video>
            )
          )
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

      {Slider.length > 1 && (
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
            {getVisibleDots().map((item, index) => {
              const actualIndex = startDotIndex + index

              return (
                <Image
                  key={`dot-${item.id || actualIndex}`}
                  alt={`Navigation dot ${actualIndex + 1}`}
                  className='cursor-pointer'
                  height={12}
                  src={`${config.cdnURL}/assets/homepage/flower_icon${actualIndex === currentIndex ? '_selected' : ''}.svg`}
                  width={12}
                  onClick={() => goToSlide(actualIndex)}
                />
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

export default ContentSlider
