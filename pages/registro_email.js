import Head from 'next/head'
import Router from 'next/router';
import { Inter } from 'next/font/google'
import { useState } from 'react';
import { auth } from '@/utils/firebase'
import { createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar-Auth'

const inter = Inter({ subsets: ['latin'] })

export default function Login() {
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
            setProblem("Llena todos los campos.");
            return
        }
        if (password.length < 6) {
            setProblem("Escribe una contraseña más larga.");
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
            const url = `/api/auth/signup2?lang=${navigator.language}&profile_url=${auth.currentUser.photoURL}&email=${email}&username=${username}`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data = await response.json();
            if (data.userCreated) {
                Router.push("/planes")
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
                                <div>
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
