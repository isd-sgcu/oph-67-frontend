import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CU OPENHOUSE 67 Management',
  description: '',
}

const Layout: React.FC<Readonly<{ children: React.ReactNode }>> = ({
  children,
}) => {
  return (
    <div className='relative mx-auto min-h-screen max-w-md font-anuphan shadow'>
      {children}
    </div>
  )
}

export default Layout
