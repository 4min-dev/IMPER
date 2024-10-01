import React, { useState, useContext, useEffect } from 'react'
import './sideblock.css'
import { Place } from './place';
import { Event } from './event';
import { ModalContext } from '../../../../context/modalContext';
import { Subscribe } from '../../../modals/subscribe/subscribe';
import auth from '../../../../api/auth';
import { UserStatusContext } from '../../../../context/userStatus';

export const SideblockCard = ({ image, name, distance, date, time, onClick, active }) => {
    const cardClasses = `sideblock__content-cards-item ${active ? 'sideblock__content-cards-item--active' : ''}`;

    return (
        <div onClick={onClick} className={cardClasses}>
            {image ? 
            <img
                src={image}
                className='sideblock__content-cards-item-img'
                alt='card'
            /> 
            : 
            <img
                src="https://sneaker-head.by/images/missing-image.jpg"
                className='sideblock__content-cards-item-img'
                alt='card'
            /> 
            }
            <div className='sideblock__content-cards-item-info'>
                <div className='sideblock__content-cards-item-info-name'>{name}</div>
                {distance && distance !== '0.00' ? 
                <div className='sideblock__content-cards-item-info-distance'>~ {distance} км.</div> 
                :
                null  
                // <div className='sideblock__content-cards-item-info-distance' style={{color: '#000'}}>
                //     <img style={{width: '20px', marginRight: '5px'}} src={require('../../../../assets/icons/geo.svg').default} alt='geo'/>
                //     выкл.
                // </div>
                }
                {date ? <div className='sideblock__content-cards-item-info-distance'>{date} {time}</div> : null}
            </div>
        </div>
    );
}

export const Sideblock = () => {
    const { getUserStatus, getPaymentPlans } = auth;
    const { isShowModal } = useContext(ModalContext);
    const { setUserStatus } = useContext(UserStatusContext);
    const [isShowPlace, setIsShowPlace] = useState(true);
    const [isShowEvent, setIsShowEvent] = useState(false);

    const handlePlaceClick = () => {
        setIsShowEvent(false);
        setIsShowPlace(true);
    };

    const handleEventClick = () => {
        setIsShowPlace(false);
        setIsShowEvent(true);
    };

    const getUserData = async () => {
        const { data } = await getUserStatus();
        if (data) {
            setUserStatus(data);
        }
        // console.log(data, "USER DATA");
    }

    const getPaymentPlan = async () => {
        // const { data } = await getPaymentPlans();
        // console.log(data, "PAYMENT PLANS");
    }

    useEffect(() => {
        getUserData();
        getPaymentPlan();
    }, [])
    

    return (
        <>
            {isShowModal ? <Subscribe /> : false}
            <div className='sideblock'>
                <div className='thomb-stick'>
                    <div className='thomb-stick__stick' />
                </div>
                <div className='sideblock__header'>
                    <div className={isShowPlace ? 'sideblock__header-btn primary-btn' : 'sideblock__header-btn outlined-btn'} onClick={handlePlaceClick}>Приюты для животных</div>
                    <div className={isShowEvent ? 'sideblock__header-btn primary-btn' : 'sideblock__header-btn outlined-btn'} onClick={handleEventClick}>Мои мероприятия</div>
                </div>

                {isShowPlace ? <Place /> : null}
                {isShowEvent ? <Event /> : null}
            </div>
        </>

    );
}
