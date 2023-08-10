import Head from 'next/head'
import {useState, useEffect} from 'react'
import { Inter } from 'next/font/google'
import Router from 'next/router';
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer-mix'
import Link from 'next/link'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [email, setEmail] = useState("")
  const [user, setUser] = useState([])
  const [cookie, setCookie] = useState(null)

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
        Router.push("/")
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
          <title>Kualify | Renueva tu suscripción</title>
          <meta name="description" content="Your meta description goes here" />
          <meta name="author" content="Kualify App" />
          <link rel="icon" href="/icon.png" />
          <link rel="canonical" href="https://app.kualify.es/" />
          <meta property="og:title" content="Kualify App" />
          <meta property="og:description" content="Your meta description goes here" />
          <meta property="og:image" content="https://example.com/og-image.jpg" />
      </Head>
      <main>
      <nav className="my-3 mx-12">
        <div className='flex items-center justify-between h-11'>
              <Link href="/">
                <Image alt="Kualify logo" src="https://firebasestorage.googleapis.com/v0/b/kualify-web-fb.appspot.com/o/logo.png?alt=media&token=f332a294-dbd8-4b36-9e95-5f6c402f329c" width="95" height="25"/>
              </Link>
              <Link aria-label="Iniciar sesión en Kualify" href="/login">
                    <div className='py-1.5 px-6 text-white rounded-3xl font-semibold text-lg bg-[#333533]'>
                        <button onClick={logOff}>Salir</button>
                    </div>
              </Link>
        </div>
      </nav>
        <div className='mx-4'>
            <a className='text-center flex justify-center pt-12 font-extrabold text-[#333533] text-3xl'>{user?.username}, tu suscripción ha caducado.<br/>Suscríbete para seguir disfrutando de Kualify Premium.</a>
            <a className='text-center pt-2 flex justify-center font-light text-lg text-[#333533]'>Para seguir usando la misma cuenta, suscríbete con tu email: {user.email}</a>
          </div>
            <div className="flex justify-center h-full">
                <div className="w-full 2xl:w-1/2 pt-12 mx-8 md:mx-24 rounded-3xl">
                    <section className="mb-24"> 
                        <div className="w-full grid gap-12 grid-cols-1 lg:grid-cols-2">
                            <div className="flex justify-end w-full lg:mb-0">
                                <div
                                className="bg-white w-full rounded shadow-[0_8px_30px_rgb(0,0,0,0.08)] px-4 py-4 h-max rounded-2xl text-[#333533]">
                                    <div className="p-6 text-center">
                                        <p className="mb-4 text-xl font-medium">
                                            <strong>Paga Anualmente</strong>
                                        </p>
                                        <h3 className="mb-6 text-3xl">
                                            <strong className="font-extrabold text-[#333533] text-5xl">4,99 €</strong>
                                            <small className="text-base font-light text-[#333533]"> / mes</small>
                                        </h3>
                                        <Link href="https://buy.stripe.com/00gg0j4gx6qc4JWdQS">
                                            <button type="button"
                                                className="text-white inline-block w-full rounded-md bg-[#333533] pt-2.5 pb-2 text-md font-bold transition duration-200 ">
                                                Suscribirme
                                            </button>
                                        </Link>
                                        <div className="flex justify-center items-center space-x-6 mt-6">
                                            <img src="/logos/visa.png" alt="Visa" className="h-5" />
                                            <img src="/logos/mastercard.png" alt="Mastercard" className="h-5" />
                                            <img src="/logos/applepay.png" alt="Apple Pay" className="h-5 " />
                                            <img src="/logos/googlepay.png" alt="Google Pay" className="h-5" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-start w-full lg:mb-0">
                                <div
                                className="bg-white w-full rounded shadow-[0_8px_30px_rgb(0,0,0,0.08)] px-4 py-4 h-max rounded-2xl text-[#333533]">
                                    <div className="p-6 text-center">
                                        <p className="mb-4 text-xl font-medium">
                                            <strong>Paga Mensualmente</strong>
                                        </p>
                                        <h3 className="mb-6 text-3xl">
                                            <strong className="font-extrabold text-[#333533] text-5xl">7,99 €</strong>
                                            <small className="text-base font-light text-[#333533]"> / mes</small>
                                        </h3>
                                        <Link href="https://buy.stripe.com/fZe5lF14l7uga4g3cd">
                                            <button type="button"
                                                className="text-white inline-block w-full rounded-md bg-[#333533] pt-2.5 pb-2 text-md font-bold transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200">
                                                Suscribirme
                                            </button>
                                        </Link>
                                        <div className="flex justify-center items-center space-x-6 mt-6">
                                            <img src="/logos/visa.png" alt="Visa" className="h-5" />
                                            <img src="/logos/mastercard.png" alt="Mastercard" className="h-5" />
                                            <img src="/logos/applepay.png" alt="Apple Pay" className="h-5 " />
                                            <img src="/logos/googlepay.png" alt="Google Pay" className="h-5" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>                  
                </div>
            </div>
        <Footer />
      </main>
    </>
  )
}
