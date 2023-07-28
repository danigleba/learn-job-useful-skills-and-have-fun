import Head from 'next/head'
import { Inter } from 'next/font/google'
import Router, { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'
import YouTube from 'react-youtube'
import Feed from '@/components/Feed'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function Intro() {

  const router = useRouter()
  const { id_course } = router.query
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [course, setCourse] = useState({})
  const [videoKey, setVideoKey] = useState("")

  const [videoWidth, setVideoWidth] = useState("")
  const [videoHeight, setVideoHeight] = useState("")

  const [screenWidth, setScreenWidth] = useState(null);
  const [screenBreackpoint, setScreenBreackpoint] = useState("")

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    setScreenWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  useEffect(() => {
    if (screenWidth && screenWidth < 768) {
      setScreenBreackpoint("sm")
      setVideoWidth(screenWidth - 40)
      setVideoHeight((screenWidth - 40) / (16/9))
      setVideoKey(videoKey + 1)
    } else if (768 < screenWidth && screenWidth < 1024) {
      setScreenBreackpoint("md")
    } else {
      setScreenBreackpoint("lg")
    }
  }, [screenWidth]);

  useEffect(() => {
    if (screenBreackpoint == "sm") {
      setVideoWidth(screenWidth - 40)
      setVideoHeight((screenWidth - 40) / (16/9))
      setVideoKey(videoKey + 1)
    } else if (screenBreackpoint == "md") {
      setVideoWidth("625")
      setVideoHeight("351.5625")
      setVideoKey(videoKey + 1)
    } else if (screenBreackpoint == "lg") {
      setVideoWidth("700")
      setVideoHeight("393.75")
      setVideoKey(videoKey + 1)
    }

  }, [screenBreackpoint]);


  function startCourse() {
      Router.push("/" + id_course)
  } 
  
  useEffect(() => {
      if (!id_course) {
          return
      } else {
      var url = "/api/courses/getCourse?id_course=" + id_course
      fetch(url)
        .then(response => response.json())
        .then(data => setCourse(data.course))
      }
  }, [id_course])

  const checkAuth = async () => {  
    const credentials = { email, password }
    const response = await fetch("/api/auth/checkAuth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })  
    const data = await response.json(); 
    if (data.message == "Cookie not found") {
      Router.push("/login")
    }
  } 

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <>
      <Head>
        <title>Kualify | Aprende lo que la escuela no te enseñará.</title>
          <meta name="description" content="Your meta description goes here" />
          <meta name="author" content="Kualify App" />
          <link rel="icon" href="/icon.png" />
          <link rel="canonical" href="https://app.kualify.es/" />
          <meta property="og:title" content="Kualify App" />
          <meta property="og:description" content="Your meta description goes here" />
          <meta property="og:image" content="https://example.com/og-image.jpg" />
      </Head>
        <main className="text-center text-[#1A1C1F]">

            <Navbar />
                    <div className="justify-center pt-12">
                        <div className="mx-4 pb-4 sm:pb-6">
                            {course.tags?.map(item => (
                                <a key={item}>
                                <div className="inline-block pb-4">
                                    <p className="tag" >{item}</p>
                                    </div>
                                </a>))} 
                            <h2 className="text-3xl sm:text-4xl font-bold content-center">{course.title}</h2>
                            <h2 className="text-xl font-semibold pt-4">Introducción</h2>
                        </div>

                        <div className="flex justify-center p-6">
                            <div className="rounded-lg overflow-hidden shadow-md">
                                <video width="1024" height="960" controls oncontextmenu="return false;" controlsList="nodownload">
                                    <source src={'https://firebasestorage.googleapis.com/v0/b/kualify-web-fb.appspot.com/o/videos%2Ftest.mp4?alt=media&token=4b1fca2b-e849-424a-a075-6a3c10902f9f'} type="video/mp4"/>
                                </video>
                            </div>
                        </div>


                        <div className="pb-20 pt-6 mx-4">
                            <button className="btn-primary" onClick={startCourse}>Empezar curso</button>
                        </div>
                        <Feed />
                        
                    </div>
        </main>
    </>
  )
}
