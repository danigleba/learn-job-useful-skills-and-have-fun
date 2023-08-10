import Image from "next/image"
import { useState, useEffect } from "react"


export default function Related(props) {
    const [course, setCourse] = useState([])    

    useEffect(() => {
        if (props.id_course) {
            const url ='/api/courses/getCourse?id_course='+props.id_course
            fetch(url)
              .then(response => response.json())
              .then(data => setCourse(data.course))
        }
    }, [props.id_course])
    
    return (
        <div className="text-[#1A1C1F] p-4 bg-black bg-opacity-90 text-white">
            <h1 className="flex text-4xl font-bold">¿Qué quieres aprender hoy?</h1>
            <div className="pt-12 pb-12 md:grid md:grid-cols-8  md:gap-4">
                        {course?.steps?.map(item => (
                            <a key={item.id}>
                                <div className="flex justify-center mb-8 transition-transform">
                                    <div className="w-full rounded-2xl inline-block overflow-hidden p-4">
                                        <div className="shadow-md relative group w-full overflow-hidden bg-black h-32 rounded-md h-48">
                                            <Image
                                                src={item.url}
                                                height={1024}
                                                width={1024}
                                                className="object-cover transform duration-700"
                                            />
                                        </div>
                                        <div className="p-2 rounded-b-2xl">
                                            <div className="text-center px-3 pb-4 pt-2">
                                                <h1 className="font-bold text-2xl mb-2">
                                                    {item.title}
                                                </h1>
                                            </div>
                                            <div className="flex justify-center pb-3">

    

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
