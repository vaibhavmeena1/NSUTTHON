import React from "react";
import { useLocation } from "react-router-dom";
import TimeComponent from "../admin/Event/EditTimeFormat";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Calendar, User, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ImageScroller from "./EventImages";
import DOMPurify from "dompurify";
import "react-quill/dist/quill.snow.css"; // Or another theme of your choice

const EventDetails = () => {
  const location = useLocation();
  const event = location.state.event;
  const sanitizedDescription = DOMPurify.sanitize(event.description);
  const countPOCs = () => {
    let count = 0;
    if (event.name_poc_1 && event.phone_poc_1) count++;
    if (event.name_poc_2 && event.phone_poc_2) count++;
    if (event.name_poc_3 && event.phone_poc_3) count++;
    return count;
  };

  const pocCount = countPOCs();

  const [openTab, setOpenTab] = React.useState(1);
  {
    /* Banner 2 */

    /* <div className="w-full mb-4   rounded-md border dark:border-white border-black ">
                    <img src={event.banner_url_2} alt="Event Banner" style={{ aspectRatio: "30 / 9" }} className="h-full w-full object-cover  rounded-md" />
                </div> */
  }
  return (
    <div className=" p-8 sm:p-16 md:px-24 lg:36 xl:px-72 ">
      <h1 className=" font-extrabold font-raleway  text-center pb-4 tracking-tight text-3xl  sm:text-5xl">
        EVENTS
      </h1>

      <div className="w-full border  ">
        {/* Profile Image with Event details */}
        <div className="flex rounded-bl sm:border flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
          {/* Profile Image */}
          <div className=" sm:flex-none  sm:max-h-64 rounded items-center justify-center">
            {/* <img
              src={event.banner_url_1}
              alt="Event Poster"
              className="w-full  sm:max-h-64 rounded"
            /> */}
                  <ImageScroller imageLinks={[event.banner_url_1, event.banner_url_2, event.banner_url_3]} />

          </div>

          <div className="  relative w-full">
            <div>
              {/* Event details below the image in mobile and beside the image in larger views */}
              <div className="w-full items-center sm:items-start   flex flex-col  ">
                <div className=" py-2 sm:py-4">
                  <h1 className="font-raleway flex justify-center sm:justify-normal font-extrabold text-4xl sm:text-5xl md:text-6xl ">
                    {event.event_name}
                  </h1>
                  <p className="font-raleway flex justify-center sm:justify-normal opacity-70 text-xl sm:text-2xl ">
                    {event.society_name}
                  </p>
                </div>
                <div className="flex justify-center sm:justify-normal font-raleway gap-x-4 sm:gap-x-6 gap-y-1 flex-wrap ">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Calendar className="h-auto" />
                    <span className="text-lg  sm:text-2xl">
                      Day {event.day_number}
                    </span>
                  </div>
                  <div className="flex  gap-1  md:gap-12">
                    <Clock className="h-auto" />
                    <span className="text-lg sm:text-2xl  ">
                      <TimeComponent timeValue={event.time} />
                    </span>
                  </div>
                  <div className="flex sm:w-auto items-center sm:gap-2">
                    <MapPin className="h-auto" />
                    <span className=" text-lg  sm:text-2xl">{event.venue}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Registration button */}
            <div className="py-4 scale-95 xl:scale-125  xl:absolute top-1/3 max-w-xl align-middle right-10 sm:flex hidden  items-center justify-center">
              <Button
                variant="destructive"
                className="w-full font-raleway sm:text-xl"
              >
                <a
                  href={event.registration_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" font-raleway"
                >
                  Register
                </a>
              </Button>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center ">
          <Button
            variant="destructive"
            className="w-2/4  sm:hidden font-raleway sm:text-lg sm:text-xl"
          >
            <a
              href={event.registration_link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-raleway"
            >
              Register
            </a>
          </Button>
        </div>
        <div className="  sm:hidden flex mt-4 sm:mt-0 justify-center ">
          <Separator className="  w-11/12" />
        </div>

        {/* Description */}
        <h1 className=" justify-center underline mt-4 flex font-raleway text-lg sm:text-xl">
          ABOUT THE EVENT
        </h1>

        {/* <h1 className="mb-4 py-2 px-4 sm:px-8 text-md sm:text-xl">
          {event.description}
        </h1> */}
        {/* <div className=" pt-2 px-4 sm:px-8 " dangerouslySetInnerHTML={{ __html: event.description }}></div> */}
        <div
          className="mb-4 py-2 px-4 sm:px-8 text-md sm:text-xl"
          dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
        ></div>

        {pocCount > 0 && (
          <div className=" px-4 pb-4 sm:pt-2">
            <h1 className="text-center font-raleway text-lg sm:text-xl">
              EVENT POCs
            </h1>
            <div className=" w-full justify-center sm:flex ">
              <div
                className={`mt-4 sm:w-3/4 grid grid-cols-1 sm:grid-cols-${pocCount} gap-4`}
              >
                {event.name_poc_1 && event.phone_poc_1 && (
                  <a
                    href={`https://api.whatsapp.com/send?phone=91${event.phone_poc_1}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="border p-2 rounded-md shadow cursor-pointer hover:opacity-90">
                      <p className="font-bold mb-1 flex gap-2 uppercase">
                        <User /> {event.name_poc_1}
                      </p>
                      <p className=" gap-2 flex">
                        <Phone /> {event.phone_poc_1}
                      </p>
                    </div>
                  </a>
                )}
                {event.name_poc_2 && event.phone_poc_2 && (
                  <a
                    href={`https://api.whatsapp.com/send?phone=91${event.phone_poc_2}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="border p-2 rounded-md shadow cursor-pointer hover:opacity-90">
                      <p className="font-bold mb-1 flex gap-2 uppercase">
                        <User /> {event.name_poc_2}
                      </p>
                      <p className=" gap-2 flex">
                        <Phone /> {event.phone_poc_2}
                      </p>
                    </div>
                  </a>
                )}
                {event.name_poc_3 && event.phone_poc_3 && (
                  <a
                    href={`https://api.whatsapp.com/send?phone=91${event.phone_poc_3}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="border p-2 rounded-md shadow cursor-pointer hover:opacity-90">
                      <p className="font-bold mb-1 flex gap-2 uppercase">
                        <User /> {event.name_poc_3}
                      </p>
                      <p className=" gap-2 flex">
                        <Phone /> {event.phone_poc_3}
                      </p>
                    </div>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
