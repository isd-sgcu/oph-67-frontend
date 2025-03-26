import type { Metadata } from 'next'

import { AuthProvider } from '@/components/auth/auth-provider'
import { LiffProvider } from '@/components/liff/liff-provider'

export const metadata: Metadata = {
  title: 'CU OPENHOUSE 67 Management',
  description: '',
}

const Layout: React.FC<Readonly<{ children: React.ReactNode }>> = ({
  children,
}) => {
  return (
    <div className='relative mx-auto min-h-screen max-w-md font-anuphan shadow'>
      <LiffProvider>
        <AuthProvider>{children}</AuthProvider>
      </LiffProvider>
    </div>
  )
}

export default Layout
