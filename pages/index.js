import Head from 'next/head'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Feed_Videos from '@/components/Feed_Videos'
import Feed_Videos_Active from '@/components/Feed_Videos_Active'
import {useRouter} from 'next/router';
import { useState } from 'react'
import Bottombar from '@/components/Bottombar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()
  const [feedLoading, setFeedLoading] = useState(true)
  const page = "videos"

  return (
    <>
      <Head>
          <title>Kualify | Vídeos</title>
          <meta name="description" content="Your meta description goes here" />
          <meta name="author" content="Kualify App" />
          <link rel="icon" href="/icon.png" />
          <link rel="canonical" href="https://app.kualify.es/"/>
          <meta property="og:title" content="Kualify App" />
          <meta property="og:description" content="Your meta description goes here" />
          <meta property="og:image" content="https://example.com/og-image.jpg" />
      </Head>
      <main>
        <Navbar page={page} />
        <Bottombar page={page}/>
        <div>
            <Feed_Videos_Active />
            <div className='pt-12 md:pt-12 px-8'>
                <p className='font-extrabold text-4xl text-[#333533] text-center flex justify-center'>Explora todos lo vídeos</p>
            </div>
            <Feed_Videos/>
        </div>
        <Footer />
      </main>
    </>
  )
}
