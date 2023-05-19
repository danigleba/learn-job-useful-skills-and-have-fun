import Head from 'next/head'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const router = useRouter()
    const { id_course } = router.query
    const [course, setCourse] = useState({})

    function startCourse() {
        router.push(`/${id_course}`);
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
            <div className="pt-6 justify-center">
                <div className="pl-10 pr-10 flex justify-between">
                     <h2 className="text-4xl font-bold content-center">{course.title}</h2>
                     {course.tags?.map(item => (
                        <a key={item}>
                           <div className="inline-block">
                              <p className="tag" >{item}</p>
                            </div>
                        </a>))} 
                </div>
                <p>{course.description}</p>
                <img className="w-80" src={course.cover_url}></img>
                <button className='bg-red-500'onClick={startCourse} >Start course</button>
            </div>
        </main>
    </>
  )
}
