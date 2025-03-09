import Image from 'next/image'
import Link from 'next/link'

import { Adminbuttons } from '@/const/adminbutton'

const Adminhome: React.FC = () => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-tl from-[#FFA2CB] via-[#EA88BD] to-[#EAF7B3] px-16 font-anuphan'>
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
      <p className='text-[16px] font-normal text-white'>CHULA OPENHOUSE 2025</p>
      <h1 className='pt-8 text-2xl font-medium text-white'>Welcome!, Admin</h1>
      <h2 className='pb-8 text-[16px] font-normal text-white'>Username</h2>

      {/* Buttons */}
      <div className='flex w-full flex-col items-center gap-8'>
        {Adminbuttons.map((adminbutton) => (
          <Link
            key={adminbutton.title}
            className='flex h-[50px] w-full items-center justify-center gap-2 rounded-full bg-white text-lg font-medium text-[#064E41] hover:bg-white/90'
            href={`/3a9805a5${adminbutton.path}`}
          >
            <Image
              alt={adminbutton.iconName}
              height={20}
              src={`/assets/admin/${adminbutton.iconName}.svg`}
              width={20}
            />
            {adminbutton.title}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Adminhome
