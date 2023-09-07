import Head from 'next/head'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Feed from '@/components/Feed'
import {useRouter} from 'next/router';
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()
  const [feedLoading, setFeedLoading] = useState(true)
  const page = "cursos"

  return (
    <>
      <Head>
          <title>Kualify | Cursos</title>
          <meta name="description" content="Your meta description goes here" />
          <meta name="author" content="Kualify App" />
          <link rel="icon" href="/icon.png" />
          <link rel="canonical" href="https://app.kualify.es/"/>
          <meta property="og:title" content="Kualify App" />
          <meta property="og:description" content="Your meta description goes here" />
          <meta property="og:image" content="https://example.com/og-image.jpg" />
      </Head>
      <main className='bg-white'>
        <Navbar page={page}/>
        <div className='pt-6 md:pt-12 pb-24 px-8'>
          <p className='font-extrabold text-4xl text-[#333533] text-center flex justify-center'>¿Cómo vas a mejorar hoy?</p>
          <Feed />        
          <div className='flex justify-center items-center'>
              <div className='w-max flex justify-center items-center '>
                <a target="_blank" href="https://kualify.es/cursos" className='hover:text-white hover:bg-[#333533] duration-200 flex items-center rounded-full mt-16 px-12 py-2 border-2 border-[#333533] text-lg text-center flex justify-center text-[#333533] font-medium'>Más cursos próximamente</a>
              </div>
          </div>
        </div>
       <Footer />
      </main>
    </>
  )
}
