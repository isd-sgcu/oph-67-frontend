'use client'

import { PDFDownloadLink } from '@react-pdf/renderer'
import NextImage from 'next/image'
import React, { useState } from 'react'

import CertificatePDF from '../certificate/certificate-pdf'
import { Button } from '../ui/button'

interface CertificateGeneratorProps {
  userName: string
  token: string
}

const CertificateGenerator: React.FC<CertificateGeneratorProps> = ({
  userName,
  token,
}) => {
  const [error, setError] = useState<string | null>(null)

  const handleGenerateError = (err: Error): void => {
    console.error('Error generating PDF:', err)
    setError('ไม่สามารถสร้างเอกสารได้ โปรดลองอีกครั้ง')
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
      <div className='relative aspect-[1123/794] w-full font-thSaraban'>
        <NextImage
          fill
          alt='cert'
          className='absolute'
          objectFit='contain'
          src='/assets/certificate/template.png'
        />
        <div className='absolute flex h-full w-full items-center justify-center'>
          <div className='text-center text-xl text-black'>{userName}</div>
        </div>
        <div className='absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 -rotate-45 text-center text-5xl font-extrabold tracking-wider text-black/10'>
          PREVIEW
        </div>
        <div className='absolute left-1/4 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 -rotate-45 text-center text-5xl font-extrabold tracking-wider text-black/10'>
          PREVIEW
        </div>
        <div className='absolute left-3/4 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 -rotate-45 text-center text-5xl font-extrabold tracking-wider text-black/10'>
          PREVIEW
        </div>
      </div>
      <PDFDownloadLink
        document={<CertificatePDF token={token} userName={userName} />}
        fileName='certificate.pdf'
        onError={(event) => handleGenerateError(event as unknown as Error)}
      >
        {({ loading }) => (
          <Button
            className='mt-8 w-[20rem] font-cloud-soft text-2xl font-bold'
            disabled={loading}
          >
            <NextImage
              alt='download'
              className='mb-1'
              height={24}
              src='/assets/icons/download.svg'
              width={24}
            />
            {loading ? 'กำลังโหลด...' : 'ดาวน์โหลด'}
          </Button>
        )}
      </PDFDownloadLink>
      {error ? <p className='mt-2 text-red-500'>{error}</p> : null}
    </div>
  )
}

export default CertificateGenerator
