import Head from 'next/head'
import {useState, useEffect} from 'react'
import { Inter } from 'next/font/google'
import {useRouter} from 'next/router'
import Navbar from '@/components/Navbar-Auth'
import Footer from '@/components/Footer-mix'
import Link from 'next/link'
import { auth } from '@/utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const router = useRouter()
    const [user, setUser] = useState({})
    
    useEffect(() => {
        router.push("/")
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                router.push("/login")
            }
        })
    }) 
    
    const checkSubscription = async () => {
        try {
            const url = '/api/auth/checkSubscription?email='+ user.email
            const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          const data = await response.json();
          if (data.subscribed) {
            router.push("/")
            } 
        } catch (error) {
          console.error('Error checking email:', error);
        }
    }
    
    useEffect(() => {
        checkSubscription()
    }, [user])
    return (
    <>
        <Head>
            <title>Kualify | Planes</title>
            <meta name="description" content="Your meta description goes here" />
            <meta name="author" content="Kualify App" />
            <link rel="icon" href="/icon.png" />
            <link rel="canonical" href="https://app.kualify.es/renovar-suscripcion"/>
            <meta property="og:title" content="Kualify App" />
            <meta property="og:description" content="Your meta description goes here" />
            <meta property="og:image" content="https://example.com/og-image.jpg" />
        </Head>
        <main>
            <Navbar />
            <div className="flex justify-center h-full">
                    <div className="w-full 2xl:w-1/2 pt-12 mx-8 md:mx-24 rounded-3xl">
                        <section className="mb-12"> 
                            <div className="flex justify-center pb-4">
                                <div className="w-max px-4 md:px-12 mx-4 py-3 rounded-full text-[#333533]">
                                    <h2 className="font-extrabold text-4xl text-center">Escoge tu plan</h2>
                                </div>
                            </div>
                            <div className="text-center pb-12">
                                <div className="p-2 bg-[#f4f4f4] items-center px-4 text-white leading-5 rounded-xl flex lg:inline-flex" role="alert">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="#ffd60a" className="w-8 h-8 md:h-6 md:w-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                    </svg>
                                    <span className="text-center font-medium mx-2 sm:mx-4 my-1 flex-auto text-[#333533]">Al pagar tu suscripción pon tu email {user.email} </span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="#ffd60a" className="w-8 h-8 md:w-6 md:h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="w-full grid gap-12 grid-cols-1 lg:grid-cols-2">
                                <div className="flex justify-end w-full lg:mb-0">
                                    <div
                                    className="bg-white w-full rounded shadow-[0_8px_30px_rgb(0,0,0,0.08)] px-4 py-4 h-max rounded-2xl text-[#333533]">
                                        <div className="p-6 text-center">
                                            <p className="mb-4 text-xl font-medium">
                                                <strong>Paga Anualmente</strong>
                                            </p>
                                            <h3 className="mb-6 text-3xl">
                                                <strong className="font-extrabold text-[#333533] text-5xl">3,49 €</strong>
                                                <small className="text-base font-light text-[#333533]"> / mes</small>
                                            </h3>
                                            <Link href="https://buy.stripe.com/4gw9BV5kB8ykgsE3cg">
                                                <button type="button"
                                                    className="hover:bg-[#f4f4f4f4] hover:text-[#333533] text-white inline-block w-full rounded-md bg-[#333533] py-2.5 text-md font-bold transition duration-200  focus:outline-none focus:ring-0">
                                                    Suscribirme
                                                </button>
                                            </Link>
                                            <div className="flex justify-center items-center space-x-6 mt-6">
                                                <img src="/logos/visa.webp" alt="Visa" className="h-3.5" />
                                                <img src="/logos/mastercard.webp" alt="Mastercard" className="h-5" />
                                                <img src="/logos/applepay.webp" alt="Apple Pay" className="h-6" />
                                                <img src="/logos/googlepay.webp" alt="Google Pay" className="h-5" />
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
                                                <strong className="font-extrabold text-[#333533] text-5xl">4,99 €</strong>
                                                <small className="text-base font-light text-[#333533]"> / mes</small>
                                            </h3>
                                            <Link href="https://buy.stripe.com/bIY4hBeVbcOA7W828b">
                                                <button type="button"
                                                    className="hover:bg-[#f4f4f4f4] hover:text-[#333533] text-white inline-block w-full rounded-md bg-[#333533] py-2.5 text-md font-bold transition duration-200  focus:outline-none focus:ring-0">
                                                    Suscribirme
                                                </button>
                                            </Link>
                                            <div className="flex justify-center items-center space-x-6 mt-6">
                                                <img src="/logos/visa.webp" alt="Visa" className="h-3.5" />
                                                <img src="/logos/mastercard.webp" alt="Mastercard" className="h-5" />
                                                <img src="/logos/applepay.webp" alt="Apple Pay" className="h-6" />
                                                <img src="/logos/googlepay.webp" alt="Google Pay" className="h-5" />
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
