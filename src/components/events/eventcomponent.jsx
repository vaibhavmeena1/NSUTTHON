import axios from 'axios';
import React, { useEffect, useState } from 'react';

const fetchEvents = async () => {
  try {
    const response = await axios.get('http://localhost:3000/events');
    return response.data;
  } catch (error) {
    console.error('Error fetching the events:', error);
    return [];
  }
};

const EventGrid = ({ openTab }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchEvents();
      setEvents(data);
    };
    fetchData();
  }, []);  // <-- Fetch events only once when the component mounts

  const filteredEvents = events.filter(event => event.day_number === openTab);

  return (
    <div className="grid grid-cols-2  md:grid-cols-4 gap-4 md:gap-5">
      {filteredEvents.map(event => (
        <div key={event.event_id} className="relative overflow-hidden rounded">
          <div className="relative w-full pb-full transition-all hover:scale-105 overflow-hidden">
            <img src={event.banner_url_1} alt={event.event_name} className="w-full dark:border dark:border-white rounded-md h-full object-cover" />
          </div>
          <div className="space-y-1 text-base mt-2">
            <h3 className="font-medium leading-none">{event.event_name}</h3>
            <p className="text-sm text-muted-foreground">{event.society_name}</p>
          </div>
        </div>
      ))}
      
      
    </div>
  );
};

export default EventGrid;
