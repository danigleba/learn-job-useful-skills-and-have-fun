import Head from 'next/head'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import {useEffect, useState} from 'react'
import Feed from "@/components/Feed"
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const router = useRouter()
    const { id_course } = router.query

    const [course, setCourse] = useState({})
    function goIndex() {
        router.push("/")
    }

    useEffect(() => {
      if (!id_course) {
          return
      }
      var url = "/api/courses/getCourse?id_course=" + id_course
      fetch(url)
        .then(response => response.json())
        .then(data => setCourse(data.course))
  }, [id_course])
  return (
    <>
      <Head>
        
          <title>Kualify App</title>
          <meta name="description" content="Your meta description goes here" />
          <meta name="author" content="Kualify App" />
          <link rel="icon" href="/path/to/favicon.ico" />

          <link rel="canonical" href="https://app.kualify.es/" />

          <meta property="og:title" content="Kualify App" />
          <meta property="og:description" content="Your meta description goes here" />
          <meta property="og:image" content="https://example.com/og-image.jpg" />
          
      </Head>

      <main className={`${inter.className}`}>
        <Navbar />
        <div className='justify-center pt-12 text-[#1A1C1F]'>
          <h1 className='text-3xl font-bold text-center'>¡Felicidades! 🎉</h1>
            <h1 className='text-xl text-center font-semibold pt-2'>Has completado el curso: {course.title}</h1>
          <div className='pt-8 pb-16 flex justify-center'>
            <button className="bg-[#1A1C1F] text-white w-96 py-3 rounded-md hover:bg-[#2C3036] font-bold shadow-md" onClick={goIndex}>Volver</button>
          </div>
          <Feed />
       </div>
      </main>
      
    </>
  )
}
