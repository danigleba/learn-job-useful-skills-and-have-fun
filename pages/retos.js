import Head from 'next/head'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Feed from '@/components/Feed'
import {useRouter} from 'next/router';
import { useState, useEffect } from 'react'
import Bottombar from '@/components/Bottombar'
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()
  const [showConfetti, setShotConfetti] = useState(false)
  const [challenges, setChallenges] = useState([])
  const page = "retos"

  useEffect(() => {
    const url = '/api/challenges/getChallenges'
    fetch(url)
          .then(response => response.json())
          .then(data => setChallenges(data.data))
  }, [])

  function runConfetti() {
    setShotConfetti(true)
  }
  
  function hideConfetti() {
    setShotConfetti(false)
  }

  return (
    <>
      <Head>
          <title>Kualify | Retos</title>
          <meta name="description" content="Your meta description goes here" />
          <meta name="author" content="Kualify App" />
          <link rel="icon" href="/icon.png" />
          <link rel="canonical" href="https://app.kualify.es/"/>
          <meta property="og:title" content="Kualify App" />
          <meta property="og:description" content="Your meta description goes here" />
          <meta property="og:image" content="https://example.com/og-image.jpg" />
      </Head>
      <div className='h-screen flex justify-center fixed z-50'>
        <div className='flex justify-center'>
                        {showConfetti ? (
                              <Confetti
                              height={window.height}
                              recycle={false}
                              numberOfPieces={600}
                              onConfettiComplete={hideConfetti}/> 
                          ) : (<></>)}
                        </div>
        </div>
      <main className='bg-white'>
        <Navbar page={page}/>
        <Bottombar page={page}/>
        <div className='pt-10 md:pt-12 md:pt-12 pb-16 px-8 space-y-4'>
          <p className='font-extrabold text-4xl text-[#333533] text-center flex justify-center'>Completa todos los retos</p>
          <p className='font-light text-xl text-[#333533] text-center flex justify-center'>Sal de tu zona de confort, supera tus límites y sube de nivel completando retos</p>
        </div>
        <div>
        
        <div className='grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-12 px-6 md:mx-12 pb-24'>
  {challenges?.map(item => (
    <a key={item.id}>
      <div className=' h-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-xl p-4 flex flex-col'>
        <div className='flex gap-4'>
          <div className='w-1/5 bg-[#f4f4f4] rounded-md px-2 w-full px-3 py-1.5 text-[#333533] text-md font-semibold text-center'>
            <p>{`${(item?.category == "Social Skills") ? "👋" : ""}`}</p>
            <p>{`${(item?.category == "Entrepreneurship") ? "💼" : ""}`}</p>
            <p>{`${(item?.category == "Productivity") ? "👩‍💻" : ""}`}</p>
            <p>{`${(item?.category == "Personal Finance") ? "💶" : ""}`}</p>
          </div>
          <div className='w-4/5 bg-[#f4f4f4] rounded-md px-2 w-full px-3 py-1.5 text-[#333533] text-md font-semibold text-center'>
            <p>{`${(item?.category == "Social Skills") ? "Habilidades Sociales" : ""}`}</p>
            <p>{`${(item?.category == "Entrepreneurship") ? " Emprendimiento" : ""}`}</p>
            <p>{`${(item?.category == "Productivity") ? "Productividad" : ""}`}</p>
            <p>{`${(item?.category == "Personal Finance") ? "Finanzas Personales" : ""}`}</p>
          </div>
        </div>
        <div className='flex-grow'></div> {/* This div will push the button to the bottom */}
          <div className='pt-6'>
            <div className='px-8'>
              <p className=' text-center text-[#333533] font-bold text-2xl pb-2'>{item?.title}</p>
            </div>
            <div className='px-4'>
              <p className='text-center text-[#333533] font-light text-md pb-8 '>{item?.description}</p>
            </div>
          </div>
        <div className='flex-grow'></div> {/* This div will push the button to the bottom */}
        <div className=''>
          <button onClick={runConfetti} className='hover:shadow-[0_8px_30px_rgb(0,0,0,0.05)] duration-200 self-end text-center bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-yellow-200 via-emerald-200 to-yellow-200  w-full py-3 text-[#333533] font-bold rounded-md align-bottom duration-200'>
            ¡Lo he hecho!
          </button>
        </div>
      </div>
    </a>
  ))}
</div>

        </div>
       <Footer />
      </main>
    </>
  )
}
