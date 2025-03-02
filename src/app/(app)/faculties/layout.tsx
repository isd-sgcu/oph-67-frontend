import Footer from '@/components/homepage/footer'
import Navbar from '@/components/homepage/navbar'

const Layout: React.FC<Readonly<{ children: React.ReactNode }>> = ({
  children,
}) => {
  return (
    <div className='flex min-h-screen flex-col bg-light-pink font-mitr'>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
