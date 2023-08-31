import Head from 'next/head'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Feed from '@/components/Feed'
import {useEffect, useState} from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/utils/firebase'
import Router, {useRouter} from 'next/router';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()
  return (
    <>
      <Head>
          <title>Kualify | Menu principal</title>
          <meta name="description" content="Your meta description goes here" />
          <meta name="author" content="Kualify App" />
          <link rel="icon" href="/icon.png" />
          <link rel="canonical" href="https://app.kualify.es/"/>
          <meta property="og:title" content="Kualify App" />
          <meta property="og:description" content="Your meta description goes here" />
          <meta property="og:image" content="https://example.com/og-image.jpg" />
      </Head>
      <main className='bg-white'>
        <Navbar />
        <div className='pt-12 pb-24 px-8'>
          <p className='font-extrabold text-4xl text-[#333533] text-center flex justify-center'>¿Cómo vas a mejorar hoy?</p>
          <Feed />
          <div className='flex justify-center items-center'>
              <div className='cursor-pointer  w-max flex justify-center items-center '>
                <a target="_blank" href="https://kualify.es/cursos" className='hover:text-white hover:bg-[#333533] duration-200 flex items-center rounded-full mt-16 px-12 py-2 border-2 border-[#333533] text-lg text-center flex justify-center text-[#333533] font-medium'>Más cursos próximamente</a>
              </div>
          </div>
        </div>
       <Footer />
      </main>
    </>
  )
}
