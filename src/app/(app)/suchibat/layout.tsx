import Footer from '@/components/homepage/footer'
import Navbar from '@/components/homepage/navbar'

const Layout: React.FC<Readonly<{ children: React.ReactNode }>> = ({
  children,
}) => {
  return (
    <div className='relative mx-auto flex min-h-screen max-w-md flex-col bg-light-pink font-mitr'>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
