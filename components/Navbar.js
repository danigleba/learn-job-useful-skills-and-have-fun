export default function Navbar() {
    return (
        <nav className="py-4 px-10 bg-white w-full items-center">
            <div className="h-12 flex justify-between">
                <div className="pt-3">
                   <img className="w-20" src="https://firebasestorage.googleapis.com/v0/b/kualify-web-fb.appspot.com/o/icon.png?alt=media&token=8313ac61-b5c7-40c2-be01-ebba6e8cb670"></img>
                </div>
                <div>
                  <img className="rounded-full h-12 w-12 bg-gray-200"  src="/favicon.ico"></img>
                </div>
            </div>
        </nav>
    )
}


