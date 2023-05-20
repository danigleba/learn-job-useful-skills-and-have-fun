import Head from 'next/head'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import {useEffect, useState} from 'react'

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
        <div className='h-ful bg-gray-200 justify-center'>
          <h1 className='text-3xl font-bold text-center'>Felicidades! <br /> Has completado el curso: <br /> {course.title}</h1>
          <div className='pt-6'>
            <button className='bg-red-400 w-32 h-12 rounded-md font-bold text-white' onClick={goIndex}>Go to feed</button>
          </div>
       </div>
      </main>
      
    </>
  )
}
