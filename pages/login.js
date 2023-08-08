import Head from 'next/head'
import Router, { useRouter } from 'next/router';
import { Inter } from 'next/font/google'
import { useState } from 'react';
import Footer from '@/components/Footer'
import Link from 'next/link';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] })

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [wrongPassAlert, setWrongPassAlert] = useState("")
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
      }

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
          Router.push("/");
        } else {
          setWrongPassAlert("Contraseña incorrecta");
        }
      };
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
            <nav className="my-3 mx-12">
                <div className='flex items-center justify-between'>
                <div>
                    <Link href="/">
                    <Image alt="Kualify logo" src="https://firebasestorage.googleapis.com/v0/b/kualify-web-fb.appspot.com/o/logo.png?alt=media&token=f332a294-dbd8-4b36-9e95-5f6c402f329c" width="95" height="25"/>
                    </Link>
                </div>
                <div className='flex space-x-4'>
                    <Link aria-label="Iniciar sesión en Kualify" href="/login">
                    <div className='hidden lg:block py-1.5 px-6 text-[#333533] rounded-3xl font-semibold text-lg border-2 border-[#333533]'>
                        <button>Iniciar sesión</button>
                    </div>
                    </Link>
                    <Link aria-label="Ir a la App de Kualify" href="/registration">
                    <div className='hidden lg:block py-2 px-6 text-white rounded-3xl font-semibold text-lg bg-[#333533]'>
                        <button>Crea tu cuenta</button>
                    </div>
                    </Link>
                </div>
                <div className='lg:hidden'>
                    <button
                    aria-label="Mobile menu"
                    onClick={toggleMobileMenu}
                    className="w-10 flex justify-center items-center h-11 rounded text-white">
                    <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="#333533" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                    </button>
                </div>
                </div>
                <div className={`text-center flex h-max transition-2 duration-500 lg:hidden lg:flex ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
                    <div className='w-1/2 flex items-center justify-start grid grid-col-1 space-y-2'>
                        <div className='flex mt-6'>
                            <Link aria-label="Suscribirse a Kualify" href="/registration">
                            <div className='w-max py-2 px-6 text-white rounded-3xl font-semibold  text-center text-lg bg-[#333533]'>
                                <button>Crea tu cuenta</button>
                            </div>
                                </Link>
                            </div>
                        <div className='flex mb-6 justify-start'>
                            <Link aria-label="Iniciar sesión en Kualify" href="/login">
                            <div className='py-1.5 px-6 text-[#333533] rounded-3xl font-semibold text-lg border-2 border-[#333533]'>
                                <button>Inicia sesión</button>
                            </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            <section>
                <div className="mt-12 text-[#333533] flex justify-center px-6 mx-auto mb-24">
                    <div className="w-full md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="font-extrabold text-center text-3xl">
                                Inicia sesión
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium">Correo</label>
                                    <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="placeholder-gray-500 border border-[#333533] text-gray-900 sm:text-sm rounded-xl block w-full p-2.5 " placeholder="nombre@ejemplo.com" required="" />
                                </div>
                                <div className='pb-2'>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium ">Contraseña</label>
                                    <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="placeholder-gray-500 border border-[#333533] text-gray-900 sm:text-sm rounded-xl block w-full p-2.5" required="" />
                                </div>
                                <div className='h-0 text-center'>
                                    <a className='text-sm text-red-400 h-0'>{wrongPassAlert}</a>
                                </div>
                                <div className='flex-1 flex flex-col items-center pt-2'>
                                    <button onClick={getUser} type="submit" className='bg-[#333533] rounded-xl pt-2.5 pb-2.5 w-full text-white font-bold'>Inciar sesión</button>
                                </div>
                                <div className='bloc space-y-2'>
                                    <div className="h-full text-center text-sm font-light text-gray-500">
                                        ¿Aún no tienes una cuenta? <a href="/registration" className="font-medium text-primary-600 hover:underline">Crea tu cuenta</a>
                                    </div>
                                    <div className="h-full text-center text-sm font-light text-gray-500">
                                        ¿Has olvidado tu contraseña? <a href="/getpassword" className="font-medium text-primary-600 hover:underline">Recupera tu contraña</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <footer id="footer" className="bg-[#333533] rounded-xl text-white m-4 flex items-center absolute bottom-0 inset-x-0">
                    <div className="leading-3 w-full p-4 md:flex md:items-center justify-between items-center text-center md:mx-12">
                        <div className='pb-2 md:pb-0'>
                            <span className="text-xs lg:text-sm sm:text-center">© 2023 Kualify. Todos los derechos reservados.</span>
                        </div>
                        <ul className="flex flex-wrap justify-center items-center my-1 text-xs lg:text-sm font-medium px-8 space-x-2 md:space-x-4">
                            <li>
                                <a href="mailto:kualify.help@gmail.com" className="text-center">kualify.info@gmail.com</a>
                            </li>
                            <li>
                                <a className="text-center">+34 692 17 72 97</a>
                            </li>
                        </ul>
                    </div>
                </footer>
            </section>
            
        </main>
    </>
  )
}
