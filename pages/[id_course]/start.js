import Head from 'next/head'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import YouTube from 'react-youtube'

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

      <main className="bg-gray-200">
                <div className="pt-6 justify-center">
                    <div className="pl-10 pr-10 md:flex justify-between">
                        <h2 className="text-4xl font-bold content-center">{course.title}</h2>
                        {course.tags?.map(item => (
                            <a key={item}>
                               <div className="inline-block">
                                  <p className="tag" >{item}</p>
                                </div>
                            </a>))} 
                    </div>
                    <div className="justify-center p-6 md:flex md:gap-8">
                        <div className="bg-white md:w-1/2 pl-8 pr-8 pt-6 rounded-lg bg-blue-300">   
                            <div className="pt-4">
                                <a className="">{course.description}</a>
                            </div> 
                            <div className="w-28">
                                <button onClick={startCourse} className="bg-blue-500 w-28 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Empezar curso</button>
                            </div>   
                        </div>
                        <div className="rounded-lg overflow-hidden md:h-full">
                            <YouTube opts={videoOpts} videoId={course && course.intro_video && course.intro_video.url}></YouTube>
                        </div>
                    </div>
                </div>
            </main>
    </>
  )
}
