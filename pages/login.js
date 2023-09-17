import Head from 'next/head'
import { useRouter } from 'next/router';
import { Inter } from 'next/font/google'
import { useState } from 'react';
import { auth } from '@/utils/firebase'
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth'
import Footer from '@/components/Footer-mix'
import Navbar from '@/components/Navbar-Auth'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export default function Login() {
    const router = useRouter()
    const googleProvider = new GoogleAuthProvider()

    const [user, setUser] = useState(null)
    const [username, setUsername] = useState()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [problem, setProblem] = useState("")

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
                router.push("/")                
          // User signed in successfully using Google
        } catch (error) {
          console.error('Google login error:', error);
        }
    }


    const handleEmailSignIn = async () => {
        if ( email === "" || password === "") {
            setProblem("Llena todos los campos");
            return
        }                
        setProblem("");
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                router.push("/")
            })
            .catch((error) => {
            setProblem("Contraseña o email incorrectos")
              const errorCode = error.code;
              const errorMessage = error.message;
            })
    }
    return (
    <>
        <Head>
            <title>Kualify | Inicia sesión</title>
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
                            <h1 className="text-3xl font-extrabold text-center pb-2">
                                Inicia sesión
                            </h1>
                                <div className="flex-1 flex flex-col items-center">
                                    <button onClick={handleGoogleSignIn} className='flex items-center justify-center border-2 border-[#333533] rounded-xl py-2 w-full text-[#333533] font-bold'>
                                        <Image alt="Google logo" className='mr-2' height={20} width={20} src="/logos/googlepay.webp"></Image>
                                        Entrar con Google</button>
                                </div>
                                <hr className="my-12 h-0.5 border-t-0 bg-[#f4f4f4]" />  
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
                                    <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="placeholder-[#c9c9c9] border border-[#333533] text-gray-900 sm:text-sm rounded-xl block w-full p-2.5" placeholder="email@ejemplo.com" required="" />
                                </div>
                                <div className='pb-4'>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium">Contraseña</label>
                                    <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="placeholder-[#c9c9c9] border border-[#333533] text-gray-900 sm:text-sm rounded-xl block w-full p-2.5" required="" />
                                </div>                               
                                <div className="flex-1 flex flex-col items-center">
                                    <button onClick={handleEmailSignIn} className='flex items-center justify-center border-2 border-[#333533] rounded-xl py-2 w-full text-white bg-[#333533] font-bold'>
                                        Entra con correo electrónico
                                    </button>
                                    <p className='text-center pt-2 text-sm text-red-600 font-light'>{problem}</p>
                                </div>
                                <p className="pt-2 text-center text-sm font-light text-gray-500">
                                    ¿Aún no tienes una cuenta? <a href="/registro" className="font-medium text-primary-600 hover:underline">Crea tu cuenta</a>
                                </p>
                                <p className="text-center text-sm font-light text-gray-500">
                                    ¿Has olvidado tu contraseña? <a href="/recuperar-contra" className="font-medium text-primary-600 hover:underline">Recupera tu contraseña</a>
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
