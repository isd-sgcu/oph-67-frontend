'use client'

import Image from 'next/image'

interface ImageString {
  imgName: string
}

const Actionbutton: React.FC<ImageString> = ({ imgName }) => {
  return (
    <button type='button'>
      <Image
        alt={imgName}
        height={137}
        src={`/homepage/${imgName}.svg`}
        width={170}
      />
    </button>
  )
}

export default Actionbutton
