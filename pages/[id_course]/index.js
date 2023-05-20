import Head from "next/head"
import Router, { useRouter } from "next/router"
import { useState, useEffect, Fragment} from "react"
import Image from "next/image"
import axios from "axios"
import YouTube from 'react-youtube'
import { Dialog, Transition } from '@headlessui/react'

export default function Id() {
    const router = useRouter()
    const { id_course } = router.query
    const [course, setCourse] = useState({})
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [activeStep, setActiveStep] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    const [videoKey, setVideoKey] = useState("")
    const courseLenght = course && course.steps && course.steps.length
    

    const videoOpts = {
        playerVars: {
          start: course && course.steps && course.steps[activeStep] && course.steps[activeStep].video.start_time, 
          end: course && course.steps && course.steps[activeStep] && course.steps[activeStep].video.end_time,
          controls: 0,
          showinfo: 0,
          rel: 0,
          disablekb: 1,
          iv_load_policy: 0,
          modestbranding: 1,
          showinfo: 0 
        },
      };

    function nextStep() {
        setActiveStep(activeStep + 1)
        setIsOpen(false)
        setVideoKey(videoKey + 1)
    }

    function goIndex() {
        router.push("/")
    }

    const handleGetUser = async () => {  
        const credentials = { email, password } 
        const user = await axios.post("/api/auth/checkAuth", credentials)
        console.log(email)
        if (user.data.message == "Cookie not found") {
          Router.push("/login")
        }
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

    useEffect(() => {
        handleGetUser()
    }, [])

    useEffect(() => {
        if ((activeStep +1) > courseLenght) {
            router.push(`/${id_course}/end`)
        }}, [activeStep])
    
    function closeModal() {
        setIsOpen(false)
      }
    
      function openModal() {
        setIsOpen(true)
      }
    return (
        <>
            <Head>
                <title>Kualify</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/icon.png" />
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
                            <h2 className="text-2xl font-bold pt-4">{activeStep + 1}. {course && course.steps && course.steps[activeStep] && course.steps[activeStep].title}</h2>
                            <div className="pt-4">
                                <a className="">{course && course.steps && course.steps[activeStep] && course.steps[activeStep].description}</a>
                            </div>
                            <div className="w-28">
                                <button onClick={openModal} className="bg-blue-500 w-28 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Lo tengo!</button>
                            </div>     
                        </div>
                        <div className="rounded-lg overflow-hidden md:h-full">
                            <YouTube key={videoKey} opts={videoOpts} videoId={course && course.steps && course.steps[activeStep] && course.steps[activeStep].video.url}/>
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
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-black bg-opacity-25" />
                            </Transition.Child>

                            <div className="fixed inset-0 overflow-y-auto">
                                <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h5"
                                            className="text-2xl font-bold leading-6 text-gray-900 text-center"
                                        >
                                            Un repasito...
                                        </Dialog.Title>
                                        
                                        <div>
                                            <h2 className="text-center text-xl pt-4">¿Por que el binario es la base de la programación?</h2>
                                        </div>
                                        <div className="justify-center">
                                            <div className="p-2 pt-8">
                                                <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:bg-green-400">Example for 1 answer</button>
                                            </div>
                                            <div className="p-2">
                                                <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:bg-green-400">Example for 1 answer</button>
                                            </div>
                                            <div className="p-2">
                                                <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:bg-green-400">Example for 1 answer</button>
                                            </div>
                                            <div className="p-2">
                                                <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:bg-green-400">Example for 1 answer</button>
                                            </div>
                                            <div className="p-2">
                                                <button onClick={nextStep} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Vamos!</button>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                                </div>
                            </div>
                            </Dialog>
                        </Transition>
                    </div>
                </div>
            </main>
        </>
    )
}

