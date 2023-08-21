import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer-Auth'
import Navbar from '@/components/Navbar-Auth'

const inter = Inter({ subsets: ['latin'] })

export default function Registration() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [language, setLanguage] = useState("")
    const [wrongUserAlert, setWrongUserAlert] = useState("")
    const [princingLink, setPricingLink] = useState("")
    const [buttonText, setButtonText] = useState("Crear mi cuenta")

    useEffect(() => {
        const lang = navigator.language
        setLanguage(lang)
    }, [])

    const addUser = async (e) => {  
        e.preventDefault()
        const credentials = {email, password, username, language} 
        const url = "/api/auth/checkCostumer?email=" + email
        const response = await fetch(url)
        const data = await response.json()
        if (email !== "" && password !== "" && username !== "") {
            if (data.isStripeCustomer) {
                const response = await fetch("/api/auth/signup", {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify(credentials),
                });
            
                const data = await response.json();
                if (data.userAddes) {
                    setWrongUserAlert("")
                    setPricingLink("")
                    setButtonText("Cargando...")
                    Router.push('/')
                } else {
                    setWrongUserAlert("Este usuario ya existe, inicia sesión")
                    setPricingLink("")
                }
            } else {
                setWrongUserAlert("Usa el email con el que has pagado tu suscripción. Si no lo has hecho, hazlo ")
                setPricingLink("aquí")
            }
        } else {
            setWrongUserAlert("Responde a todos los campos")
            setPricingLink("")

        }
    }
  return (
    <>
        <Head>
            <title>Kualify | Crea tu cuenta</title>
            <meta name="description" content="Your meta description goes here" />
            <meta name="author" content="Kualify App" />
            <link rel="icon" href="/icon.png" />
            <link rel="canonical" href="/" />
            <meta property="og:title" content="Kualify App" />
            <meta property="og:description" content="Your meta description goes here" />
            <meta property="og:image" content="https://example.com/og-image.jpg" />
        </Head>
        <main>
            <Navbar />
            <section>
                <div className="text-[#333533] flex justify-center mt-12 px-6 mx-auto mb-24">
                    <div className="w-full md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-3xl font-extrabold text-center">
                                Crea tu cuenta
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium">Nombre de usuario</label>
                                    <input onChange={(e) => setUsername(e.target.value)} type="name" name="username" id="username" className="placeholder-[#c9c9c9] border border-[#333533] text-gray-900 sm:text-sm rounded-xl block w-full p-2.5" placeholder="Nombre" required="" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium">Correo</label>
                                    <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="placeholder-[#c9c9c9] border border-[#333533] text-gray-900 sm:text-sm rounded-xl block w-full p-2.5" placeholder="nombre@ejemplo.com" required="" />
                                </div>
                                <div className='pb-2'>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium">Contraseña</label>
                                    <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="placeholder-[#c9c9c9] border border-[#333533] text-gray-900 sm:text-sm rounded-xl block w-full p-2.5" required="" />
                                </div>                             
                                <div className='flex-1 flex flex-col items-center pt-2'>
                                    <button onClick={addUser} type="submit" className='bg-[#333533] rounded-xl py-2.5 w-full text-white font-bold'>{buttonText}</button>
                                    <p className='text-center pt-2 text-sm text-red-600 font-light'>{wrongUserAlert}<a aria-label="Precios" className='underline text-center pt-2 text-sm text-red-600 font-light' href="https://kualify.es/precios">{princingLink}</a></p>
                                </div>
                                <p className="md:pt-0 text-center text-sm font-light text-gray-500">
                                    ¿Ya tienes una cuenta? <a href="/login" className="font-medium text-primary-600 hover:underline">Inicia sesión</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    </>
  )
}
