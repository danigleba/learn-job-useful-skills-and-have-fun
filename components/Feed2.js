import Image from "next/image"
import { useState, useEffect } from "react"

export default function Feed() {
    const [content, setContent] = useState([])
    const [selectedTag, setSelectedTag] = useState("")

    function selectTag(tag) {
        setSelectedTag(tag)
    }

    useEffect(() => {
        const url ='/api/content/getContent'
        fetch(url)
          .then(response => response.json())
          .then(data => setContent(data.data))
}, [])
    return (
        <>  
        <div className=' mx-8 md:mx-24 gap-4 flex text-center items-center pt-12 pb-2 overflow-x-scroll scrollbar-hide justify-start lg:justify-center'>   
            {content?.map((item, index) => (                                
                                <a key={`${item.id}-${index}`}>
                                    <button onClick={() => selectTag(item.id)} className={`${(selectedTag == item.id) ? "bg-[#333533] text-white" : "bg-[#f4f4f4] text-[#333533]"} hover:bg-[#333533] hover:text-white duration-200  cursor-pointer px-4 py-2 rounded-md font-semibold text-xs md:text-sm`}>
                                            <p className='truncate'>{item.id}</p>
                                    </button>
                                </a>
            ))} 
          </div>
            <div className='pb-24 mx-8 lg:mx-48 text-[#333533] text-center pt-6 space-y-12 items-center  text-2xl md:text-xl justify-center h-full'>
                 {content?.map((item, index) => (                                
                                <a key={`${item.id}-${index}`}>
                                    <div className={`pb-12 ${(selectedTag != "" && selectedTag != item.id) ? "hidden" : ""} `}>
                                        <p className='font-bold text-3xl'>{item.id}</p>
                                        <div className='pb-10 flex gap-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full pt-6'> 
                                            {item?.videos?.map((item, index) => (                                
                                                <a href={`/videos/${item.id}`} key={`${item.id}-${index}`}>
                                                        <div className='w-full h-full '>
                                                            <div style={{
                                                            backgroundImage: `url(${item?.cover_url})`,
                                                            }} className="w-full h-40 bg-colver bg-[url bg-center rounded-lg"></div>
                                                            <div className='pt-4 flex items-center gap-4'>
                                                                <div className='h-12 w-12 rounded-full bg-black'></div>
                                                                <div>
                                                                    <p className='text-left font-semibold text-base'>{item.title}</p>
                                                                    <p className='text-base text-left font-light'>{item.author}</p>
                                                                </div>
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
