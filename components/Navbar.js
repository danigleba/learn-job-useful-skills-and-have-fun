import {useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  return (
      <nav className="my-3 mx-12 lg:mx-24">
        <div className='flex items-center justify-between'>
          <div>
            <Link href="/">
              <Image alt="Kualify logo" src="https://firebasestorage.googleapis.com/v0/b/kualify-web-fb.appspot.com/o/logo.png?alt=media&token=f332a294-dbd8-4b36-9e95-5f6c402f329c" width="95" height="25"/>
            </Link>
          </div>
          <div className='flex space-x-4'>
            <Link aria-label="Iniciar sesión en Kualify" href="https://app.kualify.es">
              <div className='hidden lg:block py-1.5 px-6 text-[#333533] rounded-3xl font-semibold text-lg border-2 border-[#333533]'>
                <button>Iniciar sesión</button>
              </div>
            </Link>
            <Link aria-label="Ir a la App de Kualify" href="https://kualify.es/precios">
              <div className='hidden lg:block py-2 px-6 text-white rounded-3xl font-semibold text-lg bg-[#333533]'>
                <button>Crea tu cuenta</button>
              </div>
            </Link>
          </div>
          <div className='lg:hidden'>
            <button
              aria-label="Mobile menu"
              className="w-10 flex justify-center items-center h-8 rounded text-white">
              <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="#333533" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
            </button>
          </div>
        </div>
        <div className={`text-center flex  w-full h-full transition-2 duration-500 lg:hidden lg:flex ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
                <div className='w-1/2 flex items-center grid grid-col-1'>
                  <div className='flex mt-6 justify-end'>
                    <Link aria-label="Suscribirse a Kualify" href="https://kualify.es/precios">
                      <div className='w-max py-2 px-6 text-white rounded-3xl font-semibold  text-center text-lg bg-[#333533]'>
                        <button>Empieza ahora</button>
                      </div>
                    </Link>
                  </div>
                  <div className='flex mb-6 justify-end'>
                    <Link aria-label="Iniciar sesión en Kualify" href="https://app.kualify.es">
                      <div className='py-1.5 px-6 text-[#333533] rounded-3xl font-semibold text-lg border-2 border-[#333533]'>
                        <button>Iniciar sesión</button>
                      </div>
                    </Link>
                  </div>
                </div>
        </div>
      </nav>
  )
}