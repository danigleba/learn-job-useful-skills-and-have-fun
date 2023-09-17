import { useState, useEffect } from "react"
import Image from 'next/image'
import { useRouter } from "next/router"
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/utils/firebase'
import {AiOutlineArrowRight} from "react-icons/ai"
import {AiOutlineArrowLeft} from "react-icons/ai"

export default function Feed_Videos_Active() {
    const router = useRouter()
    const { id_course } = router.query
    const [videos, setVideos] = useState([])
    const [user, setUser] = useState({})
    const [currentIndex, setCurrentIndex] = useState(0);
    const [nOfActives, setNOfActives] = useState(3)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user)
        } 
        })    
    }, [] )

    useEffect(() => {
        if (user.email) {
            const url ='/api/courses/getAllProgressVideo?email=' + user?.email
            fetch(url)
            .then(response => response.json())
            .then(data => setVideos(data.data))
        }
    }, [user])

    const nextVideo = () => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);

      };
    
      const prevVideo = () => {
            setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? videos.length - 1 : prevIndex - 1
        );
        
      };
    
      useEffect(() => {
        // Function to update nOfActives based on screen size
        const updateNOfActives = () => {
          const screenWidth = window.innerWidth;
          if (screenWidth <= 767) { // Screen "sm"
            setNOfActives(1);
          } else if (screenWidth <= 1023) { // Screen "md"
            setNOfActives(2);
          } else if (screenWidth > 1023) { // Screen "lg"
            setNOfActives(3);
          }
        };
    
        // Call the function initially and whenever the window is resized
        updateNOfActives();
        window.addEventListener("resize", updateNOfActives);
    
        // Clean up the event listener when the component unmounts
        return () => {
          window.removeEventListener("resize", updateNOfActives);
        };
      }, []);
    return (
        <>  
            <div className={`mx-2 text-[#333533] text-center pt-10 md:pt-12 items-center  text-2xl md:text-xl justify-center h-full`}> 
                            <p className='font-extrabold text-4xl pb-2 text-[#333533]'>Tus vídeos</p>
                            {videos.length > 0 ? (
                                <div className="flex items-center gap-1 md:gap-4">
                            
                                <div className={`mb-20 flex justify-end flex items-center hover:scale-105  duration-200 rounded-full p-2`}>
                                        <button onClick={prevVideo}><AiOutlineArrowLeft style={{ color: "#333533", strokeWidth: '70px', borderRadius: "50%" }} /></button>
                                    </div>
                                    <div className='w-full mb-10 flex gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 justify-start'> 
                                                {videos.slice(currentIndex, currentIndex + nOfActives).map((item, index)=> (     
                                                    <a className={`hover:scale-105 duration-200`} href={`/cursos/${item.id}`} key={`${item.id}-${index}`}>
                                                        <div style={{
                                                            backgroundImage: `url(${item?.cover_url})`,
                                                            }} className="aspect-w-16 aspect-h-9 shadow-[0_8px_30px_rgb(0,0,0,0.08)]  w-full  bg-cover bg-center rounded-lg">
                                                                <div className="flex justify-between ">
                                                                      <div className="flex justify-center text-[#333533] font-extrabold text-sm px-4 py-2 w-max h-max bg-white rounded-md mx-2 my-2">
                                                                          <p>+{item.points} pts</p>
                                                                      </div>
                                                                      <div className="flex justify-center items-center text-[#] font-extrabold text-base px-3 py-1.5 w-max h-max bg-white rounded-md mx-2 my-2">
                                                                          <p>{`${(item.category == "Social Skills") ? "👋" : ""}`}</p>
                                                                          <p>{`${(item.category == "Entrepreneurship") ? "💼" : ""}`}</p>
                                                                          <p>{`${(item.category == "Productivity") ? "👩‍💻" : ""}`}</p>
                                                                          <p>{`${(item.category == "Personal Finance") ? "💶" : ""}`}</p>
                                                                      </div>
                                                                </div>
                                                        </div>
                                                        <div className='pt-4 flex items-start gap-4'>
                                                            <Image 
                                                                src={item?.teacher?.profile_url} 
                                                                className='rounded-full bg-cover'
                                                                height={48}
                                                                width={48}
                                                                alt="Profile picture"
                                                            />
                                                                <div className="space-y-0.5 items-center">
                                                                    <p className='text-left font-semibold text-base line-clamp-2 flex-wrap leading-5'>{item.title}</p>
                                                                    <p className='text-base text-left font-light truncate'>{item?.teacher?.name}</p>
                                                                </div>
                                                        </div>
                                                    </a>
                                                ))}
                                    </div>
                                    <div className={`mb-20 flex justify-end flex items-center hover:scale-105 duration-200 rounded-full p-2`}>
                                        <button onClick={nextVideo}><AiOutlineArrowRight style={{ color: "#333533", strokeWidth: '70px', borderRadius: "50%" }} /></button>
                                    </div>
                                </div>
                                )
                                 :(
                                    <div className="leading-7 py-4 px-6 text-xl font-light">
                                        <p>No tienes ningún vídeo por acabar...</p>
                                        <p>Clica en cualquier vídeo para empezar.</p>
                                    </div>
                                 )}
                            
                        </div>
        </>
    )
}
