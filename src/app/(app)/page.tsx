import Faq from '@/components/homepage/faq'
import Footer from '@/components/homepage/footer'
import Navbar from '@/components/homepage/navbar'
import Timer from '@/components/homepage/timer'

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className='flex flex-col justify-center p-[20px]' />
      <Timer />
      <div className='flex flex-col justify-center p-[20px]'>
        <Faq />
      </div>
      <Footer />
    </>
  )
}

export default Home
