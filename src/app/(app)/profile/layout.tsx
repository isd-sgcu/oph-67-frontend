import Footer from '@/components/homepage/footer'
import Navbar from '@/components/homepage/navbar'

const Layout: React.FC<Readonly<{ children: React.ReactNode }>> = ({
  children,
}) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default Layout
