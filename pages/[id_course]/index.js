import Head from "next/head"
import Image from "next/image"
import Router, { useRouter } from "next/router"
import { useState, useEffect, useRef, Fragment} from "react"
import YouTube from 'react-youtube'
import { Dialog, Transition } from '@headlessui/react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Related from "@/components/Related"
import Feed from "@/components/Feed"

export default function Id() {
    const router = useRouter()
    const { id_course } = router.query
    const [course, setCourse] = useState({})
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [activeStep, setActiveStep] = useState(0)
    const [quiz, setQuiz] = useState({})
    const [isOpen, setIsOpen] = useState(false)
    const [videoKey, setVideoKey] = useState("")
    
    const [answColor1, setAnswColor1] = useState("")
    const [answColor2, setAnswColor2] = useState("")
    const [answColor3, setAnswColor3] = useState("")
    const [answColor4, setAnswColor4] = useState("")
    const answColors = [setAnswColor1, setAnswColor2, setAnswColor3, setAnswColor4]

    const [screenWidth, setScreenWidth] = useState(null)
    const [screenBreackpoint, setScreenBreackpoint] = useState("")
    const [videoWidth, setVideoWidth] = useState("")
    const [videoHeight, setVideoHeight] = useState("")

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

    const handleNextStep = (e) => {
        if (e.target.value == "true") {
            //Waits 600ms before closing the modal to make sure the users sees the answer has turned green
            answColors[e.target.id]("focus:bg-green-400")
            setTimeout(() => {
                setIsOpen(false)
                 //Waits 300ms to change the step only once the "Closing Modal" animation is over in order to make the transition between steps cleaner
                setTimeout(() => {
                if ((activeStep + 2)  > (course && course.steps && course.steps.length)) {
                    router.push(`/${id_course}/outro`)
                } else {
                    window.scrollTo(0, 0)
                    setActiveStep(activeStep + 1)
                    setVideoKey(videoKey + 1) 
                }
              }, 300)
            }, 250)        
        } if (e.target.value == "false")  {
            answColors[e.target.id]("focus:bg-red-400")
        }
    }

    function closeModal() {
        setIsOpen(false)
    }
    
    function openModal() {
        setIsOpen(true)
    }

    useEffect(() => {
        checkAuth()
        //Gets screen width in orther to be able to make the Youtube video responsive.
        const handleResize = () => {
          setScreenWidth(window.innerWidth)
        }
        setScreenWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        return () => {
          window.removeEventListener('resize', handleResize)
        }
      }, [])

      useEffect(() => {       
        handleGetQuiz()
        handleGetCourse()
    }, [id_course])
    
    useEffect(() => {
        //Resets the bg colors when clicked of the buttons
        setAnswColor1("")
        setAnswColor2("")
        setAnswColor3("")
        setAnswColor4("")        
        }, [activeStep])

      useEffect(() => {
        if (screenWidth < 768) {
          setScreenBreackpoint("sm")
          //When screen width is sm, the video is is responsive to every width change to ensure adaptability to all mobile devices.
          setVideoWidth(screenWidth - 40)
          setVideoHeight((screenWidth - 40) / (16/9))
          setVideoKey(videoKey + 1)
        } else if (768 < screenWidth && screenWidth < 1024) {
          setScreenBreackpoint("md")
        } else {
          setScreenBreackpoint("lg")
        }
      }, [screenWidth])
  
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
      }, [screenBreackpoint])
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
            <main className="text-center">
                <Navbar />
                <div className="pt-12">
                    <div className="pl-10 pr-10 pb-6">
                        {course.tags?.map(item => (
                            <a key={item}>
                               <div className="inline-block pb-4">
                                    <p className="tag">{item}</p>
                                </div>
                            </a>))} 
                        <h2 className="text-3xl sm:text-4xl font-bold content-center text-gray-800">{course.title}</h2>
                        <h2 className="text-xl text-[#1A1C1F] font-semibold pt-4">{activeStep + 1}. {course && course.steps && course.steps[activeStep] && course.steps[activeStep].title}</h2>
                    </div>

                    <div className="flex justify-center p-6">
                        <div className="rounded-lg overflow-hidden shadow-md">
                            <video width="750" height="500" controls oncontextmenu="return false;" controlsList="nodownload">
                                <source src={course?.intro_video} type="video/mp4"/>
                            </video>
                        </div>
                    </div>

                    <div className="pb-16 pt-6 mx-4">
                        <button className="btn-primary" onClick={openModal}>Continuar</button>
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
                                    <Dialog.Panel className="sm:w-full md:w-1/2 wtransform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle transition-all">
                                        <Dialog.Title
                                            as="h5"
                                            className="text-xl font-semibold leading-6 text-[#1A1C1F] text-center pt-2">
                                            Antes de continuar...
                                    </Dialog.Title>  
                                        <div className="pt-2">
                                            <h2 className="text-center text-2xl font-bold  pt-4">{quiz && quiz.questions && quiz.questions[activeStep] && quiz.questions[activeStep].title}</h2>
                                        </div>
                                        {/*In order to delete the top-left's button's autoFocus, this invisible input is created and set to autoFocus instead*/}
                                        <input type="text" autoFocus className="opacity-0 absolute"/>
                                        <div className="justify-center text-[#1A1C1F]">
                                            <div className="grid content-center grid-cols-2 mx-2 pt-12">
                                                <div className="p-2 pl-0 text-right">
                                                    <button 
                                                        onClick={handleNextStep}
                                                        id={0}
                                                        value={quiz && quiz.questions && quiz.questions[activeStep] && quiz.questions[activeStep].answers && quiz.questions[activeStep].answers[0] && quiz.questions[activeStep].answers[0].value}
                                                        className={`btn-quiz ${answColor1}`}>{quiz && quiz.questions && quiz.questions[activeStep] && quiz.questions[activeStep].answers && quiz.questions[activeStep].answers[0].title}</button>
                                                </div>
                                                <div className="p-2 pr-0 text-left">
                                                    <button 
                                                        onClick={handleNextStep}
                                                        id={1}
                                                        value={quiz && quiz.questions && quiz.questions[activeStep] && quiz.questions[activeStep].answers && quiz.questions[activeStep].answers[1] && quiz.questions[activeStep].answers[1].value}
                                                        className={`btn-quiz ${answColor2}`}>{quiz && quiz.questions && quiz.questions[activeStep] && quiz.questions[activeStep].answers && quiz.questions[activeStep].answers[1].title}</button>
                                                </div>
                                                <div className="p-2 pl-0 text-right">
                                                    <button 
                                                        onClick={handleNextStep}
                                                        id={2}
                                                        value={quiz && quiz.questions && quiz.questions[activeStep] && quiz.questions[activeStep].answers && quiz.questions[activeStep].answers[2] && quiz.questions[activeStep].answers[2].value}                                                        
                                                        className={`btn-quiz ${answColor3}`}>{quiz && quiz.questions && quiz.questions[activeStep] && quiz.questions[activeStep].answers && quiz.questions[activeStep].answers[2].title}</button>
                                                </div>
                                                <div className="p-2 pr-0 text-left">
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
                <Related />
                <Feed />
               
            </main>
        </>
    )
}

