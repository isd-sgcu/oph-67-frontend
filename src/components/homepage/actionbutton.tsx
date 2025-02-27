'use client'

interface ImageString {
  imgName: string
}

const Actionbutton: React.FC<ImageString> = ({ imgName }) => {
  return (
    <button
      className='h-[137px] w-[170px] max-w-[50%]'
      type='button'
      style={{
        backgroundImage: `url(/homepage/${imgName}.svg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
  )
}

export default Actionbutton
