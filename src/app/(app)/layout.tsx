import type { Metadata } from 'next'

import { LiffProvider } from '@/components/liff/liff-provider'

export const metadata: Metadata = {
  title: 'CU OPENHOUSE 67',
  description: '',
}

const Layout: React.FC<Readonly<{ children: React.ReactNode }>> = ({
  children,
}) => {
  return (
    <div className='relative mx-auto min-h-screen max-w-md font-anuphan shadow'>
      <LiffProvider>{children}</LiffProvider>
    </div>
  )
}

export default Layout
