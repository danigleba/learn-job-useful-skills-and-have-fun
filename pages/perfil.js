import Head from 'next/head'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/utils/firebase'
import {useEffect, useState} from 'react'
import User_Experience from '@/components/User_Experience'
import Bottombar from '@/components/Bottombar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [user, setUser] = useState({})

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } 
    })    
  }, [])

  function logOff() {
    signOut(auth).then(() => {
    }).catch((error) => {
      console.log(error)
    }) }
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
      <main >
        <Navbar />
        <Bottombar />
        <div className='flex justify-center w-full flex-col flex justify-center pt-12 overflow-hidden'>
          <div className='space-x-4 items-center justify-center flex '> 
        
                  <div>
                      <div style={{ backgroundImage: `url(${user?.photoURL})`}} className="bg-cover w-14 h-14 rounded-full bg-[#333533] flex items-center justify-center text-white font-extrabold text-lg">
                        <p className={`${(user?.photoURL != null) ? "hidden" : ""}`} >{user?.displayName?.charAt(0).toUpperCase()}</p>
                      </div>
                  </div>
                  <div>
                      <p className='font-semibold text-xl w-max'>{user?.displayName}</p>
                  </div>
              </div> 
              <div className='flex justify-center'>
              {user ? (
                    <User_Experience email={user?.email} />
                  ) : (<></>)}
              </div>
            <div className='flex justify-center'>
              <div className='pt-12 pb-24'>
                <button
                    onClick={logOff}
                    className='mt-6 flex justify-center py-2 text-center rounded-lg bg-[#333533] font-medium text-white w-full'>
                    Cerrar sesión
                </button>
                <Link href="https://billing.stripe.com/p/login/fZe6qA5Zt5QFeGcfYY">
                <button
                    className='mt-6 flex justify-center px-24 py-1.5 text-center rounded-lg border-2 border-[#333533] font-medium text-[#333533] w-full'>
                    Editar suscripción
                </button>
                </Link>
              </div>
            </div>
        </div>
       <Footer />
      </main>
      
    </>
  )
}

