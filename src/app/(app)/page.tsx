import Footer from '@/components/homepage/footer'
import Navbar from '@/components/homepage/navbar'
import Timer from '@/components/homepage/timer'

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className='flex flex-col justify-center'>
        <Timer />
      </div>
      <Footer />
    </>
  )
}

export default Home
