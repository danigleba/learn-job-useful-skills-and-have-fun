import Head from 'next/head'
import { Inter } from 'next/font/google'
import Router, {useRouter} from 'next/router'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer-Auth'
import Link from 'next/link'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/utils/firebase'
import {useEffect, useState} from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()

  const [user, setUser] = useState({})

  function checkEmailFormat(str) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(str)
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
          router.push("/login")
      }
    })    
  }, [])
  
  const checkSubscription = async () => {
    try {
      const response = await fetch('/api/auth/checkSubscription?email='+user.email, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json();
      if (data.subscribed) {
        console.log("is suscribed")
      } else {
        router.push("/planes")
      } 
    } catch (error) {
      console.error('Error checking email:', error);
    }
  }

  useEffect(() => {
    if (checkEmailFormat(user.email))
      checkSubscription()    
  }, [user])

  function logOff() {
    router.push("/login")
  }
  return (
    <>
      <Head>
          <title>Kualify | Perfil</title>
          <meta name="description" content="Your meta description goes here" />
          <meta name="author" content="Kualify App" />
          <link rel="icon" href="/icon.png" />
          <link rel="canonical" href="https://app.kualify.es/perfil"/>
          <meta property="og:title" content="Kualify App" />
          <meta property="og:description" content="Your meta description goes here" />
          <meta property="og:image" content="https://example.com/og-image.jpg" />
      </Head>
      <main>
        <Navbar user={user}/>
        <div className='flex justify-center grid grid-col-1 pt-12'>
          <div className='flex justify-center'>
            <div style={{ backgroundImage: `url(${user?.photoURL})`}} className='bg-cover w-40 h-40 rounded-full bg-[#333533] flex items-center justify-center text-white font-extrabold text-6xl'>
              <p className={`${(user?.photoURL != null) ? "hidden" : ""}`}>{user?.displayName?.charAt(0).toUpperCase()}</p>
            </div>
          </div>
            <p className='text-center pt-4 font-bold text-2xl'>{user?.displayName}</p>
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

