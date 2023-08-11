import {useEffect, useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState()
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  
  }
  useEffect(() => {
    fetch("api/user/getUser")
    .then(response => response.json())
    .then(data => setUser(data.data))
    .catch(error => {
      console.error("Error fetching user:", error)
    })
  }, [])
  return (
    <nav className="my-3 mx-12">
      <div className='flex items-center justify-between h-11'>
        <div>
            <Link href="/">
              <Image alt="Kualify logo" src="https://firebasestorage.googleapis.com/v0/b/kualify-web-fb.appspot.com/o/logo.png?alt=media&token=f332a294-dbd8-4b36-9e95-5f6c402f329c" width="95" height="25"/>
            </Link>
        </div>
        <div className='space-x-4 flex hidden md:flex'>
          <Link legacyBehavior href="/finanzas-personales">
            <div className='cursor-pointer px-4 py-2 rounded-md bg-[#333533] text-white font-semibold text-xs'>
              <a>Finanzas Personales</a>
            </div>
          </Link>
          <Link legacyBehavior href="/soft-skills">
            <div className='cursor-pointer px-4 py-2 rounded-md bg-[#333533] text-white font-semibold text-xs'>
              <a>Soft Skills</a>
            </div>
          </Link>
        </div>
        <div className='flex space-x-6 items-center justify-center'>
                <div className='space-x-4 flex items-center justify-center'> 
                  <div>
                    <Link href="/perfil">
                      <p className='font-semibold text-xl w-max'>{user?.username}</p>
                    </Link>
                  </div>
                  <div>
                    <Link href="/perfil">
                      <div className='w-11 h-11 rounded-full bg-[#333533] flex items-center justify-center text-white font-extrabold text-lg'>
                        <p>{user?.username.charAt(0).toUpperCase()}</p>
                      </div>
                    </Link>
                  </div>
                </div>   
          </div>
        </div>
    </nav>
  )
}