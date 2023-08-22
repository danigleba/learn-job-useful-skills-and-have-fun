import Image from "next/image"
import { useState, useEffect } from "react"

export default function Feed() {
    const [courses, setCourses] = useState([])    
   
    useEffect(() => {
        const url ='/api/courses/getCourses'
        fetch(url)
          .then(response => response.json())
          .then(data => setCourses(data.data))
    }, [])
    
    return (
        <div className='flex justify-center'>
            <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-2 gap-12 justify-center w-full lg:w-2/3">
                {courses?.map(item => (
                            <a href={"/cursos/"+item.id} key={item.id}>
                                <div className="mt-12 w-full hover:bg-[#333533] duration-200 hover:text-white text-[#333533] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-xl pb-10">
                                    <div
                                        className="flex rounded-xl bg-cover bg-center justify-center h-56 "
                                        style={{ backgroundImage: `url(${item.cover_url})`}}>
                                    </div>                                            
                                    <div className="px-6 py-6 text-center">
                                        <div className="font-bold text-2xl">{item?.title}</div>
                                    </div>
                                    <div className="w-full px-8 flex justify-center items-center space-x-6">
                                        <Image className="block rounded-full sm:mx-0 sm:shrink-0" height={48} width={48} src={item?.teacher?.profile_url} alt="Profile picture"/>
                                        <div>
                                        <div className="text-left">
                                            <p className="cursor-pointer text-lg font-semibold">{item?.teacher?.name}</p>
                                            <p className="cursor-pointer text-sm font-light">{item?.teacher?.job}</p>
                                        </div>
                                        </div>
                                    </div>  
                                </div>
                            </a>
                        ))}              
            </div>
        </div>
    )
}
