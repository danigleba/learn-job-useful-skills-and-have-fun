import { useEffect, useState} from "react"
import {BiSolidBriefcase} from 'react-icons/bi'
export default function User_Experience(props) {
    const [videos, setVideos] = useState([])
    const [entreprenerushipPoints, setEntreprenerushipPoints] = useState(0)
    const [socialSkillsPoints, setSocialSkillsPoints] = useState(0)
    const [personalFinancePoints, setPersonalFinancePoints] = useState(0)
    const [productivityPoints, setproductivityPoints] = useState(0)




    useEffect(() => {
        if (videos) {
          videos.forEach((video) => {
            switch (video.category) {
              case "Entrepreneurship":
                setEntreprenerushipPoints((prevPoints) => prevPoints + video.points);
                break;
              case "Social Skills":
                setSocialSkillsPoints((prevPoints) => prevPoints + video.points);
                break;
              case "Personal Finance":
                setPersonalFinancePoints((prevPoints) => prevPoints + video.points);
                break;
              case "Productivity":
                setproductivityPoints((prevPoints) => prevPoints + video.points);
                break;
              default:
                break;
            }
          });
        }
      }, [videos]);
      

    useEffect(() => {
        if (props.email) {
            const url ='/api/courses/getAllCompletedVideos?email=' + props?.email
            fetch(url)
            .then(response => response.json())
            .then(data => setVideos(data.data))
        }
    }, [props.email])


    function getBackgroundColor(points) {
        if (points === 0) {
          return "bg-[#f4f4f4]";
        } else if (points > 0 && points < 100) {
          return "bg-gradient-to-r from-rose-400 to-orange-300";
        } else if (points >= 100 && points < 500) {
          return "bg-gradient-to-r from-teal-200 to-lime-200";
        } else if (points >= 500) {
          return "bg-gradient-to-r from-rose-100 to-teal-100";
        } else {
          // Handle other cases if needed
          return ""; // Default background color class
        }
      }
    return (
    <main className="w-full md:w-max pt-6 px-6">
        <p className="text-center font-extrabold text-2xl text-[#333533] pb-4">Tus puntos</p>
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex justify-center ">
            <div className={`space-y-4 py-3 flex-col px-8 text-center justify-center h-full w-full rounded-md text-[#333533] font-bold text-lg flex space-x-2 items-center ${getBackgroundColor(entreprenerushipPoints)}`}>
                <div className="space-y-1">
                    <div className="text-3xl">
                        💼
                    </div> 
                    <div className="text-center flex justify-center">
                        <p>{entreprenerushipPoints} <a className="text-sm">pts</a></p>
                    </div>
                </div>
            </div>
            <div className={`space-y-4 py-3 flex-col px-8  text-center justify-center h-full w-full rounded-md text-[#333533] font-bold text-lg flex space-x-2 items-center ${getBackgroundColor(socialSkillsPoints)}`}>
                <div className="space-y-1">
                    <div className="text-3xl ">
                        👋
                    </div> 
                    <div className="text-center flex justify-center">
                        <p>{socialSkillsPoints} <a className="text-sm">pts</a></p>
                    </div>
                </div>
            </div>
            <div className={`space-y-4 py-3 flex-col px-8 text-center justify-center h-full w-full rounded-md text-[#333533] font-bold text-lg flex space-x-2 items-center ${getBackgroundColor(personalFinancePoints)}`}>
                <div className="space-y-1">
                    <div className="text-3xl ">
                        💶
                    </div> 
                    <div className="text-center flex justify-center">
                        <p>{personalFinancePoints} <a className="text-sm">pts</a></p>
                    </div>
                </div>
            </div>
            <div className={`space-y-4 py-3 flex-col px-8 text-center justify-center h-full w-full rounded-md text-[#333533] font-bold text-lg flex space-x-2 items-center ${getBackgroundColor(productivityPoints)}`}>
                <div className="space-y-1">
                    <div className="text-3xl ">
                        👩‍💻
                    </div> 
                    <div className="text-center flex justify-center ">
                        <p>{productivityPoints} <a className="text-sm">pts</a></p>
                    </div>
                </div>
            </div>

       </div>
       <div className="flex justify-center bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-md p-4 mt-6">
        <div className="grid grid-cols-3 gap-4 font-extrabold text-sm md:text-md text-[#333533] w-full">
             
                <div className="bg-gradient-to-r from-rose-400 to-orange-300 h-12 w-full text-center rounded-md">
                    <div className="flex items-center h-full w-full justify-center">
                        <p>1+</p>
                    </div>    
                </div>
                <div className="bg-gradient-to-r from-teal-200 to-lime-200 h-12 w-full text-center rounded-md">
                <div className="flex items-center h-full w-full justify-center">
                    <div></div>
                        <p>100+</p>
                    </div>  
                </div>
                <div className="bg-gradient-to-r from-rose-100 to-teal-100 h-12 w-full text-center rounded-md">
                    <div className="flex items-center h-full w-full justify-center">
                    <div>
                        <p>500+</p>
                    </div>  
                </div>
                </div>
        </div>
       </div>
    </main>
  )
}