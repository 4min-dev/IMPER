import React, { useState, useContext, useEffect, useRef } from 'react'
import './sideblock.css'
import { SideblockCard } from './sideblock';
import { Albums } from '../albums/albums';
import { Events } from '../events/events';
import { ModalContext } from '../../../../context/modalContext';
import shelters from '../../../../api/shelters';
import LocalStorage from '../../../../utils/LocalStorage';
import { PointContext } from '../../../../context/ChosenItem';
import event from '../../../../api/event';
import { Store } from 'react-notifications-component';
import { UserStatusContext } from '../../../../context/userStatus';
import { distContext } from '../../../../context/distance';

export const Place = () => {
    // const { distanceItem } = useContext(distContext);
    const { save, get } = new LocalStorage;
    const [coords, setCoords] = useState(get('COORD'));
    const { getShelters } = shelters;
    const { subscribeToEvent } = event;
    const { setIsShowModal } = useContext(ModalContext);
    const { userStatus } = useContext(UserStatusContext);
    const { selectedItem, setSelectedItem } = useContext(PointContext);

    const [prevSelectedItem, setPrevSelectedItem] = useState(null);
    const [sheltersData, setSheltersData] = useState([]);
    const [chosedShelter, setChosedShelter] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);

    // useEffect(() => {
    //     if (distanceItem) {
    //         setCoords({
    //             latitude: distanceItem[0],
    //             longitude: distanceItem[1]
    //         })
    //     }
    // }, [distanceItem]);

    const handleEventSelect = (event) => {
        setSelectedEvent(event);
    };

    const handleButtonClick = async () => {
        // if (userStatus.status === 'not_paid') {
        //     setIsShowModal(true);
        //     return;
        // }
        // 387
        const res = await subscribeToEvent({id: selectedEvent.id})
        // const res = await subscribeToEvent({id: 387})
       if (res.status === 201) {
        Store.addNotification({
            title: "Успех",
            message: 'Вы принимаете участие! Для подробностей перейдите в "Мои мероприятия"',
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
       } else {
        Store.addNotification({
            title: "Ошибка",
            message: "При оформлении подписки произошла ошибка",
            type: "danger",
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
        // subscribeToEvent({id: 387})
        // setIsShowModal(true);
    };

    function calcCrow(lat1, lon1, lat2, lon2) 
    {
      var R = 6371; // km
      var dLat = toRad(lat2-lat1);
      var dLon = toRad(lon2-lon1);
      var lat1 = toRad(lat1);
      var lat2 = toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
    //   console.log(isNaN(d), 'distanse');
      if (isNaN(d) || d === null) {
        return 0;
      } else {
        return d;
      }
    }

    function toRad(Value) 
    {
        return Value * Math.PI / 180;
    }

    const getSheltersFunc = async () => {
        const res = await getShelters();
        save('SHELTERS', res.data);
        let shelters = [...res.data];
        // console.log(coords, 'COORDS');

        let updatedShelters;
        if (get('COORD')) {
            updatedShelters = shelters.map(item => ({
                ...item, 
                distance: calcCrow(item.latitude, item.longitude, coords[0], coords[1]) 
            }));
        } else {
            updatedShelters = shelters.map(item => ({
                ...item, 
                distance: 0.00
            }));
        }

        setSheltersData(updatedShelters);
    }

    const getSheltersFirst = async () => {
        console.log('work');
        const res = await getShelters();
        save('SHELTERS', res.data);
        let shelters = [...res.data];
        // console.log(coords, 'COORDS');
        let updatedShelters;
        if (get('COORD')) {
            updatedShelters = shelters.map(item => ({
                ...item, 
                distance: calcCrow(item.latitude, item.longitude, coords[0], coords[1]) 
            }));
        } else {
            updatedShelters = shelters.map(item => ({
                ...item, 
                distance: 0.00
            }));
        }

        setSheltersData(updatedShelters);
        setChosedShelter(res.data[0]);
    }

    useEffect(() => {
        getSheltersFunc();
    }, [coords])
    

    const setShelter = (item) => {
        // console.log('ITEM', item);
        setChosedShelter(item);
        setSelectedItem(item);
        setSelectedEvent(null);
    }

    useEffect(() => {
        if (selectedItem && sheltersData && selectedItem !== prevSelectedItem) {
            const index = sheltersData.findIndex(shelter => 
                shelter.latitude === selectedItem.latitude && shelter.longitude === selectedItem.longitude
            );
    
            if (index !== -1) {
                const newSheltersData = [...sheltersData];
                const [removed] = newSheltersData.splice(index, 1);
                newSheltersData.unshift(removed);
                // setSheltersData(newSheltersData);
                setChosedShelter(removed)
            }
    
            setPrevSelectedItem(selectedItem);
            setSelectedEvent(null);
        }
    
    }, [selectedItem, sheltersData]);
   
    const fetchController = async () => {
        if (!get('SHELTERS')) {
            await getSheltersFirst();
            window.location.reload();
        } else {
            getSheltersFirst();
        }
    }

    useEffect(() => {
        fetchController();
    }, [])

    return (
        <div className='sideblock__content'>
            { chosedShelter ? null : <div className='sideblock__content-card-title'>Загрузка...</div> }
            <div className='sideblock__content-cards'>
                {sheltersData.map((item) => (
                    <SideblockCard
                        key={item.id}
                        onClick={() => setShelter(item)}
                        active={item.id === chosedShelter?.id}
                        image={item.photos[0]?.image}
                        name={item.name}
                        distance={item?.distance.toFixed(2)}
                    />
                ))}
            </div>

            {chosedShelter !== null ?
                <div className='sideblock__content-wrapper'>
                    <div className='card sideblock__content-card sideblock__content-about'>
                        <div className='sideblock__content-card-title sideblock__content-about-title'>О ПРИЮТЕ</div>
                        <div className='sideblock__content-about-description'>
                            {chosedShelter.description}
                        </div>
                    </div>

                   {chosedShelter.photos.length !== 0 ? 
                    <div className='card sideblock__content-card'>
                        <div className='sideblock__content-card-title'>ФОТОГРАФИИ</div>
                        <div className='sideblock__content-albums'>
                            <Albums albums={chosedShelter.photos} />
                        </div>
                    </div> : null} 

                    {chosedShelter.all_events.length !== 0 ?
                    <div className='card sideblock__content-card sideblock__content-events'>
                        <div className='sideblock__content-card-title'>Ближайшие мероприятия</div>
                        <div className='sideblock__content-albums'>
                            <Events selectedEvent={selectedEvent} events={chosedShelter.all_events} onEventSelect={handleEventSelect} />
                        </div>
                    </div> : null}
                </div>
                : ''}

            {selectedEvent ? <div onClick={() => handleButtonClick()} className='sideblock__content-btn primary-btn green-btn'>Принять участие</div>
            : null}
        </div>
    );
}
