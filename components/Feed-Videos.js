import { useState, useEffect } from "react"
import Image from 'next/image'

export default function Feed() {
    const [content, setContent] = useState([])
    const [selectedTag, setSelectedTag] = useState("")
    const tags = ["Emprendimiento", "Habilidades Sociales", "Finanzas Personales", "Productividad"]

    function selectTag(tag) {
        setSelectedTag(tag)
    }
    
    useEffect(() => {
        const url ='/api/courses/getCourses'
        fetch(url)
          .then(response => response.json())
          .then(data => setContent(data.data))
}, [])
    return (
        <>  
            <div className=' mx-8 md:mx-24 gap-4 flex text-center items-center pt-12 pb-2 overflow-x-scroll scrollbar-hide justify-start lg:justify-center'>   
                {tags?.map((item, index) => (                                
                                    <a key={`${item}-${index}`}>
                                        <button onClick={() => selectTag(item)} className={`${(selectedTag == item) ? "bg-[#333533] text-white" : "bg-[#f4f4f4] text-[#333533]"} hover:bg-[#333533] hover:text-white duration-200  cursor-pointer px-4 py-2 rounded-md font-semibold text-xs md:text-sm`}>
                                                <p className='truncate'>{item}</p>
                                        </button>
                                    </a>
                ))} 
            </div>
            <div className='pb-24 mx-8 lg:mx-24 text-[#333533] text-center pt-6 items-center  text-2xl md:text-xl justify-center h-full'>
                {tags?.map((item, index) => (                                
                    <a key={`${item}-${index}`}>
                        <div className={` ${(selectedTag != "" && selectedTag != item) ? "hidden" : ""} pb-4`}>
                            <p className='font-extrabold text-3xl'>{item}</p>
                            <div className=' mb-10 flex gap-12 md:gap-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full mt-6 justify-start'> 
                                {content?.map((i, index) => (                                
                                    <a className={`${(i.tag != "" && i.tag != item || i.private) ? "hidden" : ""} hover:scale-105 duration-200`} href={`/cursos/${i.id}`} key={`${i.id}-${index}`}>
                                        <div style={{
                                            backgroundImage: `url(${i?.cover_url})`,
                                            }} className="aspect-w-16 aspect-h-9 shadow-[0_8px_30px_rgb(0,0,0,0.08)]  w-full  bg-cover bg-center rounded-lg">
                                        </div>
                                        <div className='pt-4 flex items-start gap-4'>
                                            <Image 
                                                src={i?.teacher?.profile_url} 
                                                className='rounded-full bg-cover'
                                                height={48}
                                                width={48}
                                                alt="Profile picture"
                                            />
                                                <div className="space-y-0.5 items-center">
                                                    <p className='text-left font-semibold text-base line-clamp-2 flex-wrap leading-5'>{i.title}</p>
                                                    <p className='text-base text-left font-light truncate'>{i?.teacher?.name}</p>
                                                </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </a>
                ))} 
            </div>
        </>
    )
}
