import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TimeComponent from '../admin/Event/EditTimeFormat';
import EventDetails from './EventDetailed';  // Assuming it's in the same directory
import { useNavigate } from 'react-router-dom';

const fetchEvents = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/events`);
    return response.data;
  } catch (error) {
    console.error('Error fetching the events:', error);
    return [];
  }
};

const EventGrid = ({ openTab }) => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);  // <-- New state

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchEvents();
      setEvents(data);
    };
    fetchData();
  }, []);  // <-- Fetch events only once when the component mounts

  const filteredEvents = events.filter(event => event.day_number === openTab);
  return (
    <div className="grid grid-cols-2  md:grid-cols-4 gap-4 md:gap-7">
      {filteredEvents.map(event => (
        <div 
          key={event.event_id} 
          className="relative overflow-hidden rounded transition-transform hover:scale-105" 
          onClick={() => navigate(`/events/${event.event_id}`, { state: { event } })}
        >
          <div className="relative w-full overflow-hidden">
            <div style={{ paddingBottom: "100%" }}></div>

            <img
              src={event.banner_url_1}
              alt={event.event_name}
              className="absolute top-0 left-0 w-full dark:border dark:border-white h-full object-cover rounded"
            />
          </div>
          <div className='flex justify-between'>
            <div className="space-y-1 text-base mt-2">
              <h3 className="font-medium leading-none">{event.event_name}</h3>
              <p className="text-sm text-muted-foreground">{event.society_name}</p>
            </div>
            <div className='justify-center items-center flex text-md font-medium'>
              <TimeComponent timeValue={event.time} />
            </div>
          </div>
        </div>


      ))}

      {selectedEvent && <EventDetails event={selectedEvent} onClose={() => setSelectedEvent(null)} />}  {/* <-- Conditionally render details */}

    </div>
  );
};

export default EventGrid;
