import Head from 'next/head'
import Router, { useRouter } from 'next/router';
import { Inter } from 'next/font/google'
import { useState } from 'react';
import { auth } from '@/utils/firebase'
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth'
import Footer from '@/components/Footer-mix'
import Navbar from '@/components/Navbar-Auth'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export default function Login() {
    const googleProvider = new GoogleAuthProvider()

    const [user, setUser] = useState(null)
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const handleGoogleSignIn = async () => {
        try {
          const result = await signInWithPopup(auth, googleProvider)
          const url = `/api/auth/signup?lang=${navigator.language}&profile_url=${auth.currentUser.photoURL}&email=${auth.currentUser.email}&username=${auth.currentUser.displayName}`
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    },
                })
                const data = await response.json()
                if (data.userCreated) {
                    Router.push("/planes")
                }
          // User signed in successfully using Google
        } catch (error) {
          console.error('Google login error:', error);
        }
    }

    const handleEmailSignIn = async () => {
        Router.push("/registro_email")
    }
    return (
    <>
        <Head>
            <title>Kualify | Crea tu cuenta</title>
            <meta name="description" content="Your meta description goes here" />
            <meta name="author" content="Kualify App" />
            <link rel="icon" href="/icon.png" />
            <link rel="canonical" href="https://app.kualify.es/login"/>
            <meta property="og:title" content="Kualify App" />
            <meta property="og:description" content="Your meta description goes here" />
            <meta property="og:image" content="https://example.com/og-image.jpg" />
        </Head>
        <main>
        <Navbar />
        <section>
                <div className="text-[#333533] flex justify-center mt-12 px-6 mx-auto mb-24">
                    <div className="w-full md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-3 sm:p-8">
                            <h1 className="text-3xl font-extrabold text-center">
                                Crea tu cuenta
                            </h1>
                            <div className="text-center pt-2 pb-4">
                                <div className="p-2 bg-[#f4f4f4] items-center px-4 text-white leading-5 rounded-xl flex lg:inline-flex" role="alert">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="#ffd60a" className="w-9 h-9">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                    </svg>
                                    <span className="text-center font-medium mx-2 sm:mx-4 my-1 flex-auto text-[#333533]">Al pagar tu suscripción habrás de poner el email que uses ahora.</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="#ffd60a" className="w-9 h-9">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                    </svg>
                                </div>
                            </div>
                                <div className="flex-1 flex flex-col items-center">
                                    <button onClick={handleGoogleSignIn} className='flex items-center justify-center border-2 border-[#333533] rounded-xl py-2 w-full text-[#333533] font-bold'>
                                        <Image alt="Google logo" className='mr-2' height={20} width={20} src="/logos/googlepay.png"></Image>
                                        Usar mi cuenta de Google</button>
                                </div>
                                <hr className="my-12 h-0.5 border-t-0 bg-[#f4f4f4]" />                                
                                <div className="flex-1 flex flex-col items-center">
                                    <button onClick={handleEmailSignIn} className='flex items-center justify-center border-2 border-[#333533] rounded-xl py-2 w-full text-white bg-[#333533] font-bold'>
                                        Usar mi correo electrónico</button>
                                </div>
                                <p className="pt-2 text-center text-sm font-light text-gray-500">
                                    ¿Ya tienes una cuenta? <a href="/login" className="font-medium text-primary-600 hover:underline">Inicia sesión</a>
                                </p>
                        </div>
                    </div>
                </div>
            </section>             
            <Footer />   
        </main>
    </>
  )
}
