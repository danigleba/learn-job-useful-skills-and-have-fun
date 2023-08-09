import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react';
import { Inter } from 'next/font/google'
import { useState } from 'react';
import Footer from '@/components/Footer-Auth'
import Navbar from '@/components/Navbar-Auth'

const inter = Inter({ subsets: ['latin'] })

export default function getPassword() {
    const [email, setEmail] = useState("")
    const [wrongPassAlert, setWrongPassAlert] = useState("")

    function sendPassword() {
      if (email != "") { 
        /*fetch("/api/email-test"), {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              }
        } */ return
      } else {
        setWrongPassAlert("Escribe tu email vinculado a Kualify")
      } 
    }

  return (
    <>
      <Head>
        <title>Kualify | Recupera tu contraseña</title>
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
        <div className="text-[#333533] flex justify-center mt-12 px-6 mx-auto mb-24">
            <div className="w-full md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-3xl font-bold text-center">
                        Recupera tu contraseña
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="#">
                        <div className=''>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium">Correo de la cuenta</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="placeholder-[#c9c9c9] border border-[#333533] text-gray-900 sm:text-sm rounded-xl block w-full p-2.5" placeholder="nombre@ejemplo.com" required="" />
                        </div>
                        <div className='flex-1 flex flex-col items-center pt-2'>
                            <button onClick={sendPassword} type="submit" className='bg-[#333533] rounded-xl py-2.5 w-full text-white font-bold'>Enviar contraseña</button>
                            <a className='text-sm text-center pt-2 text-red-600 font-light'>{wrongPassAlert}</a>

                        </div>
                        <p className="pb-6  h-0 text-center text-sm font-light text-gray-500">
                            <a href="/login" className="font-medium text-primary-600 hover:underline">Volver</a>
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
