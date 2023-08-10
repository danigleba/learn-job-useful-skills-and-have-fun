import Head from 'next/head'
import {useState, useEffect} from 'react'
import { Inter } from 'next/font/google'
import Router from 'next/router';
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer-Auth'
import Image from 'next/image'
import Link from 'next/link'

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

  const logOff = async () => {
    try {
      const response = await fetch('/api/auth/logoff', {
        method: 'POST', 
      })
    } catch (error) {
      console.error('An error occurred:', error)
    }
    Router.reload()
  }
  return (
    <>
      <Head>
          <title>Kualify | Perfil</title>
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
        <div className='flex justify-center grid grid-col-1 pt-12'>
          <div className='flex justify-center'>
            <div className='w-40 h-40 rounded-full bg-[#333533] flex items-center justify-center text-white font-extrabold text-6xl'>
              <p>{user?.username?.charAt(0).toUpperCase()}</p>
            </div>
            </div>
            <a className='text-center pt-4 font-bold text-2xl'>{user?.username}</a>
            <div className='w-full'>
              <button
                  onClick={logOff}
                  className='mt-12 flex justify-center  py-2 text-center rounded-lg bg-[#333533] font-medium text-white w-full'>
                  Cerrar sesión
              </button>
              <Link href="https://billing.stripe.com/p/login/fZe6qA5Zt5QFeGcfYY">
              <button
                  className='mt-6 flex justify-center px-12 py-1.5 text-center rounded-lg border-2 border-[#333533] font-medium text-[#333533]'>
                  Editar suscripción
              </button>
              </Link>
            </div>
        </div>
       <Footer />
      </main>
      
    </>
  )
}
