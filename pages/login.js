import Head from 'next/head'
import Router, { useRouter } from 'next/router';
import { Inter } from 'next/font/google'
import { useState } from 'react';
import Footer from '@/components/Footer-Auth'
import Navbar from '@/components/Navbar-Auth'
import Link from 'next/link';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] })

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [wrongPassAlert, setWrongPassAlert] = useState("")

    const getUser = async (e) => {
        e.preventDefault();
        const credentials = { email, password }
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });
      
        const data = await response.json();
      
        if (data.message === "User found in database!") {
            setWrongPassAlert("");
            Router.push("/");
        } else {
          setWrongPassAlert("El email o la contraseña son incorrectos");
        }
      }
  return (
    <>
        <Head>
            <title>Kualify | Inicia sesión</title>
            <meta name="description" content="Your meta description goes here" />
            <meta name="author" content="Kualify App" />
            <link rel="icon" href="/icon.png" />
            <link rel="canonical" href="https://app.kualify.es/" />
            <meta property="og:title" content="Kualify App" />
            <meta property="og:description" content="Your meta description goes here" />
            <meta property="og:image" content="https://example.com/og-image.jpg" />
        </Head>
        <main>
            <Navbar />
            <section>
                <div className="mt-12 text-[#333533] flex justify-center px-6 mx-auto mb-24">
                    <div className="w-full md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 pb-5 sm:pb-5 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="font-extrabold text-center text-3xl">
                                Inicia sesión
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium">Correo</label>
                                    <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="placeholder-[#c9c9c9] border border-[#333533] text-gray-900 sm:text-sm rounded-xl block w-full p-2.5 " placeholder="nombre@ejemplo.com" required="" />
                                </div>
                                <div className='pb-2'>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium ">Contraseña</label>
                                    <input onChange={(e) => setPassword(e.target.value)} type='password' name="password" id="password" placeholder="••••••••" className="placeholder-[#c9c9c9] border border-[#333533] text-gray-900 sm:text-sm rounded-xl block w-full p-2.5" required="" />
                                </div>
                                <div className='flex-1 flex flex-col items-center pt-2'>
                                    <button onClick={getUser} type="submit" className='bg-[#333533] rounded-xl pt-2.5 pb-2.5 w-full text-white font-bold'>Inciar sesión</button>
                                    <a className='pt-2 text-sm text-center text-red-600 font-light'>{wrongPassAlert}</a>
                                </div>
                                
                            </form>
                        </div>
                        <div className='bloc space-y-2 px-4'>
                                    <div className="h-full text-center text-sm font-light text-gray-500">
                                        ¿Aún no tienes una cuenta? <a href="/registro" className="font-medium text-primary-600 hover:underline">Crea tu cuenta</a>
                                    </div>
                                    <div className="h-full text-center text-sm font-light text-gray-500">
                                        ¿Has olvidado tu contraseña? <a href="/recuperar-contra" className="font-medium text-primary-600 hover:underline">Recupera tu contraña</a>
                                    </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    </>
  )
}
