import { useEffect, useState } from "react"
import Link from 'next/link';
export default function Navbar() {
    const [user, setUser] = useState([])
   
    useEffect(() => {
        fetch("/api/user/getUser")
          .then(response => response.json())
          .then(data => setUser(data.data))
    }, [])
    return (
        <nav className="py-4 px-10 w-full items-center">
            <div className="h-12 flex justify-between">
                <Link href="/" >
                    <div className="pt-3">
                    <img className="w-20" src="https://firebasestorage.googleapis.com/v0/b/kualify-web-fb.appspot.com/o/icon.png?alt=media&token=8313ac61-b5c7-40c2-be01-ebba6e8cb670"></img>
                    </div>
                </Link>
                <div className="flex text-lg font-semibold">
                    <a className="pt-2 text-right pr-6">{user.username}</a>
                  <img className="rounded-full h-12 w-12 bg-gray-900" src={user.profile_url} ></img>
                </div>
            </div>
        </nav>
    )
}


