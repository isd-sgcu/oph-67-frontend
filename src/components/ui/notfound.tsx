interface NotfoundProps {
  text?: string
}

const Notfound: React.FC<NotfoundProps> = ({ text }) => {
  return (
    <div className='flex h-full w-full grow items-center justify-center'>
      <h1 className='text-xl font-normal tracking-tight text-primary-green'>
        {text} Not Found
      </h1>
    </div>
  )
}

export default Notfound
