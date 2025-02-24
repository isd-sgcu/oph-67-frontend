import Actionbutton from '@/components/homepage/actionbutton'
import Faq from '@/components/homepage/faq'
import Footer from '@/components/homepage/footer'
import Navbar from '@/components/homepage/navbar'
import Timer from '@/components/homepage/timer'

const Home: React.FC = () => {
  const actionButtonsDetail: string[] = ['pick_flower', 'suchibat']
  return (
    <>
      <Navbar />
      <div className='flex flex-col justify-center p-[20px]' />
      <Timer />
      <div className='flex flex-col justify-center p-[20px]'>
        <div className='flex flex-wrap justify-center gap-[10px] pb-[12px]'>
          {actionButtonsDetail.map((i) => (
            <Actionbutton key={i} imgName={i} />
          ))}
        </div>
        <Faq />
      </div>
      <Footer />
    </>
  )
}

export default Home
