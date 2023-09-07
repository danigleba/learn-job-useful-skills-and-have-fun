import {useEffect, useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/utils/firebase'
import Router, {useRouter} from 'next/router';

export default function Navbar(props) {
  const [user, setUser] = useState([])
  const router = useRouter()
  const { id } = router.query

  function checkEmailFormat(str) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(str)
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
          Router.push("/login")
      }
    })    
  }, [])
  
  const checkSubscription = async () => {
    try {
      const response = await fetch('/api/auth/checkSubscription?email='+user.email, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json();
      if (data.subscribed) {
      } else {
        Router.push("/planes")
      } 
    } catch (error) {
      console.error('Error checking email:', error);
    }
  }

  /*useEffect(() => {
    if (checkEmailFormat(user.email))
      checkSubscription()    
  }, [user])*/
  return (
    <nav className="my-3 mx-12">
      <div className='flex items-center justify-between h-11 space-x-4'>
        <div>
            <Link href="/">
              <Image alt="Kualify logo" src="https://firebasestorage.googleapis.com/v0/b/kualify-web-fb.appspot.com/o/logo.png?alt=media&token=f332a294-dbd8-4b36-9e95-5f6c402f329c" width="95" height="25"/>
            </Link>
        </div>
        <div className='space-x-4 flex hidden md:flex'>
          <Link legacyBehavior href="/cursos">
          <div className={`${(props.page == "cursos" ? "bg-[#333533] text-white" : "bg-[#f4f4f4] text-[#333533]")} hover:bg-[#333533] hover:text-white duration-200 cursor-pointer px-8 py-2 rounded-md font-semibold md:text-sm`}>
              <p>Cursos</p>
            </div>
          </Link>
          <Link legacyBehavior href="/">
            <div className={`${(props.page == "videos" ? "bg-[#333533] text-white" : "bg-[#f4f4f4] text-[#333533]")} hover:bg-[#333533] hover:text-white duration-200 cursor-pointer px-8 py-2 rounded-md font-semibold md:text-sm`}>
              <p>Vídeos</p>
            </div>
          </Link>
        </div>
        <div className='flex space-x-6 items-center justify-center'>
                <div className='space-x-4 flex items-center justify-center'> 
                  <div>
                    <Link href="/perfil">
                      <p className='hidden md:flex font-semibold text-xl w-max'>{user?.displayName}</p>
                    </Link>
                  </div>
                  <div>
                    <Link href="/perfil">
                      <div style={{ backgroundImage: `url(${user?.photoURL})`}} className="bg-cover w-11 h-11 rounded-full bg-[#333533] flex items-center justify-center text-white font-extrabold text-lg">
                        <p className={`${(user?.photoURL != null) ? "hidden" : ""}`} >{user?.displayName?.charAt(0).toUpperCase()}</p>
                      </div>
                    </Link>
                  </div>
                </div>   
          </div>
        </div>
        <div className='space-x-4 flex flex md:hidden justify-center pt-6'>
          <Link legacyBehavior href="/cursos">
          <div className={`${(props.page == "cursos" ? "bg-[#333533] text-white" : "bg-[#f4f4f4] text-[#333533]")} hover:bg-[#333533] hover:text-white duration-200 cursor-pointer px-8 py-2 rounded-md font-semibold md:text-sm`}>
              <p>Cursos</p>
            </div>
          </Link>
          <Link legacyBehavior href="/">
            <div className={`${(props.page == "videos" ? "bg-[#333533] text-white" : "bg-[#f4f4f4] text-[#333533]")} hover:bg-[#333533] hover:text-white duration-200 cursor-pointer px-8 py-2 rounded-md font-semibold md:text-sm`}>
              <p>Vídeos</p>
            </div>
          </Link>
        </div>
    </nav>
  )
}