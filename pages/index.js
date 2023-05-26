import Image from 'next/image'
import Head from 'next/head'
import {useState, useEffect} from 'react'
import { Inter } from 'next/font/google'
import axios from "axios"
import Router, { useRouter } from 'next/router';
import {storage} from '../firebase/index'
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import Feed from '../components/Feed.js'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState([])
   
  useEffect(() => {
      fetch("api/user/getUser")
        .then(response => response.json())
        .then(data => setUser(data.data))
  }, [])

  const handleGetUser = async () => {  
        const credentials = { email, password } 
        const user = await axios.post("/api/auth/checkAuth", credentials)
        if (user.data.message == "Cookie not found") {
          Router.push("/login")
        }
  }
 
    useEffect(() => {
      handleGetUser()
    }, [])
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
        <Navbar />
        <div className='pt-12 text-[#1A1C1F]'>
          <h1 className='text-center text-3xl font-semibold pb-8'>👋 Hola, {user.username}</h1>
          <Feed />
          <Footer />
        </div>
      </main>
      
    </>
  )
}
