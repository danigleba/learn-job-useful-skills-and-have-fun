import Image from "next/image"
import { useState, useEffect, Fragment} from "react"
import { Dialog, Transition } from '@headlessui/react'

export default function Feed() {
    const [courses, setCourses] = useState([])  
    const [isOpen, setIsOpen] = useState(false)    

    function closeModal() {
        setIsOpen(false)
    }
    function openModal() {
        setIsOpen(true)
    }

    useEffect(() => {
        const url ='/api/courses/getCourses'
        fetch(url)
          .then(response => response.json())
          .then(data => setCourses(data.data))
    }, [])
    return (
        <>  
        <div className='flex justify-center'>
                    <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-2 gap-12 justify-center w-full lg:w-2/3">
                    {courses?.map(item => (
                                <a onClick={openModal} key={item.id} className={`${(item.tag != "Course" ? "hidden" : "" )}`}>
                                    {item.tag == "Course" ? (
                                        <div className="cursor-pointer mt-12 w-full hover:bg-[#333533] duration-200 hover:text-white text-[#333533] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-xl pb-10">
                                        <div
                                            className="flex rounded-xl bg-cover bg-center justify-center h-56"
                                            style={{
                                              backgroundImage: `url(${item.cover_url})`,
                                            }}
                                            loading="lazy">
                                                <div className="w-full flex justify-between ">
                                                                      <div className="flex justify-center text-[#333533] font-extrabold text-sm px-4 py-2 w-max h-max bg-white rounded-md mx-2 my-2">
                                                                          <p>+{item.points} pts</p>
                                                                      </div>
                                                                      <div className="flex justify-center items-center text-[#] font-extrabold text-base px-3 py-2 w-fit h-max bg-white rounded-md mx-2 my-2">
                                                                          <Image className={`${(item.category == "Social Skills") ? "": "hidden"}`} alt="Hi hand emoji" height={20} width={20} src={`${(item.category == "Social Skills") ? "https://firebasestorage.googleapis.com/v0/b/kualify-web-fb.appspot.com/o/emojis%2Fwaving_hand.webp?alt=media&token=108db640-ffc8-4adb-88c4-2a86694bccd4" : ""}`} />
                                                                          <Image className={`${(item.category == "Entrepreneurship") ? "": "hidden"}`} alt="Briefcase emoji" height={20} width={20} src={`${(item.category == "Entrepreneurship") ? "https://firebasestorage.googleapis.com/v0/b/kualify-web-fb.appspot.com/o/emojis%2Fbriefcase.webp?alt=media&token=7091e5ba-9a24-43af-a956-4b82f1fc281b" : ""}`} />
                                                                          <Image className={`${(item.category == "Productivity") ? "": "hidden"}`} alt="Man working emoji" height={20} width={20} src={`${(item.category == "Productivity") ? "https://firebasestorage.googleapis.com/v0/b/kualify-web-fb.appspot.com/o/emojis%2Fman_technologist.webp?alt=media&token=f0dc43d7-e713-4971-923a-cc2820bece1d" : ""}`} />
                                                                          <Image className={`${(item.category == "Personal Finance") ? "": "hidden"}`} alt="Flying money emoji" height={20} width={20} src={`${(item.category == "Personal Finance") ? "https://firebasestorage.googleapis.com/v0/b/kualify-web-fb.appspot.com/o/emojis%2Fmoney_with_wings.webp?alt=media&token=37061431-6ed8-4109-8a76-b650601edf67" : ""}`} />
                                                                      </div>
                                                                </div>
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

                                    ) : (
                                        <></>
                                    )}
                                </a>
                            ))}              
                </div>
                <Transition appear show={isOpen} as={Fragment}>
                        <Dialog as="div" className="relative z-10" onClose={closeModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0">
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>
                        <div className="fixed inset-0 overflow-y-auto w-full ">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95">
                                    <Dialog.Panel className="w-full md:w-2/3 lg:w-1/2 wtransform overflow-hidden rounded-xl bg-white p-4 text-left align-middle transition-all">
                                        <div className="justify-center text-[#1A1C1F]">
                                            <p className="font-bold text-xl text-center">Curso disponible próximamente</p>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                        </Dialog>
                    </Transition>
            </div>
        </>
    )
}
