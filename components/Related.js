import Image from "next/image"
import { useState, useEffect } from "react"


export default function Related() {
    const [courses, setCourses] = useState([])    
   
    useEffect(() => {
        const url ='/api/courses/getCourses'
        fetch(url)
          .then(response => response.json())
          .then(data => setCourses(data.data))
    }, [])
    
    return (
        <div className="text-[#1A1C1F] mx-4 sm:mx-12">
            <h1 className="flex justify-center text-center text-4xl font-bold">¿Qué quieres aprender hoy?</h1>
            <div className="pt-12 pb-12 md:grid md:grid-cols-3  md:gap-4">
                        {courses?.map(item => (
                            <a href={"/"+item.id+"/intro"} key={item.id}>
                                <div className="flex justify-center mb-8 active:scale-95 transition-transform cursor-pointer hover:scale-105">
                                    <div className="w-full rounded-2xl inline-block overflow-hidden p-4 cursor-pointer">
                                        <div className="shadow-md relative group w-full overflow-hidden bg-black h-32 rounded-md h-48">
                                            <Image
                                                src={item.cover_url}
                                                height={1024}
                                                width={1024}
                                                className="object-cover transform duration-700"
                                            />
                                        </div>
                                        <div className="p-2 rounded-b-2xl">
                                            <div className="text-center px-3 pb-4 pt-2">
                                                <h1 className="font-bold text-2xl mb-2 cursor-pointer">
                                                    {item.title}
                                                </h1>
                                            </div>
                                            <div className="flex justify-center pb-3">

                                                <div className="text-center border-rast:border-r-0 gap-4 cursor-pointer">
                                                    {
                                                        item.tags.map(tags => (
                                                            <span key={tags} className="font-semibold py-2 px-6 badge mr-2 rounded-md bg-[#1A1C1F] cursor-pointer text-white">{tags}</span>
                                                        ))
                                                    }
                                                </div>

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
