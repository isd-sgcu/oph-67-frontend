import Image from 'next/image'

const Adminrole: React.FC = () => {
  return (
    <div className='flex min-h-screen flex-col items-center bg-gradient-to-r from-[#FFA2CB] via-[#EA88BD] to-[#EAF7B3] py-8 font-anuphan'>
      {/* Logo */}
      <div className='relative'>
        <div className='absolute z-0 h-[100px] w-[100px] bg-white blur-2xl' />
        <Image
          alt='logo'
          className='relative z-10'
          height={105}
          src='/assets/admin/oph_logo-04.svg'
          width={118}
        />
      </div>
      <h1 className='text-2xl font-medium text-white'>Admin Panel</h1>
    </div>
  )
}

export default Adminrole
