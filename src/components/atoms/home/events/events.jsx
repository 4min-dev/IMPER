import React, {useEffect} from 'react'
import './events.css'

export const Events = ({ events, selectedEvent, onEventSelect }) => {
    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы в JavaScript начинаются с 0
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${day}.${month} • ${hours}:${minutes}`;
    } 

    useEffect(() => {
        if (events.length > 0) {
            onEventSelect(events[0]);
        }
        // console.log(events[0]);
    }, [])
    

    return (
        <>
        {events.map(( event, i ) => (
            <div key={i} className={`event ${selectedEvent?.id === event.id ? 'event--selected' : ''}`} onClick={() => onEventSelect(event)}>
                <div className='event__name'>{ event.name }</div>
                <img 
                    src={event.photo} 
                    className='event__image'
                    alt='image-event'
                    />
                <div className='event__date'>
                    {formatDate(event.when)} 
                </div>
            </div>
        ))}
        </>
    );
}