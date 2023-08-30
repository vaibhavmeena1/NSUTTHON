import React from 'react';
import { useLocation } from 'react-router-dom';
import TimeComponent from '../admin/Event/EditTimeFormat';
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Calendar } from "lucide-react"
const EventDetails = () => {
    const location = useLocation();
    const event = location.state.event;


    const [openTab, setOpenTab] = React.useState(1);

    return (
        <div className=' p-8 md:p-16 lg:px-72 '>
            <h1 className=" font-extrabold font-raleway  text-center pb-4 tracking-tight text-3xl  md:text-5xl">
                EVENTS
            </h1>





            <div className="w-full border">

                {/* Banner 2 */}
                {/* <div className="w-full mb-4   rounded-md border dark:border-white border-black ">
                    <img src={event.banner_url_2} alt="Event Banner" style={{ aspectRatio: "30 / 9" }} className="h-full w-full object-cover  rounded-md" />
                </div> */}

                {/* Profile Image with Event details */}
                <div className="flex  items-center gap-2 mb-4">

                    {/* Profile Image */}
                    <div className="flex-none  items-center justify-center flex ">
                        <img src={event.banner_url_1} alt="Event Poster" className="  max-h-60  rounded" />
                    </div>

                    {/* Event details beside the image */}
                    <div className=" w-full   flex flex-col ">
                    <div className='pb-4'>
                            <h1 className=" font-raleway font-extrabold text-xl md:text-6xl overflow-clip">{event.event_name}</h1>
                            <p className="font-raleway opacity-70 text-base md:text-2xl ">{event.society_name}</p>
                        </div>

                        <div className="flex font-raleway gap-x-4 md:gap-x-6 gap-y-1 flex-wrap ">
                            <div className="flex w-full md:w-auto items-center md:gap-2">
                                <MapPin className='h-4 md:h-auto' />
                                <span className=" text-sm  md:text-2xl">{event.venue} </span>
                            </div>
                            <div className="flex items-center gap-1 md:gap-2">
                                <Calendar className='h-4 md:h-auto' />
                                <span className="text-sm  md:text-2xl">{event.day_number} </span>
                            </div>
                            <div className="flex items-center justify-center gap-1  md:gap-12">
                                <Clock  className='h-4 md:h-auto' />
                                <span className="text-sm md:text-2xl  "><TimeComponent timeValue={event.time} /></span>
                            </div>
                            
                        </div>
                        {/* Registration button on the rightest side */}
                        <div className="md:block py-4  flex items-center justify-center hidden ">
                            <Button variant="destructive" className=" font-raleway   w-3/4 sm:text-lg md:text-xl">
                                <a href={event.registration_link} target="_blank" rel="noopener noreferrer">
                                    Register
                                </a>
                            </Button>
                        </div>
                    </div>



                </div>
                <Button variant="destructive" className="w-full md:hidden font-raleway sm:text-lg md:text-xl">
                    <a href={event.registration_link} target="_blank" rel="noopener noreferrer">
                        Register
                    </a>
                </Button>
                {/* Description */}
                <hi className=" justify-center mt-4 flex font-raleway sm:text-lg md:text-xl" > ABOUT THE EVENT </hi>
                <h1 className='mb-4  px-4 sm:text-lg md:text-xl'>{event.description}</h1>


                {/* Event POC details */}
                <div>
                    <h4 className="text-lg font-semibold">Event POCs:</h4>
                    <div className="space-y-1">
                        {event.name_poc_1 && event.phone_poc_1 && <p>{event.name_poc_1} - {event.phone_poc_1}</p>}
                        {event.name_poc_2 && event.phone_poc_2 && <p>{event.name_poc_2} - {event.phone_poc_2}</p>}
                        {event.name_poc_3 && event.phone_poc_3 && <p>{event.name_poc_3} - {event.phone_poc_3}</p>}
                    </div>
                </div>

            </div>

        </div>


    )
}

export default EventDetails;






// import React from 'react'
// import { Button } from "@/components/ui/button"
// import EventGrid from "../components/events/eventcomponent";

// export const Events = () => {
//     const [openTab, setOpenTab] = React.useState(1);

//     return (
//         <div className=' p-8 md:p-16 lg:px-48 '>
//              <h1 className=" font-extrabold font-raleway  text-center pb-4 tracking-tight text-3xl  md:text-5xl">
//                         EVENTS
//                     </h1>
//             <ul className="flex w-full list-none flex-wrap border-b-4 border-black dark:border-slate-100 m-0 p-0 text-end space-x-0 items-end">
//                 <li className={` ${openTab === 1 ? "border-b-4 text-3xl" : "text-slate-500 text-2xl"} border-black   dark:border-slate-100 m-0 p-0`}>
//                     <div onClick={e => {
//                         e.preventDefault();
//                         setOpenTab(1);
//                     }}>
//                         <h1 className={`${openTab === 1 ? "md:text-3xl transition-all text-3xl" : "md:text-2xl transition-all hover:text-3xl text-2xl"} md:pb-4 pb-2 font-extrabold tracking-tight  px-4`}>
//                             DAY 1
//                         </h1>
//                     </div>
//                 </li>

//                 <li className={`  ${openTab === 2 ? "border-b-4 text-3xl" : "text-slate-500 text-2xl"} border-black dark:border-slate-100 m-0 p-0`}>
//                     <div onClick={e => {
//                         e.preventDefault();
//                         setOpenTab(2);
//                     }}>
//                         <h1 className={`${openTab === 2 ? "md:text-3xl transition-all text-3xl" : "md:text-2xl  transition-all hover:text-3xl text-2xl"} md:pb-4 pb-2 font-extrabold tracking-tight  px-4`}>
//                             DAY 2
//                         </h1>
//                     </div>
//                 </li>
//                 <li className={` flex-1   md:flex-none ${openTab === 3 ? "border-b-4 text-3xl" : "text-slate-500 text-2xl"} border-black dark:border-slate-100 m-0 p-0`}>
//                     <div onClick={e => {
//                         e.preventDefault();
//                         setOpenTab(3);
//                     }}>
//                         <h1 className={`${openTab === 3 ? "md:text-3xl transition-all text-3xl" : "md:text-2xl transition-all hover:text-3xl text-2xl"} md:pb-4 pb-2 text-left font-extrabold  px-4 tracking-tightpx-8 `}>
//                             DAY 3
//                         </h1>
//                     </div>
//                 </li>
//             </ul>


//             <div className="pt-4 md:pt-8">
//                 <EventGrid openTab={openTab} />

//             </div>
//         </div>

//     )
// }
