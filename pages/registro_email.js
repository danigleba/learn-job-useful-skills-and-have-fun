import Head from 'next/head'
import {useRouter} from 'next/router';
import { Inter } from 'next/font/google'
import { useState } from 'react';
import { auth } from '@/utils/firebase'
import { createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar-Auth'

const inter = Inter({ subsets: ['latin'] })

export default function Login() {
    const router = useRouter()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [problem, setProblem] = useState()
    const [buttonText, setButtonText] = useState("Crear mi cuenta")

    function checkEmailFormat(str) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(str);
    }

    const handleEmailSignIn = async () => {
        if (username === "" || email === "" || password === "") {
            setProblem("Llena todos los campos");
            return
        }
        if (password.length < 6) {
            setProblem("Escribe una contraseña más larga");
            return;
        }
        if (!checkEmailFormat(email)) {
            setProblem("Escribe un email válido.");
            return;
        }
        try {
            setProblem("");
            setButtonText("Cargando...")
            const userCredential = await createUserWithEmailAndPassword(auth, email, password, username);
            await updateProfile(auth.currentUser, {
                displayName: username
            })
            const url = `/api/auth/signup?lang=${navigator.language}&profile_url=${auth.currentUser.photoURL}&email=${email}&username=${username}`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data = await response.json();
            if (data.userCreated) {
                router.push("/")
            }
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                setButtonText("Crear mi cuenta")
                setProblem("Este email ya está en uso")
            } else {
                console.log(error)
            }
        }
    }
    
    return (
    <>
        <Head>
            <title>Kualify | Crea tu cuenta con email</title>
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
                                    
                                <div className='pt-2'>
                                    <label className="block mb-2 text-sm font-medium">Nombre de usuario</label>
                                    <input onChange={(e) => setUsername(e.target.value)} className="placeholder-[#c9c9c9] border border-[#333533] text-gray-900 sm:text-sm rounded-xl block w-full p-2.5" placeholder="Nombre" />
                                </div>
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
                                        {buttonText}
                                    </button>
                                    <p className='text-center pt-2 text-sm text-red-600 font-light'>{problem}</p>
                                </div>
                                <p className="pt-4 text-center text-sm font-light text-gray-500">
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
