import Head from 'next/head'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import YouTube from 'react-youtube'
import Feed from '@/components/Feed'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const router = useRouter()
    const { id_course } = router.query
    const [course, setCourse] = useState({})

    const videoOpts = {
      playerVars: {
        start: course && course.intro_video && course.intro_video.start_time, 
        end: course && course.intro_video && course.intro_video.end_time,
        controls: 0,
        showinfo: 0,
        rel: 0,
        disablekb: 1,
        iv_load_policy: 0,
        modestbranding: 1,
        showinfo: 0 
      },
    };

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
        <main className="text-center text-[#1A1C1F]">
            <Navbar />
                    <div className="justify-center">
                        <div className="pl-10 pr-10 pb-6">
                            {course.tags?.map(item => (
                                <a key={item}>
                                <div className="inline-block pb-4">
                                    <p className="font-semibold py-1.5 px-6 badge rounded-md bg-[#1A1C1F] cursor-pointer text-white" >{item}</p>
                                    </div>
                                </a>))} 
                            <h2 className="text-4xl font-bold content-center">{course.title}</h2>
                            <h2 className="text-xl font-semibold pt-4">Introducción</h2>
                        </div>
                        <div className="justify-center p-6 flex md:gap-8">
                            <div className="rounded-lg overflow-hidden md:w-max shadow-md">
                                <YouTube opts={videoOpts} videoId={course && course.intro_video && course.intro_video.url}/>
                            </div>
                        </div>
                        <div className="pb-20 pt-6">
                            <button className="bg-[#1A1C1F] text-white w-96 py-3 rounded-md hover:bg-[#2C3036] font-bold shadow-md" onClick={startCourse}>Empezar curso</button>
                        </div>
                        <Feed />
                    </div>
        </main>
    </>
  )
}
