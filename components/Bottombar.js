import {useEffect, useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Bottombar(props) {
  return (
    <main>
        <div className="px-6 py-4 rounded-xl bg-white md:hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] fixed block bottom-0 inset-x-0 m-6 z-50">
        <div className='space-x-4 flex flex md:hidden justify-between w-full '>
          <Link legacyBehavior href="/cursos">
          <div className={`${(props.page == "cursos" ? "bg-[#333533] text-white" : "bg-[#f4f4f4] text-[#333533]")} text-center hover:bg-[#333533] hover:text-white duration-200 cursor-pointer w-full py-3 rounded-md font-semibold md:text-sm`}>
              <p>Cursos</p>
            </div>
          </Link>
          <Link legacyBehavior href="/">
            <div className={`${(props.page == "videos" ? "bg-[#333533] text-white" : "bg-[#f4f4f4] text-[#333533]")} text-center hover:bg-[#333533] hover:text-white duration-200 cursor-pointer w-full py-3 rounded-md font-semibold md:text-sm`}>
              <p>Vídeos</p>
            </div>
          </Link>
          <Link legacyBehavior href="/retos">
            <div className={`${(props.page == "retos" ? "bg-[#333533] text-white" : "bg-[#f4f4f4] text-[#333533]")} font-semibold bg-[#333533] text-center hover:bg-[#333533] hover:text-white duration-200 cursor-pointer w-full py-3 rounded-md md:text-sm`}>
              <p>Retos</p>
            </div>
          </Link>
        </div>
        </div>
    </main>
  )
}