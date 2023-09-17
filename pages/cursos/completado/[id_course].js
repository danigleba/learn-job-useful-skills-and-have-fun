import Head from "next/head"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/utils/firebase'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import Feed_Videos_Active from "@/components/Feed_Videos_Active"
import Feed_Videos from "@/components/Feed_Videos"
import Bottombar from '@/components/Bottombar'

export default function Id() {
  const router = useRouter()
  const { id_course } = router.query
  const [course, setCourse] = useState({})
  const [user, setUser] = useState()
  //const { width, height } = useWindowSize()
  const [showConfetti, setShowConfetti] = useState(false)
    
    function handleGetCourse() {
        if (!id_course) {
            return
        }
        var url = "/api/courses/getCourse?id_course=" + id_course
        fetch(url)
        .then(response => response.json())
        .then(data => setCourse(data.course))
    }

    useEffect(() => {
        setTimeout(() => {
            setShowConfetti(true);
          }, 100);

        onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user)
        } 
        })    
    }, [] )

    useEffect(() => {
        handleGetCourse()
    }, [id_course])

    

    useEffect(() => {
        const url = "/api/courses/endCourse?id_course=" + id_course + "&email=" + user?.email
        fetch(url)
            .then(response => response.json())
    }, [user])
  
    function goIndex() {
        router.push("/")
    }

    function goBack() {
        router.back()
    }
    return (
        <>
            <Head>
                <title>Kualify | Cursos</title>
                <meta name="description" content="Your meta description goes here" />
                <meta name="author" content="Kualify App" />
                <link rel="icon" href="/icon.png" />
                <link rel="canonical" href={`https://app.kualify.es/${id_course}`}/>
                <meta property="og:title" content="Kualify App" />
                <meta property="og:description" content="Your meta description goes here" />
                <meta property="og:image" content="https://example.com/og-image.jpg" />
                <script src="https://www.youtube.com/iframe_api"></script>
            </Head> 
            <div className='h-screen flex justify-center fixed z-50'>
                <div className='flex justify-center'>
                        {showConfetti ? (
                              <Confetti
                              height={window.height}
                              recycle={false}
                              numberOfPieces={600}/> 
                          ) : (<></>)}
                </div>
            </div>   
            <main className="text-center ">
                <Navbar /> 
                <Bottombar /> 
                    <div className="text-center text-[#333533] pt-12 md:pt-24 space-y-4 px-6">
                        <p className="text-4xl font-extrabold">¡Felicidades! 🎉 </p>
                        <p className="text-xl font-light">Has ganado <a className="font-bold">+{course?.points} puntos</a> de <a className="font-bold">{course?.tag}</a>, así se hace 😎</p>
                    </div>
                    <div className="pt-12 mx-6 space-y-4 space-x-4 pb-16">
                        <button className="py-3 hover:scale-105 duration-200 rounded-lg bg-[#f4f4f4] ring-transparent text-[#333533] px-6 sm:px-12 rounded-lg font-bold text-center text-base" onClick={goBack}>Volver</button>
                        <button className="py-3 hover:scale-105 duration-200 rounded-lg bg-[#333533] ring-transparent text-white px-6 sm:px-12 rounded-lg font-bold text-center text-base" onClick={goIndex} >Ver más videos</button>
                    </div>
                    <Feed_Videos_Active />
                    <p className='pt-16 md:pt-12 text-[#333533] font-extrabold text-4xl px-6'>Explora todos los vídeos</p>
                    <Feed_Videos />
               <Footer />
            </main>
        </>
    )
}
