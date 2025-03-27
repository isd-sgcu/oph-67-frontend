'use client'
import Image from 'next/image'
import Link from 'next/link'

import { config } from '@/app/config'
import AdminProtect from '@/components/admin/admin-protect'
import { Adminbuttons } from '@/const/adminbutton'
import { useAuth } from '@/hooks/use-auth'

const Adminhome: React.FC = () => {
  const { user } = useAuth()

  return (
    <AdminProtect>
      <div className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-tl from-[#FFA2CB] via-[#EA88BD] to-[#EAF7B3] px-16 font-anuphan'>
        {/* Logo */}
        <div className='relative'>
          <div className='absolute z-0 h-[100px] w-[100px] bg-white blur-2xl' />
          <Image
            alt='logo'
            className='relative z-10'
            height={105}
            src={`${config.cdnURL}/assets/admin/oph_logo-04.svg`}
            width={118}
          />
        </div>
        <h1 className='pt-8 text-2xl font-medium text-white'>
          Welcome!, Admin
        </h1>
        <h2 className='pb-8 text-[16px] font-normal text-white'>
          {user?.name}
        </h2>

        {/* Buttons */}
        <div className='flex w-full flex-col items-center gap-8'>
          {Adminbuttons.map((adminbutton) => (
            <Link
              key={adminbutton.title}
              className='flex h-[50px] w-full items-center justify-center gap-2 rounded-full bg-white text-lg font-medium text-[#064E41] hover:bg-white/90'
              href={adminbutton.path}
            >
              <Image
                alt={adminbutton.iconName}
                height={20}
                src={`${config.cdnURL}/assets/admin/${adminbutton.iconName}.svg`}
                width={20}
              />
              {adminbutton.title}
            </Link>
          ))}
        </div>
      </div>
    </AdminProtect>
  )
}

export default Adminhome
