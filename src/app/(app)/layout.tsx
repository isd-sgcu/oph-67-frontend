import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CU OPENHOUSE 67',
  description: '',
}

const Layout: React.FC<Readonly<{ children: React.ReactNode }>> = ({
  children,
}) => {
  return <div className='max-w-[375px]'>{children}</div>
}

export default Layout
