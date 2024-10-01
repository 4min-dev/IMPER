import React, { useEffect, useState, useContext } from 'react'
import event from '../../../../api/event';
import './sideblock.css'
import { SideblockCard } from './sideblock';
import LocalStorage from '../../../../utils/LocalStorage';
import { PointContext } from '../../../../context/ChosenItem';
import { Events } from '../events/events';
import { Store } from 'react-notifications-component';
import { defineDay } from '../../../../composables/defineDay';
import { wayContext } from '../../../../context/wayItem';

export const Event = () => {
    // const { get } = new LocalStorage;
    const { getMyEvents, unsubscribeFromEvent } = event;
    const { selectedItem, setSelectedItem } = useContext(PointContext);
    const { wayItem, setWayItem } = useContext(wayContext);
    const [events, setEvents] = useState([]);
    const [chosedShelter, setChosedShelter] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
   // event 387 

    const setShelter = (item) => {
        setChosedShelter(item);
        setSelectedItem(item);
        setSelectedEvent(item?.events[0]);
    }

    const getMyEventsFunc = async () => {
        const { data } = await getMyEvents();
        if (data) {
            setEvents(data);
            setChosedShelter(data[0]);
            // console.log(data[0].events[0]);
            setSelectedEvent(data[0]?.events[0]);
        }
    }

    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы в JavaScript начинаются с 0
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${day}.${month} • ${hours}:${minutes}`;
    } 

    const showMessage = (item) => {
        // console.log(item, 'selectedItem');
        setWayItem(item);
    }

    useEffect(() => {
        if (selectedEvent !== null) {
            setSelectedEvent(selectedEvent);
        } else {
            setSelectedEvent(null);
        }
    }, [selectedEvent]);

    useEffect(() => {
        if (chosedShelter !== null) {
           setChosedShelter(chosedShelter);
        } else {
            setChosedShelter(null);
        }
    }, [chosedShelter]);

    const handleEventSelect = (eventId) => {
        setSelectedEvent(eventId);
    };

    function reorderDays(openingHours) {
        const orderedDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        const orderedOpeningHours = {};
        
        for (const day of orderedDays) {
            if (openingHours[day]) {
                orderedOpeningHours[day] = openingHours[day];
            }
        }
        
        return orderedOpeningHours;
    }


    const closeEvent = async () => {
       const res = await unsubscribeFromEvent({id: selectedEvent.id});
       if (res.status === 201) {
            setSelectedEvent(null);
            let arr = [ ...events ];

            let indexToRemove = events.findIndex(event => JSON.stringify(event) === JSON.stringify(chosedShelter));
            if (indexToRemove!== -1) {
                arr.splice(indexToRemove, 1);
            }

            console.log(arr, chosedShelter, 'arr');
            setEvents(arr);

            Store.addNotification({
                title: "Возращайтесь еще!",
                message: 'Вы больше не учавствуете в мероприятиях :(',
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                duration: 5000,
                onScreen: true
                }
            });
       }
    }

    const textDefiner = (str) => {
        if (str.includes("https")) {
            return require(`../../../../assets/icons/Globe.svg`).default;
        }
        else if (str.includes("@")) {
            return require(`../../../../assets/icons/Mail.svg`).default;
        }
        else {
            return require(`../../../../assets/icons/Phone.svg`).default;
        }
    }

    const linkDefiner = (str) => {
        if (str.includes("https")) {
            return str;
        }
        else if (str.includes("@")) {
            return `mailto:${str}`;
        }
        else {
            return `tel:${str}`;
        }
    }
    
    

    useEffect(() => {
        getMyEventsFunc();
    }, [])

    return (
        <div className='sideblock__content'>
            <div className='sideblock__content-cards'>
                {events.length === 0 ? <div className='sideblock__content-cards--empty'>Вы пока не записались ни на одно мероприятие. Сделайте это во вкладке “Приюты для животных”</div> : null}
                {events.map((event, idx) => (
                    <SideblockCard
                        key={idx}
                        onClick={() => setShelter(event)}
                        active={event === chosedShelter}
                        image={event?.shelter_photos[0]?.image}
                        name={event.shelter_info.name}
                        date={formatDate(event.events[0].when)}
                        time=''
                        />
                ))}
            </div>

            {chosedShelter ?
            <div>
                <div className='sideblock__content-cards' style={{display: 'none'}}>
                    <Events selectedEvent={selectedEvent} events={chosedShelter.events} onEventSelect={handleEventSelect} />
                </div>
                <br/>
                {selectedEvent ?
                <div className=''>
                    <div style={{'background': '#FFF8DD'}} className='card sideblock__content-card sideblock__content-about'>
                        <div style={{'color': '#EA7E00'}} className='sideblock__content-card-title sideblock__content-about-title'>✨ПОДСКАЗКА</div>
                        <div className='sideblock__content-about-description'>
                            {selectedEvent?.suggestion}
                        </div>
                    </div>

                    <div className='card sideblock__content-card sideblock__content-about'>
                        <div className='sideblock__content-card-title sideblock__content-about-title'>Открыт для посещения</div>
                        {Object.entries(reorderDays(chosedShelter?.shelter_info.opening_hours)).map(([day, hours], idx) => (
                            <div key={idx} className='timework__row'>
                                <div className='timework__row-title'>{defineDay(day)}</div>
                                <div className='timework__row-time'>{hours.open} - {hours.close}</div>
                            </div>
                        ))}
                    </div>

                    <div className='card sideblock__content-card sideblock__content-about'>
                        <div className='sideblock__content-card-title sideblock__content-about-title'>Контакты</div>
                        {chosedShelter.shelter_info.contacts.map((item, index) => (
                            <a className='contact' href={linkDefiner(item)} key={index}>
                                <img className='contact__icon' src={textDefiner(item)} alt='phone'/>
                                <div className='contact__content'>{item}</div>
                            </a>
                        ))}
                    </div>

                    <div className='event__btn-wrapper'>
                        <div onClick={() => closeEvent()} className='event__btn primary-btn danger-btn decline-order'>Отменить запись</div>
                        <div onClick={() => showMessage(chosedShelter)} style={{marginBottom: '20px'}} className='event__btn primary-btn'>Построить маршрут</div>
                    </div>
                </div>
                :null} 
            </div>
            : null}
        </div>
    );
}