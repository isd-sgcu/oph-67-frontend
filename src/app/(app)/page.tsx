import Navbar from '@/components/homepage/navbar'
import Timer from '@/components/homepage/timer'

const Home: React.FC = () => {
  return (
    <div className='relative'>
      <Navbar />
      <div className='relative flex flex-col justify-center'>
        <Timer />
      </div>
    </div>
  )
}

export default Home
