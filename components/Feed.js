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
        <div>
            <h1 className="flex justify-center text-4xl mt-12">Find your next course</h1>
            <div className="pt-8 md:grid md:grid-cols-3 md:px-12 md:gap-4">
                        {courses?.map(item => (
                            <a href={"/"+item.id} key={item.id}>
                                <div className="flex justify-center mb-8 active:scale-95 transition-transform cursor-pointer hover:scale-105">
                                    <div className="rounded-2xl inline-block overflow-hidden p-4 cursor-pointer">
                                        <div className="relative group w-full overflow-hidden bg-black h-32 rounded-md h-48">
                                            <img
                                                src={item.cover_url}
                                                className="object-cover w-full h-full transform duration-700"
                                            />
                                        </div>
                                        <div className="p-2 rounded-b-2xl">
                                            <div className="text-center px-3 pb-4 pt-2">
                                                <h1 className="font-bold text-2xl text-black mb-2 cursor-pointer">
                                                    {item.title}
                                                </h1>
                                            </div>
                                            <div className="flex justify-center pb-3 text-[#f4f4f4]">
                                                <div className="text-center mr-3 border-r last:border-r-0 gap-4 cursor-pointer ">
                                                    {
                                                        item.tags.map(tags => (
                                                            <span key={tags} className="font-semibold pr-4 pl-4 pt-1.5 pb-1.5 badge mr-2 rounded-md bg-[#f4f4f4] cursor-pointer text-black">{tags}</span>
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
