import Image from 'next/image'
import Head from 'next/head'
import {useState, useEffect} from 'react'
import { Inter } from 'next/font/google'
import Router from 'next/router';
import Feed from '../components/Feed.js'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Tags from '@/components/Tags.js';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState([])
   
  const handleVerify = async () => {
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log(data)
      if (data.subscribed == true) {
        return
      } else {
        Router.push("/login")
      }
    } catch (error) {
      console.error('Error checking email:', error);
    }
  }

  const checkAuth = async () => {  
    const credentials = { email, password }
    const response = await fetch("/api/auth/checkAuth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })  
    const data = await response.json()
    if (data.message == "Cookie not found") {
      Router.push("/login")
    }
  } 

  function handleGetUser() {
    fetch("api/user/getUser")
    .then(response => response.json())
    .then(data => setUser(data.data))
    .catch(error => {
      console.error("Error fetching user:", error)
    })
  }
  

  useEffect(() => {
    handleGetUser()
  }, [])
  useEffect(() => {
    setEmail(user?.email)
    console.log(email)
  }, [user])

  useEffect(() => {
    checkAuth()
    if (email != "") {
      handleVerify()
    }
  }, [email])

  return (
    <>
      <Head>
          <title>Kualify | Aprende lo que la escuela no te enseñará.</title>
          <meta name="description" content="Your meta description goes here" />
          <meta name="author" content="Kualify App" />
          <link rel="canonical" href="https://app.kualify.es/" />
          <meta property="og:title" content="Kualify App" />
          <meta property="og:description" content="Your meta description goes here" />
          <meta property="og:image" content="https://example.com/og-image.jpg" />
      </Head>
      <main>
        <Tags />
        
        <div className='pt-12 text-[#1A1C1F]'>
          <h1 className='text-center text-3xl font-semibold pb-8'>👋 Hola, {user?.username}</h1>
          <Feed />    
        </div>
       
      </main>
      
    </>
  )
}
