'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

interface ImageCarouselProps {
  images: string[]
}

interface ImageItem {
  index: number
  src: string
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (images.length < 3) {
    throw new Error('ImageCarousel requires at least 3 images')
  }

  const getVisibleImages = (): ImageItem[] => {
    const leftIndex = (currentIndex - 1 + images.length) % images.length
    const rightIndex = (currentIndex + 1) % images.length

    return [
      { index: leftIndex, src: images[leftIndex] },
      { index: currentIndex, src: images[currentIndex] },
      { index: rightIndex, src: images[rightIndex] },
    ]
  }

  useEffect(() => {
    const goToNext = (): void => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }
    const interval = setInterval(() => {
      goToNext()
    }, 3000)

    return () => clearInterval(interval)
  }, [images.length])

  const visibleImages = getVisibleImages()

  return (
    <div className='relative mx-auto w-full max-w-4xl'>
      <div className='overflow-hidden'>
        <div className='flex items-center justify-center gap-4 py-3'>
          {visibleImages.map((img, i) => (
            <div
              key={img.index}
              className={`relative transform transition-all duration-500 ${i === 0 ? 'scale-90' : ''} ${i === 1 ? 'scale-100' : ''} ${i === 2 ? 'scale-90' : ''}`}
            >
              <div className='relative aspect-square w-64'>
                <Image
                  fill
                  alt={`carousel image ${img.index}`}
                  className='rounded-lg object-cover'
                  priority={i === 1}
                  src={img.src}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ImageCarousel
