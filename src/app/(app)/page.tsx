import Link from 'next/link'

import Actionbutton from '@/components/homepage/actionbutton'
import Faq from '@/components/homepage/faq'
import Footer from '@/components/homepage/footer'
import Imageslider from '@/components/homepage/imageslider'
import Navbar from '@/components/homepage/navbar'
import Timer from '@/components/homepage/timer'

interface ActionbuttonItem {
  title: string
  url: string
}

const Home: React.FC = () => {
  const actionButtonsDetail: ActionbuttonItem[] = [
    { title: 'pick_your_flower', url: '/pick_your_flower' },
    { title: 'suchibat', url: '/suchibat' },
  ]
  return (
    <>
      <Navbar />
      <div className='flex flex-col items-center justify-center py-[20px]'>
        <Imageslider />
      </div>
      <Timer />
      <div className='flex flex-col items-center justify-center gap-5 p-[20px]'>
        {/* Register Button */}
        <Link
          className='rounded-lg bg-[#076855] px-12 py-4 shadow-xl'
          href='/register'
        >
          <p className='text font-cloud-soft text-2xl text-white'>
            ลงทะเบียนเลย!
          </p>
        </Link>
        <div className='grid h-[170px] w-full grid-cols-2 gap-2'>
          {actionButtonsDetail.map((item) => (
            <Actionbutton key={item.title} title={item.title} url={item.url} />
          ))}
        </div>
        <Faq />
      </div>
      <Footer />
    </>
  )
}

export default Home
