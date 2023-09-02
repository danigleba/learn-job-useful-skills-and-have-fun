import Image from "next/image"
import { useState, useEffect } from "react"
import {useRouter} from "next/router"

export default function Playlist(props) {
    const router = useRouter()
    const [course, setCourse] = useState([])    

    function changeStep(index) {
       if (index <= props.limitStep) {
            const url = "/api/courses/setProgress?index=" + index + "&id_course=" + props.id_course + "&email=" +  props.user?.email
            const response = fetch(url, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
            })
            router.reload()
        }
    }

    useEffect(() => {
        if (props.id_course) {
            const url ='/api/courses/getCourse?id_course='+props.id_course
            fetch(url)
              .then(response => response.json())
              .then(data => setCourse(data.course))
        }
    }, [props.id_course])
    
    return (
        <div className="text-[#1A1C1F] px-6 bg-opacity-90 text-white">
            <div className="pb-12 grid grid-cols-2 md:grid-cols-5 md:space-y-0 gap-4">
                        {course?.steps?.map((item, index) => (                                
                                <a key={`${item.id}-${index}`}>
                                    <div className="flex justify-center items-center">
                                        <button onClick={() => changeStep(index)} className="w-full">
                                                <div className={`${((index)<= props.limitStep) ? "hover:bg-[#333533] hover:border-[#333533] hover:text-white duration-200" : ""}  text-[#333533] rounded-md px-1 py-2 ${(index == props.activeStep) ? "bg-[#333533] text-white" : "bg-[#f4f4f4] border-[#f4f4f4]"} ${(index > props.limitStep) ? "cursor-default" : "cursor-pointer"}`}>
                                                    <div className="text-center flex justify-center px-2 items-center space-x-2">
                                                        <h1 className="truncate font-medium  text-sm sm:text-md">
                                                            {item.title}
                                                        </h1>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#333533" className={`w-5 h-5 ${((index -1)>= props.limitStep) ? "inline-block" : "hidden"}`}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                                        </svg>
                                                    </div>
                                                </div>     
                                        </button>
                                    </div>
                                </a>
                        ))}              
            </div>
        </div>
    )
}
