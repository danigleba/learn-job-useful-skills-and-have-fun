import Head from "next/head"
import Router, { useRouter } from "next/router"
import { useState, useEffect, useRef, Fragment} from "react"
import { Dialog, Transition } from '@headlessui/react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Playlist from "@/components/Playlist"
import { limit } from "firebase/firestore"
//import { limit } from "firebase/firestore"

export default function Id() {
    const router = useRouter()
    const { id_course } = router.query
    const [course, setCourse] = useState({})
    const [user, setUser] = useState()
    const [quiz, setQuiz] = useState({})
    const [cookie, setCookie] = useState()

    const [limitStep, setLimitStep] = useState()
    const [activeStep, setActiveStep] = useState()

    const [isOpen, setIsOpen] = useState(false)    
    const [answColor1, setAnswColor1] = useState("")
    const [answColor2, setAnswColor2] = useState("")
    const [answColor3, setAnswColor3] = useState("")
    const [answColor4, setAnswColor4] = useState("")
    const answColors = [setAnswColor1, setAnswColor2, setAnswColor3, setAnswColor4]

    const checkAuth = async () => {  
      const response = await fetch("/api/auth/checkAuth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      })  
      const data = await response.json()
      if (!data.cookieExists) {
        Router.push("/login")
      } else {
        setCookie(true)
      }
    } 

    const checkSubscription = async () => {
      try {
        const response = await fetch('/api/auth/checkSubscription', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          //body: JSON.stringify({ email }),
        })
        const data = await response.json();
        if (data.subscribed) {
          return
        } else {
          Router.push("/renovar-suscripcion")
        }
      } catch (error) {
        console.error('Error checking email:', error);
      }
    }

    const handleGetUser = async () => {
     // try {
        const response = await fetch("/api/user/getUser",  {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
        },
        })
        const data = await response.json()
        setUser(data.data)
     // } //catch (error) {
       //   console.error('Error getting user:', error);
     // }
    }

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
      setActiveStep(data?.progress?.active_step)
      setLimitStep(data?.progress?.limit_step)
    } 

    const handleNextStep = async (e) => { 
      if (e.target.value) {
          answColors[e.target.id]("focus:bg-green-400")
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
          Router.reload()
      } else {
          answColors[e.target.id]("focus:bg-red-600")
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
    Router.reload()
  }

    useEffect(() => {
      window.scrollTo(0, 0)
      checkAuth()
    }, [])

    useEffect(() => {       
        handleGetQuiz()
        handleGetCourse()
    }, [id_course])
    
    useEffect(() => {
      if (cookie) {
        checkSubscription()
        handleGetUser()
      }
    }, [cookie])

   useEffect(() => {  
      if (user?.email?.length > 0) {
        getProgress()
      }
    }, [user, id_course])

    function closeModal() {
        setIsOpen(false)
    }
    function openModal() {
        setIsOpen(true)
    }

    useEffect(() => {
        //Resets the bg colors when clicked of the buttons
        setAnswColor1("")
        setAnswColor2("")
        setAnswColor3("")
        setAnswColor4("")        
        }, [activeStep])

      //Prevents user from rigth clicking and downloading a video
      const handleContextMenu = (e) => {
        e.preventDefault()
      }
    return (
        <>
            <Head>
                <title>Kualify | {course?.title}</title>
                <meta name="description" content="Your meta description goes here" />
                <meta name="author" content="Kualify App" />
                <link rel="icon" href="/icon.png" />
                <link rel="canonical" href={`https://app.kualify.es/${id_course}`}/>
                <meta property="og:title" content="Kualify App" />
                <meta property="og:description" content="Your meta description goes here" />
                <meta property="og:image" content="https://example.com/og-image.jpg" />
            </Head>    
            <main className="text-center bg-white">
                <Navbar />
                <div className="pt-12">
                    <div className="pl-6 pr-6 pb-6">
                        {course?.tags?.map(item => (
                            <a key={item}>
                               <div className="inline-block pb-4">
                                    <p className="tag">{item}</p>
                                </div>
                            </a>))} 
                        <h2 className="text-3xl sm:text-4xl font-extrabold content-center text-gray-800">{course?.title}</h2>
                        <h2 className="truncate text-xl text-[#1A1C1F] font-medium pt-2">{parseInt(activeStep) +1}. {course && course?.steps && course?.steps[activeStep] && course?.steps[activeStep].title}</h2>
                    </div>

                    <div className="flex justify-center pt-2 md:pt-6 px-4">
                            <div className="shadow-xl rounded-lg overflow-hidden ">
                                <video src={course && course?.steps && course?.steps[activeStep] && course?.steps[activeStep]?.video_url} type="video/mp4" width="1024" height="960" controls controlsList="nodownload" onContextMenu={handleContextMenu}></video>
                            </div>
                    </div>
                    <div className="pb-16 pt-10 mx-6 space-y-4 space-x-2 sm:space-x-4">
                        <button className={`border-2 border-[#333533] rounded-lg ring-transparent text-[#333533] px-6 sm:px-12 py-2.5 rounded-lg font-bold text-center text-base; ${activeStep > 0 ? "inline-block" : "hidden"}`} onClick={goBack} >Atrás</button>
                        <button className={`btn-primary ${((parseInt(activeStep)+1) >= course?.steps?.length) ? "hidden" : "inline-block"}`} onClick={openModal}>Continuar</button>
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
                                        <input type="text" autoFocus className="opacity-0 absolute"/>
                                        <div className="justify-center text-[#1A1C1F]">
                                            <div className="grid content-center grid-cols-1 md:grid-cols-2 pt-8">
                                                <div className="p-2">
                                                    <button 
                                                        onClick={handleNextStep}
                                                        id={0}
                                                        value={quiz && quiz.questions && quiz.questions[activeStep] && quiz.questions[activeStep].answers && quiz.questions[activeStep].answers[0] && quiz.questions[activeStep].answers[0].value}
                                                        className={`btn-quiz ${answColor1}`}>{quiz && quiz.questions && quiz.questions[activeStep] && quiz.questions[activeStep].answers && quiz.questions[activeStep].answers[0].title}</button>
                                                </div>
                                                <div className="p-2">
                                                    <button 
                                                        onClick={handleNextStep}
                                                        id={1}
                                                        value={quiz && quiz.questions && quiz.questions[activeStep] && quiz.questions[activeStep].answers && quiz.questions[activeStep].answers[1] && quiz.questions[activeStep].answers[1].value}
                                                        className={`btn-quiz ${answColor2}`}>{quiz && quiz.questions && quiz.questions[activeStep] && quiz.questions[activeStep].answers && quiz.questions[activeStep].answers[1].title}</button>
                                                </div>
                                                <div className="p-2">
                                                    <button 
                                                        onClick={handleNextStep}
                                                        id={2}
                                                        value={quiz && quiz.questions && quiz.questions[activeStep] && quiz.questions[activeStep].answers && quiz.questions[activeStep].answers[2] && quiz.questions[activeStep].answers[2].value}                                                        
                                                        className={`btn-quiz ${answColor3}`}>{quiz && quiz.questions && quiz.questions[activeStep] && quiz.questions[activeStep].answers && quiz.questions[activeStep].answers[2].title}</button>
                                                </div>
                                                <div className="p-2">
                                                    <button 
                                                        onClick={handleNextStep}
                                                        id={3}
                                                        value={quiz && quiz.questions && quiz.questions[activeStep] && quiz.questions[activeStep].answers && quiz.questions[activeStep].answers[3] && quiz.questions[activeStep].answers[3].value}                                                           
                                                        className={`btn-quiz ${answColor4}`}>{quiz && quiz.questions && quiz.questions[activeStep] && quiz.questions[activeStep].answers && quiz.questions[activeStep].answers[3].title}</button>
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
