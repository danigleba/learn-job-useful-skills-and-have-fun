import Head from 'next/head'
import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function Registration() {
    const router = useRouter();
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [language, setLanguage] = useState("")
    const [wrongUserAlert, setWrongUserAlert] = useState("")

    useEffect(() => {
        const lang = navigator.language
       setLanguage(lang)
    }, [])

    const newUser = async (e) => {  
        e.preventDefault()
        const credentials = {email, password, username, language} 
        if (email !== "" && password !== "" && username !== "") {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });
        
            const data = await response.json();
            if (data.message == 'User added to database') {
                Router.push('/')
            } else {
                setWrongUserAlert("Este usuario ya existe")
            }
        } else {
           setWrongUserAlert("Responde a todo para crear tu cuenta")
        }
    }
  return (
    <>
        <Head>
            <title>Kualify App</title>
            <meta name="description" content="Your meta description goes here" />
            <meta name="author" content="Kualify App" />
            <link rel="icon" href="/icon.png" />
            <link rel="canonical" href="https://app.kualify.es/" />
            <meta property="og:title" content="Kualify App" />
            <meta property="og:description" content="Your meta description goes here" />
            <meta property="og:image" content="https://example.com/og-image.jpg" />
        </Head>
        <main>
            <section>
                <div className="text-[#1A1C1F] flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold text-center leading-tight tracking-tight md:text-2xl dark:text-white">
                                Crea tu cuenta
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium dark:text-white">Nombre de usuario</label>
                                    <input onChange={(e) => setUsername(e.target.value)} type="name" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nombre" required="" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium dark:text-white">Correo</label>
                                    <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="nombre@gmail.com" required="" />
                                </div>
                                <div className='pb-2'>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium dark:text-white">Contraseña</label>
                                    <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                
                                <div className='h-0 text-center'>
                                        <a className='text-sm text-red-400'>{wrongUserAlert}</a>
                                </div>
                                <div className='flex-1 flex flex-col items-center pt-2'>
                                    <button onClick={newUser} type="submit" className='shadow-md bg-[#1A1C1F] rounded-md pt-2 pb-2 w-full text-white font-bold'>Crear mi cuenta</button>
                                </div>
                                <p className="pt-2 md:pt-0 text-center text-sm font-light text-gray-500 dark:text-gray-400">
                                    ¿Ya tienes una cuenta? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Entra aquí</a>
                                </p>
                            </form>
                        </div>
                    </div>
                    <div className='w-full absolute bottom-0' >
                        <Footer />
                    </div>
                </div>
            </section>
        </main>
    </>
  )
}
