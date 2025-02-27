import NextImage from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

import { Button } from '../ui/button'

const CertificateGenerator: React.FC = () => {
  const userName = 'Lickma Bold'
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    handleGenerate()
  }, [])
  const handleGenerate = (): void => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const image = new Image()
    image.src = '/certificate/template.jpg' // Ensure this file is in your public folder

    image.onload = () => {
      canvas.width = image.width
      canvas.height = image.height

      // Draw certificate template
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

      // Set text properties
      ctx.font = 'bold 50px Mitr'
      ctx.fillStyle = 'black'
      ctx.textAlign = 'center'

      // Position text in the middle
      const x = canvas.width / 2
      const y = 400 // Adjust as needed for your template
      ctx.fillText(userName, x, y)

      // Convert to image URL
      setImageUrl(canvas.toDataURL('image/png'))
    }
  }

  return (
    <div className='flex flex-col items-center gap-2 p-5'>
      <h1 className='text-2xl font-normal text-primary-green'>Certification</h1>
      <p className='text-base font-normal text-primary-green'>เกียรติบัตร</p>
      <div className='my-8 w-[20rem] border border-b-0 border-primary-green' />
      <div>
        <div className='flex'>
          <NextImage
            alt='cert'
            height={24}
            src='/assets/icons/flower-vase.svg'
            width={24}
          />
          <h1 className='header-green-gradient clip-text text-3xl'>
            CONGRATULATIONS!
          </h1>
          <NextImage
            alt='cert'
            height={24}
            src='/assets/icons/flower-vase.svg'
            width={24}
          />
        </div>
        <p className='text-green-gradient clip-text mt-1 text-center font-light'>
          see you soon in Chula
        </p>
      </div>
      <canvas ref={canvasRef} className='hidden' />
      {imageUrl ? (
        <>
          <div className='mt-4'>
            <NextImage
              alt='Generated Certificate'
              className='mt-2 border'
              height={300}
              src={imageUrl}
              width={400}
            />
          </div>

          <a download='certificate.png' href={imageUrl}>
            <Button className='mt-8 w-[20rem] font-cloud-soft text-2xl font-bold'>
              <NextImage
                alt='download'
                className='mb-1'
                height={24}
                src='/assets/icons/download.svg'
                width={24}
              />
              ดาวน์โหลด
            </Button>
          </a>
        </>
      ) : null}
    </div>
  )
}

export default CertificateGenerator
