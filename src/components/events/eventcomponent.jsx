import axios from "axios";
import React, { useEffect, useState } from "react";
import TimeComponent from "../admin/Event/EditTimeFormat2";
import EventDetails from "./EventDetailed"; // Assuming it's in the same directory
import { useNavigate } from "react-router-dom";

const fetchEvents = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/events`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching the events:", error);
    return [];
  }
};

const EventGrid = ({ openTab }) => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // <-- New state

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchEvents();
      
      // Sort the events based on time in ascending order
      const sortedEvents = data.sort((a, b) => {
        if (a.time < b.time) return -1;
        if (a.time > b.time) return 1;
        return 0;
      });
      
      setEvents(sortedEvents);
    };
    
    fetchData();
  }, []); // <-- Fetch events only once when the component mounts

  const filteredEvents = events.filter((event) => event.day_number === openTab);
  // ... [rest of the component]

  return (
    <div className="grid grid-cols-2  md:grid-cols-4 gap-4 md:gap-7">
      {filteredEvents.map((event) => (
        <div
        key={event.event_id}
        className="relative overflow-hidden rounded transition-transform hover:scale-105"
        onClick={() =>
          navigate(`/events/${event.event_id}`, { state: { event } })
        }
      >
        <div className="relative w-full overflow-hidden">
          <div style={{ paddingBottom: "100%" }}></div>
      
          <img
            src={event.banner_url_1}
            alt={event.event_name}
            className="absolute top-0 left-0 w-full dark:border dark:border-white h-full object-cover rounded"
          />
      
          {/* Time component positioned over the image */}
          <div className="absolute bottom-0 right-2 sm:right-4 dark:mb-[1px] bg-white dark:border-b-0 dark:border-white   border dark:bg-[#03050a] px-1 sm:px-2 py-0.5 sm:py-1 rounded-t-md">
            <TimeComponent timeValue={event.time} className="" />
          </div>
        </div>
      
        <div className="flex justify-between mt-2">
          <div className="space-y-1 text-base">
            <h3 className="font-medium leading-none">{event.event_name}</h3>
            <p className="text-sm text-muted-foreground">
              {event.society_name}
            </p>
          </div>
        </div>
      </div>
      
      ))}
      {selectedEvent && (
        <EventDetails
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}{" "}
      {/* <-- Conditionally render details */}
    </div>
  );
};

export default EventGrid;
