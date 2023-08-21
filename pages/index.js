import Head from 'next/head'
import {useState, useEffect} from 'react'
import { Inter } from 'next/font/google'
import Router from 'next/router';
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Feed from '@/components/Feed'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [email, setEmail] = useState("")
  const [user, setUser] = useState([])
  const [cookie, setCookie] = useState()

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
          <link rel="canonical" href="/" />
          <meta property="og:title" content="Kualify App" />
          <meta property="og:description" content="Your meta description goes here" />
          <meta property="og:image" content="https://example.com/og-image.jpg" />
      </Head>
      <main className='bg-white'>
        <Navbar />
        <div className='pt-12 pb-24 px-8'>
          <p className='font-extrabold text-4xl text-[#333533] text-center flex justify-center'>¿Cómo vas a mejorar hoy?</p>
          <Feed />
          <div className='flex justify-center items-center'>
              <div className='cursor-pointer  w-max flex justify-center items-center '>
                <p target="_blank" href="https://kualify.es/cursos" className='hover:text-white hover:bg-[#333533] duration-200 flex items-center rounded-full mt-16 px-12 py-2 border-2 border-[#333533] text-lg text-center flex justify-center text-[#333533] font-medium'>Más cursos próximamente</p>
              </div>
          </div>
        </div>
       <Footer />
      </main>
    </>
  )
}
