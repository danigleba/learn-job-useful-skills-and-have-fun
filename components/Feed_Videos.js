import { useState, useEffect } from "react"
import Image from 'next/image'

export default function Feed_Videos() {
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
            <div className='mx-8 md:mx-24 gap-4 flex text-center items-center pt-8 pb-2 overflow-x-scroll scrollbar-hide justify-start lg:justify-center'>   
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
                                    <a className={`${(i.tag != "" && i.tag != item /*|| i.private*/) ? "hidden" : ""} hover:scale-105 duration-200`} href={`/cursos/${i.id}`} key={`${i.id}-${index}`}>
                                        <div style={{
                                            backgroundImage: `url(${i?.cover_url})`,
                                            }} className="aspect-w-16 aspect-h-9 shadow-[0_8px_30px_rgb(0,0,0,0.08)]  w-full  bg-cover bg-center rounded-lg">
                                                    <div className="flex justify-between">
                                                        <div className="flex justify-center text-[#333533] font-extrabold text-sm px-4 py-2 w-max h-max bg-white rounded-md mx-2 my-2">
                                                                      <p>+{i.points} pts</p>
                                                                  </div>
                                                                  <div className="flex justify-center items-center text-[#] font-extrabold text-base px-3 py-2 w-fit h-max bg-white rounded-md mx-2 my-2">
                                                                          <Image className={`${(i.category == "Social Skills") ? "": "hidden"}`} alt="Hi hand emoji" height={20} width={20} src={`${(i.category == "Social Skills") ? "https://firebasestorage.googleapis.com/v0/b/kualify-web-fb.appspot.com/o/emojis%2Fwaving_hand.webp?alt=media&token=108db640-ffc8-4adb-88c4-2a86694bccd4" : ""}`} />
                                                                          <Image className={`${(i.category == "Entrepreneurship") ? "": "hidden"}`} alt="Briefcase emoji" height={20} width={20} src={`${(i.category == "Entrepreneurship") ? "https://firebasestorage.googleapis.com/v0/b/kualify-web-fb.appspot.com/o/emojis%2Fbriefcase.webp?alt=media&token=7091e5ba-9a24-43af-a956-4b82f1fc281b" : ""}`} />
                                                                          <Image className={`${(i.category == "Productivity") ? "": "hidden"}`} alt="Man working emoji" height={20} width={20} src={`${(i.category == "Productivity") ? "https://firebasestorage.googleapis.com/v0/b/kualify-web-fb.appspot.com/o/emojis%2Fman_technologist.webp?alt=media&token=f0dc43d7-e713-4971-923a-cc2820bece1d" : ""}`} />
                                                                          <Image className={`${(i.category == "Personal Finance") ? "": "hidden"}`} alt="Flying money emoji" height={20} width={20} src={`${(i.category == "Personal Finance") ? "https://firebasestorage.googleapis.com/v0/b/kualify-web-fb.appspot.com/o/emojis%2Fmoney_with_wings.webp?alt=media&token=37061431-6ed8-4109-8a76-b650601edf67" : ""}`} />
                                                                      </div>
                                                            </div>
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
