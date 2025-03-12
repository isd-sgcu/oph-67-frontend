'use client'

import Footer from '@/components/homepage/footer'
import Navbar from '@/components/homepage/navbar'
import NotYetpage from '@/components/notyetpage'

const NotYet: React.FC = () => {
  return (
    <div>
      <Navbar />
      <NotYetpage />
      <Footer />
    </div>
  )
}

export default NotYet
