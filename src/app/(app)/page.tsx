import Link from 'next/link'

import Actionbutton from '@/components/homepage/actionbutton'
import Faq from '@/components/homepage/faq'
import Footer from '@/components/homepage/footer'
import Imageslider from '@/components/homepage/imageslider'
import Navbar from '@/components/homepage/navbar'
import Timer from '@/components/homepage/timer'
import {
  actionButtonsNotRegistered,
  // actionButtonsRegistered,
} from '@/const/actionbutton'

const Home: React.FC = () => {
  // const isRegistered = false

  // const actionButtonsDetail = isRegistered
  //   ? actionButtonsRegistered
  //   : actionButtonsNotRegistered

  const actionButtonsDetail = actionButtonsNotRegistered

  return (
    <div className='bg-[#FCF3F8]'>
      <Navbar />
      <div className='flex flex-col items-center justify-center py-[20px]'>
        <Imageslider />
      </div>
      <Timer />
      <div className='flex flex-col items-center justify-center gap-5 p-[20px]'>
        {/* Register Button */}
        {/* {!isRegistered && ( */}
        <Link
          className='rounded-lg bg-[#076855] px-12 py-4 shadow-xl'
          href='/register'
        >
          <p className='text font-cloud-soft text-2xl text-white'>
            ลงทะเบียนเลย!
          </p>
        </Link>
        {/* )} */}
        <div className='grid w-full grid-cols-2 gap-2'>
          {actionButtonsDetail.map((item) => (
            <Actionbutton key={item.title} title={item.title} url={item.url} />
          ))}
        </div>
        <Faq />
      </div>
      <Footer />
    </div>
  )
}

export default Home
