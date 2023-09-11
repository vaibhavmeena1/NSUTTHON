import React from 'react'
import { Button } from "@/components/ui/button"
import EventGrid from "../components/events/eventcomponent";

export const Events = () => {
    const [openTab, setOpenTab] = React.useState(1);

    return (
        <div className=' p-8 md:p-16 lg:px-48 '>
             <h1 className=" font-extrabold font-raleway  text-center pb-4 tracking-tight text-3xl  md:text-5xl">
                        EVENTS
                    </h1>
            <ul className="flex w-full list-none flex-wrap border-b-4 border-black dark:border-slate-100 m-0 p-0 text-end space-x-0 items-end">
                <li className={` ${openTab === 1 ? "border-b-4 text-3xl" : "text-slate-500 text-2xl"} border-black   dark:border-slate-100 m-0 p-0`}>
                    <div onClick={e => {
                        e.preventDefault();
                        setOpenTab(1);
                    }}>
                        <h1 className={`${openTab === 1 ? "md:text-3xl transition-all text-3xl" : "md:text-2xl transition-all sm:hover:text-3xl text-2xl"} md:pb-4 pb-2 font-extrabold tracking-tight  px-2 sm:px-4`}>
                            DAY 1
                        </h1>
                    </div>
                </li>

                <li className={`  ${openTab === 2 ? "border-b-4 text-3xl" : "text-slate-500 text-2xl"} border-black dark:border-slate-100 m-0 p-0`}>
                    <div onClick={e => {
                        e.preventDefault();
                        setOpenTab(2);
                    }}>
                        <h1 className={`${openTab === 2 ? "md:text-3xl transition-all text-3xl" : "md:text-2xl  transition-all sm:hover:text-3xl text-2xl"} md:pb-4 pb-2 font-extrabold tracking-tight   px-2 sm:px-4`}>
                            DAY 2
                        </h1>
                    </div>
                </li>
                <li className={` flex-1   md:flex-none ${openTab === 3 ? "border-b-4 text-3xl" : "text-slate-500 text-2xl"} border-black dark:border-slate-100 m-0 p-0`}>
                    <div onClick={e => {
                        e.preventDefault();
                        setOpenTab(3);
                    }}>
                        <h1 className={`${openTab === 3 ? "md:text-3xl transition-all text-3xl" : "md:text-2xl transition-all sm:hover:text-3xl text-2xl"} md:pb-4 pb-2 text-left font-extrabold   px-2 sm:px-4  `}>
                            DAY 3
                        </h1>
                    </div>
                </li>
            </ul>


            <div className="pt-4 md:pt-8">
                <EventGrid openTab={openTab} />

            </div>
        </div>

    )
}
