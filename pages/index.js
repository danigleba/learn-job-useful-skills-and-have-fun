import Head from 'next/head'
import {useState, useEffect} from 'react'
import { Inter } from 'next/font/google'
import Router from 'next/router';
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [email, setEmail] = useState("")
  const [user, setUser] = useState([])
  const [cookie, setCookie] = useState(false)

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
        body: JSON.stringify({ email }),
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

  function handleGetUser() {
    fetch("api/user/getUser")
      .then(response => response.json())
      .then(data => setUser(data.data))
      .catch(error => {
        console.error("Error fetching user:", error)
      })
  }

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (cookie) {
      checkSubscription()
      handleGetUser()
    }
  }, [cookie])

  return (
    <>
      <Head>
          <title>Kualify | Menu principal</title>
          <meta name="description" content="Your meta description goes here" />
          <meta name="author" content="Kualify App" />
          <link rel="icon" href="/icon.png" />
          <link rel="canonical" href="https://app.kualify.es/" />
          <meta property="og:title" content="Kualify App" />
          <meta property="og:description" content="Your meta description goes here" />
          <meta property="og:image" content="https://example.com/og-image.jpg" />
      </Head>
      <main>
        <Navbar />
        <div className='pt-12 pb-24'>
          <a className='font-extrabold text-4xl text-[#333533] text-center flex justify-center'>¿Cómo vas a mejorar hoy?</a>
        <div className='flex justify-center pt-12'>
        <div className="lg:space-y-0 grid lg:grid-cols-2 gap-12 justify-center mx-8 md:mx-24 w-2/3">
                  <div>
                    <Link href="/cursos/finanzas-personales">
                      <div className="flex justify-center items-center">
                        <div className="hover:bg-[#333533] duration-200 hover:text-white w-full text-[#333533] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-xl pb-10">
                          <div className="flex rounded-t-xl rounded-b-lg bg-cover bg-opacity-50 bg-center bg-[url('https://firebasestorage.googleapis.com/v0/b/kualify-web-fb.appspot.com/o/course_covers%2Fpersonalfinance.webp?alt=media&token=ad205e2f-b958-4ece-afb0-15b71fd19857')] justify-center h-56"></div>
                          <div className="px-6 py-6 text-center">
                            <div className="font-bold text-2xl">Finanzas Personales</div>
                          </div>
                          <div className="w-full px-8 flex justify-center items-center space-x-6">
                            <Image className="block rounded-full sm:mx-0 sm:shrink-0" height={48} width={48} src="/icon.png" alt="Profile picture"/>
                            <div>
                              <div className="text-left">
                                <p className="cursor-pointer text-lg font-semibold">Nombre Empresa</p>
                                <p className="cursor-pointer text-sm font-light">Puesto en Empresa</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div>
                    <Link href="/cursos/soft-skills">
                      <div className="flex justify-center items-center">
                        <div className="hover:bg-[#333533] duration-200 hover:text-white w-full text-[#333533] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-xl pb-10">
                          <div className="flex rounded-t-xl rounded-b-lg bg-cover bg-opacity-50 bg-center bg-[url('https://firebasestorage.googleapis.com/v0/b/kualify-web-fb.appspot.com/o/course_covers%2Fsoftskills.webp?alt=media&token=f8f82f74-4785-4a38-ab89-642c1f23183d')] justify-center h-56"></div>
                          <div className="px-6 py-6 text-center">
                            <div className="font-bold text-2xl">Soft Skills</div>
                          </div>
                          <div className="w-full px-8 flex justify-center items-center space-x-6">
                            <Image className="block rounded-full sm:mx-0 sm:shrink-0" height={48} width={48} src="/icon.png" alt="Profile picture" />
                            <div>
                              <div className="text-left">
                                <p className="cursor-pointer text-lg font-semibold">Nombre Apellido</p>
                                <p className="cursor-pointer text-sm font-light">Puesto en Empresa</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>       
                </div>   

                </div>
                <div className='flex justify-center items-center'>
                    <div className='cursor-pointer border-2 border-[#333533] w-max flex justify-center items-center rounded-full mt-16 px-12 py-2'>
                      <a className='text-lg text-center flex justify-center text-[#333533] pr-4 font-normal'>Más cursos próximamente</a>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#333533" className="w-6 h-6">
                        <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clipRule="evenodd" />
                      </svg>

                    </div>
                </div>
        </div>
       <Footer />
      </main>
      
    </>
  )
}
