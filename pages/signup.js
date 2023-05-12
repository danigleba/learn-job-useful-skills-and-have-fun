import Head from 'next/head'
import Router, { useRouter } from 'next/router';
import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from "axios"
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const router = useRouter();
    const [email, setEmail] = useState("")
    const [first_name, setFistName] = useState("")
    const [last_name, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [language, setLanguage] = useState("")

    useEffect(() => {
        const lang = navigator.language
        setLanguage(lang)
    }, [])

    const newUser = async (e) => {  
        e.preventDefault()
        const credentials = {email, password, first_name, last_name, language} 
        if (email !== "" && password !== "" && first_name && last_name !== "") {
            const user = await axios.post('/api/auth/signup', credentials)
            if (user.data.message == 'User added to database') {
                Router.push('/')
            }
        }
    } 
    return (
    <>
      <Head>
          <title>Kualify App</title>
          <meta name="description" content="Your meta description goes here" />
          <meta name="author" content="Kualify App" />
          <link rel="icon" href="/path/to/favicon.ico" />
          <link rel="canonical" href="https://app.kualify.es/" />
          <meta property="og:title" content="Kualify App" />
          <meta propertƒy="og:description" content="Your meta description goes here" />
          <meta property="og:image" content="https://example.com/og-image.jpg" />
      </Head>
      <main className={`${inter.className}`}>
      <section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign up 
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label htmlFor="First name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your first name</label>
                            <input onChange={(e) => setFistName(e.target.value)} type="name" name="Fist name" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Anthony" required="" />
                        </div>
                        <div>
                            <label htmlFor="Last name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your last name</label>
                            <input onChange={(e) => setLastName(e.target.value)} type="name" name="Last name" id="last" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Johnson" required="" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" required="" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                        </div>
                        <div className='flex-1 flex flex-col items-center '>
                            <button onClick={newUser} type="submit" className='bg-gray-200 rounded-md pt-2 pb-2 w-1/2 font-bold'>Sign up</button>
                        </div>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account? <a href="/" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Log in</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
    </main>
    </>
  )
}
