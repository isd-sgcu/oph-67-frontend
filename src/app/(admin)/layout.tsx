import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { LiffProvider } from '@/components/liff/liff-provider'

import { getCurrentUser } from '../actions/staff/user'

export const metadata: Metadata = {
  title: 'CU OPENHOUSE 67 Management',
  description: '',
}

const Layout: React.FC<Readonly<{ children: React.ReactNode }>> = async ({
  children,
}) => {
  const user = await getCurrentUser()
  if (!user) {
    redirect('/admin/profile/register')
  }
  return (
    <div className='relative mx-auto min-h-screen max-w-md font-anuphan shadow'>
      <LiffProvider>{children}</LiffProvider>
    </div>
  )
}

export default Layout
