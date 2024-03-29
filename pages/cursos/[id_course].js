import Head from "next/head"
import { useRouter } from "next/router"
import { useState, useEffect, useRef, Fragment} from "react"
import { Dialog, Transition } from '@headlessui/react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Playlist from "@/components/Playlist"
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/utils/firebase'
import Bottombar from '@/components/Bottombar'

import YouTubeVideo from '@/components/Youtube';


export default function Id() {
  const router = useRouter()
  const { id_course } = router.query
  const [course, setCourse] = useState({})
  const [user, setUser] = useState()
  const [quiz, setQuiz] = useState({})
  const [videoEnded, setVideoEnded] = useState(false)

  const [limitStep, setLimitStep] = useState()
  const [activeStep, setActiveStep] = useState(null)

  const [isOpen, setIsOpen] = useState(false)    
  
  function checkEmailFormat(str) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(str)
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } 
    })    
  }, [] )

    function handleGetQuiz() {
      if (!id_course) {
          return
      }
      var url = "/api/quizzes/getQuiz?id_course=" + id_course
      fetch(url)
        .then(response => response.json())
        .then(data => setQuiz(data.data))
    }

    function handleGetCourse() {
        if (!id_course) {
            return
        }
        var url = "/api/courses/getCourse?id_course=" + id_course
        fetch(url)
          .then(response => response.json())
          .then(data => setCourse(data.course))
    }

    const getProgress = async () => {  
      const url = "/api/courses/getProgress?id_course=" + id_course + "&email=" + user?.email
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      if (data.fakeCourse) {
        router.push("/404")
      }
      setActiveStep(data?.progress?.active_step)
      setLimitStep(data?.progress?.limit_step)
    } 

    const handleNextStep = async (e) => { 
      if (e.target.value == "true") {
          e.target.className="btn-quiz text-white bg-green-400"
          const url = "/api/courses/progress+1?id_course=" + id_course + "&email=" + user.email + "&activeStep=" + activeStep
          const response = fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
          })
          //Ads 1 to the limitStep
          if (activeStep == limitStep) {
            const url = "/api/courses/limit+1?id_course=" + id_course + "&email=" + user.email + "&limitStep=" + limitStep
            const response = fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              }
            })
          }
          //Timeout for green background to load in safari
          const timer = setTimeout(() => {
            router.reload() 
          }, 200);
      } else {
        e.target.className="btn-quiz text-white bg-red-500"

      }
  }

  const goBack = async (e) => {
    const url = "/api/courses/progress-1?id_course=" + id_course + "&email=" + user.email + "&activeStep=" + activeStep
    const response = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    router.reload()
  }

  function endCourse() {   
    const url = "/api/courses/endCourse?id_course=" + id_course + "&email=" + user?.email
    fetch(url)
        .then(response => response.json())
    router.push(`/cursos/completado/${id_course}`)
  }


    useEffect(() => {       
        handleGetCourse()
    }, [id_course])
    
   useEffect(() => {  
    if (checkEmailFormat(user?.email)) {
        getProgress()
       // handleGetQuiz() 
      }
    }, [user, id_course])

    useEffect(() => {  
      if ((parseInt(activeStep)+1) <= (course?.steps?.length)) {
        handleGetQuiz() 
     }}, [activeStep])
  

    function closeModal() {
        setIsOpen(false)
    }
    function openModal() {
        setIsOpen(true)
    }

    useEffect(() => {
      if (activeStep !=null) {
        window.scrollTo({top: 0, behavior: 'smooth'})
      }
      setVideoEnded(false)      
        }, [activeStep])

      //Prevents user from rigth clicking and downloading a video
      const handleContextMenu = (e) => {
        e.preventDefault()
      }

  function handleVideoEnd() {
    setVideoEnded(true)    
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
            <main className="text-center">
                <Navbar />
                <Bottombar />  
                <div className="pt-10">
                    <div className="pl-6 pr-6 pb-6">
                        {course?.tags?.map(item => (
                            <a key={item}>
                               <div className="inline-block pb-4">
                                    <p className="tag">{item}</p>
                                </div>
                            </a>))} 
                        <h2 className="text-2xl sm:text-4xl font-extrabold content-center text-gray-800">{course?.title}</h2>
                        <h2 className="truncate text-xl text-[#1A1C1F] font-medium pt-2">{parseInt(activeStep) +1}. {course && course?.steps && course?.steps[activeStep] && course?.steps[activeStep].title}</h2>
                    </div>
                    <div className="flex justify-center pt-2 md:pt-6">
                      {(course?.tag != "Course" && (course?.steps && course?.steps[activeStep] && course?.steps[activeStep].start_time ) != null) ? (
                          <YouTubeVideo videoEnded={videoEnded} start_time={course?.steps && course?.steps[activeStep] && course?.steps[activeStep].start_time} end_time={course?.steps && course?.steps[activeStep] && course?.steps[activeStep].end_time} videoId={course?.video_url} onVideoEnd={handleVideoEnd} />            
                      ) : (
                        <div className={`bg-[#f4f4f4] shadow-[0_8px_30px_rgb(0,0,0,0.08)] md:rounded-xl overflow-hidden ${videoEnded ? "hidden" : ""}`}>
                          <video src={course && course?.steps && course?.steps[activeStep] && course?.steps[activeStep]?.video_url} type="video/mp4" width="1024" height="960" controls controlsList="nodownload" onContextMenu={handleContextMenu}></video>
                        </div>
                      )}
                    </div>
                    <div className="pb-16 pt-10 mx-6 space-y-4 space-x-2 sm:space-x-4">
                        <button className={`py-3 hover:scale-105 duration-200 rounded-lg bg-[#f4f4f4] ring-transparent text-[#333533] px-6 sm:px-12 rounded-lg font-bold text-center text-base; ${activeStep > 0 ? "inline-block" : "hidden"}`} onClick={goBack} >Atrás</button>
                        <button className={`btn-primary hover:scale-105 shadow-[0_8px_30px_rgb(0,0,0,0.08)] duration-200 ${((parseInt(activeStep)+1) >= course?.steps?.length) ? "hidden" : "inline-block"}`} onClick={openModal}>Continuar</button>
                        <button className={`py-3 hover:scale-105 duration-200 rounded-lg bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-yellow-200 via-emerald-200 to-yellow-200 ring-transparent text-[#333533] px-6 sm:px-12 rounded-lg font-bold text-center text-base; ${((parseInt(activeStep) + 1) == course?.steps?.length) ? "" : "hidden"}`} onClick={endCourse} >Completar curso</button>

                    </div>
                    <Transition appear show={isOpen} as={Fragment}>
                        <Dialog as="div" className="relative z-10" onClose={closeModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0">
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>
                        <div className="fixed inset-0 overflow-y-auto w-full ">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95">
                                    <Dialog.Panel className="w-full md:w-2/3 lg:w-1/2 wtransform overflow-hidden rounded-xl bg-white p-8 text-left align-middle transition-all">
                                        <div className="">
                                            <h2 className="text-center text-2xl font-bold">{quiz && quiz.questions && quiz.questions[activeStep] && quiz.questions[activeStep].title}</h2>
                                        </div>
                                        {/*In order to delete the top-left's button's autoFocus, this invisible input is created and set to autoFocus instead*/}
                                        <input type="text" className="opacity-0 absolute"/>
                                        <div className="justify-center text-[#1A1C1F]">
                                            <div className="grid content-center grid-cols-1 md:grid-cols-2 pt-8">
                                                <div className="p-2">
                                                    <button 
                                                        onClick={handleNextStep}
                                                        id={0}
                                                        value={quiz && quiz.questions && quiz.questions[activeStep] && quiz.questions[activeStep].answers && quiz.questions[activeStep].answers[0] && quiz.questions[activeStep].answers[0].value}
                                                        className={`btn-quiz hover:bg-[#333533] hover:text-white`}>{quiz && quiz.questions && quiz.questions[activeStep] && quiz.questions[activeStep].answers && quiz.questions[activeStep].answers[0].title}</button>
                                                </div>
                                                <div className="p-2">
                                                    <button                                       
                                                        onClick={handleNextStep}
                                                        id={1}
                                                        value={quiz && quiz.questions && quiz.questions[activeStep] && quiz.questions[activeStep].answers && quiz.questions[activeStep].answers[1] && quiz.questions[activeStep].answers[1].value}
                                                        className={`btn-quiz hover:bg-[#333533] hover:text-white`}>{quiz && quiz.questions && quiz.questions[activeStep] && quiz.questions[activeStep].answers && quiz.questions[activeStep].answers[1].title}</button>
                                                </div>
                                                <div className="p-2">
                                                    <button 
                                                        onClick={handleNextStep}
                                                        id={2}
                                                        value={quiz && quiz.questions && quiz.questions[activeStep] && quiz.questions[activeStep].answers && quiz.questions[activeStep].answers[2] && quiz.questions[activeStep].answers[2].value}                                                        
                                                        className={`btn-quiz hover:bg-[#333533] hover:text-white`}>{quiz && quiz.questions && quiz.questions[activeStep] && quiz.questions[activeStep].answers && quiz.questions[activeStep].answers[2].title}</button>
                                                </div>
                                                <div className="p-2">
                                                    <button 
                                                        onClick={handleNextStep}
                                                        id={3}
                                                        value={quiz && quiz.questions && quiz.questions[activeStep] && quiz.questions[activeStep].answers && quiz.questions[activeStep].answers[3] && quiz.questions[activeStep].answers[3].value}                                                           
                                                        className={`btn-quiz hover:bg-[#333533] hover:text-white`}>{quiz && quiz.questions && quiz.questions[activeStep] && quiz.questions[activeStep].answers && quiz.questions[activeStep].answers[3].title}</button>
                                                </div>
                                            </div>
                                        </div>       
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                        </Dialog>
                    </Transition>
                </div>
                <Playlist user={user} activeStep={activeStep} limitStep={limitStep} id_course={router.query.id_course}/>
               <Footer />
            </main>
        </>
    )
}
