import React, { useState, useEffect, useContext, useRef } from 'react'
import './home.css'
import { Sideblock } from '../../components/atoms/home/sideblock/sideblock';
import LocalStorage from '../../utils/LocalStorage';
import auth from '../../api/auth';
import { ModalContext } from '../../context/modalContext';
import imagePlacemark from '../../assets/images/placemark.png'
import imagePlacemarkActive from '../../assets/images/placemark-active.png';
import imagePlacemarkMe from '../../assets/images/placemark-me.png';
import { PointContext } from '../../context/ChosenItem';
import { UserStatusContext } from '../../context/userStatus';
import { Store } from 'react-notifications-component';
import { wayContext } from '../../context/wayItem';
import { distContext } from '../../context/distance';


export const Home = () => {
    const { selectedItem, setSelectedItem } = useContext(PointContext);
    const { distanceItem, setDistanceItem } = useContext(distContext);
    const { wayItem, setWayItem } = useContext(wayContext);
    const { userStatus } = useContext(UserStatusContext);
    const { deleteAll, get, save } = new LocalStorage;
    const { logOut, revokeSubscribtion } = auth;
    const { setIsShowModal } = useContext(ModalContext);

    const [isShowMenu, setIsShowMenu] = useState(false);
    const [user, setUser] = useState('');
    const [points, setPoints] = useState([]) 
    const [selectedPoint, setSelectedPoint] = useState(null);

    useEffect(() => {
        if (selectedItem) {
            if (selectedItem.shelter_info) {
                setSelectedPoint({
                    latitude: selectedItem.shelter_info.latitude, 
                    longitude: selectedItem.shelter_info.longitude
                })
                setLatitude(selectedItem.shelter_info.latitude);
                setLongitude(selectedItem.shelter_info.longitude);
                setZoom(13);
                let sum = keyMap + 1
                setKeyMap(sum);
                return;
            }
            setSelectedPoint({
                latitude: selectedItem.latitude, 
                longitude: selectedItem.longitude
            })

            setLatitude(selectedItem.latitude);
            setLongitude(selectedItem.longitude);
            setZoom(15);

            let sum = keyMap + 1
            setKeyMap(sum);
        }
    }, [selectedItem])

    useEffect(() => {
        if (wayItem) {
            Store.addNotification({
                title: "Загрузка...",
                message: "Строим маршрут!",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 3000,
                    onScreen: true
                }
            });
            console.log(wayItem.shelter_info, 'getted');
            if (wayItem.shelter_info) {
                const { latitude, longitude } = wayItem.shelter_info;
                setSecondPoint([latitude, longitude]);
            }
        }
        
        let sum = keyMap + 1
        setKeyMap(sum);
    }, [wayItem]);

    // useEffect(() => {
    //     if (currentPosition) {
    //         setPoints([...points, { latitude: currentPosition[0], longitude: currentPosition[1], name: "ME" }]);
    //     }
    // }, []);

    const handlePlacemarkClick = (point) => {
        setSelectedItem(point)
        setSelectedPoint(point);
    };

    const handleButtonClick = () => {
        setIsShowMenu(false);
        setIsShowModal(true);
    };

    function filterLatLong(data) {
    if (!Array.isArray(data)) {
        throw new Error('Переданный аргумент должен быть массивом');
    }

    return data.map(item => {
        if ('latitude' in item && 'longitude' in item) {
            return { latitude: item.latitude, longitude: item.longitude };
        } else {
            return {};
        }
    });
    }

    const declineSubscribe = () => {
        const modal = document.getElementById("confirmModal");
        const span = document.getElementsByClassName("close")[0];
        const confirmYes = document.getElementById("confirmYes");
        const confirmNo = document.getElementById("confirmNo");
    
        const closeModal = () => {
            modal.style.display = "none";
        }
        modal.style.display = "block";
        span.onclick = closeModal;
        window.onclick = (event) => {
            if (event.target == modal) {
                closeModal();
            }
        }
    
        confirmYes.onclick = async () => {
           const res = await revokeSubscribtion();
           if (res.status === 200) {
            Store.addNotification({
                title: "Успех!",
                message: "Ваша подписка отменена!",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 3000,
                    onScreen: true
                }
            });
            closeModal();
            setTimeout(() => {
               window.location.reload(); 
            }, 3000);
           }
        }
    
        confirmNo.onclick = () => {
            closeModal();
        }
    }

    const getSheltersFunc = () => {
        if (points.length === 0) {
            const data = get('SHELTERS');
            let latLon = filterLatLong(data); 
            setPoints(latLon);
            setSelectedPoint(data[0]);
        }
    }

    const logout = () => {
        let logoutData = {
            "revoke_token": false
        }

        logOut(logoutData)
            .then(res => {})
            .catch(err => {})
        deleteAll();
        window.location.reload();
    } 

    const getUserFromLS = () => {
        if (get('user')) {
            setUser(get('user').user);
        } 
    }

    useEffect(() => {
        getUserFromLS();
        if (get('SHELTERS')) {
            getSheltersFunc();
        }
    }, [])

    const mapRef = useRef(null);
    const [keyMap, setKeyMap] = useState(0);
    const [secondPoint, setSecondPoint] = useState(null);
    const [currentPosition, setCurrentPosition] = useState(null);
    const [latitude, setLatitude] = useState(59.93863);
    const [longitude, setLongitude] = useState(30.31413);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        const ymaps = window.ymaps;
        ymaps.ready(init);

        // 'geolocationControl'
        function init() {
            const map = new ymaps.Map("map", {
                center: [latitude, longitude],
                zoom: zoom,
                controls: [],
                wheelZoomDuration: 300,
                type: "yandex#map",
                options: {
                    useMapOpenGL: true
                }
            });

            const tileUrlTemplate = 'https://core-renderer-tiles.maps.yandex.net/tiles?l=map&v=21.10.31&x=%x&y=%y&z=%z';
            var tileLayer = new ymaps.Layer(tileUrlTemplate);
            map.layers.add(tileLayer);

            mapRef.current.map = map;

            if (get('SHELTERS')) { 
                filterLatLong(get('SHELTERS')).forEach(function(item, index) {
                    var placemark = new ymaps.Placemark(
                        [item.latitude, item.longitude],
                        {},
                        {
                            iconLayout: 'default#image',
                            iconImageHref: item.name === 'ME' ? imagePlacemarkMe : (item.latitude === selectedPoint?.latitude ? imagePlacemarkActive : imagePlacemark),
                            iconImageSize: [40, 40],
                            iconImageOffset: [-3, -42]
                        }
                    );

                    placemark.events.add('click', function() {
                        handlePlacemarkClick(item); 
                    });

                    map.geoObjects.add(placemark);
                });

                var location = ymaps.geolocation.get();
                location.then(
                    function(result) {
                        // console.log(result.geoObjects.position);
                        save('COORD', result.geoObjects.position);
                        setDistanceItem(result.geoObjects.position);
                      setCurrentPosition(result.geoObjects.position); 
                      map.geoObjects.add(result.geoObjects)
                    },
                    function(err) {
                        if (wayItem) {
                            Store.addNotification({
                                title: "Ошибка построения маршрута",
                                message: "Попробуйте перезагрузить страницу",
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
                    }
                );
                if (secondPoint) {
                    var multiRoute = new ymaps.multiRouter.MultiRoute({
                        referencePoints: [
                            currentPosition,
                            secondPoint
                        ],
                        params: {
                            results: 2
                        }
                    }, {
                        boundsAutoApply: true
                    });
            
                    map.geoObjects.add(multiRoute);
                }
            }
        }
    }, [keyMap, currentPosition]); 

    const clearWay = () => {
        setWayItem(null);
        setSecondPoint(null);
        let sum = keyMap + 1
        setKeyMap(sum); 
        console.log('clear');
    }

    return (
        <div>
            <div id="confirmModal" className="modal">
                <div className="modal-content">
                    <span className="close">&times;</span>
                    <p>Вы уверены, что хотите отказаться от подписки?</p>
                    <div className='modal-content__buttons'>
                        <button className='primary-btn' id="confirmYes">Да</button>
                        <button className='outlined-btn' id="confirmNo">Нет</button>
                    </div>
                </div>
            </div>

            <div className='sideblock__wrapper'>
                <Sideblock />
                <div className='map__wrapper'>
                    <div onClick={() => setIsShowMenu(true)} className='menu__button'>
                        <img src={require('../../assets/icons/Menu.svg').default} alt='menu-button' />
                    </div>
                    {/* <div onClick={() => getGeo()} className='menu__button--geo'>
                        <img style={{width: '22px'}} src={require('../../assets/icons/geo.svg').default} alt='menu-button' />
                    </div> */}
                    {wayItem ? <div onClick={() => clearWay()} className='menu__button--geo'>
                        <div>Сбросить маршрут</div>
                    </div> : null}
                    <div id="map" ref={mapRef} key={keyMap} className='ymap'></div>
                </div>

                {isShowMenu ?
                    <div onClick={() => setIsShowMenu(false)} className='menu__content-wrapper'>
                        <div className='menu__content'>
                            <div>
                                <div className='menu__content-header'>
                                    <div className='menu__content-header-logo'>
                                        <div className='menu__content-header-logo-title'>IMPER ID</div>
                                        <img className='menu__content-header-logo-image' src={require('../../assets/images/logo.png')} alt='logo' />
                                    </div>
                                    <img onClick={() => setIsShowMenu(false)} src={require('../../assets/icons/Close.svg').default} alt='close' />
                                </div>

                                <div className='menu__content-profile'>
                                    <img
                                        className='menu__content-profile-image'
                                        src={require('../../assets/icons/ProfileCircle.svg').default}
                                        alt='profile-image'
                                    />
                                    <div className='menu__content-profile-mail'>{user.username}</div>
                                </div>
                                {/* {userStatus?.status === 'not_paid' ? 
                                <div onClick={() => handleButtonClick()} className='menu__content-button'>Приобрести подписку</div>
                                :
                                <div onClick={() => declineSubscribe()} className='menu__content-button'>Отменить подписку</div>}
                                {userStatus?.status === 'paid' ? <div className='menu__content-subtitle'>Подписка продлится до: {new Date(userStatus?.expires).toLocaleString('ru-RU')}</div>: null}
                                */}
                            </div>

                            <div onClick={() => logout()} className="menu__fix-btn outlined-btn">Выйти из аккаунта</div>
                            <div>
                                <a className='madebytw' href='https://techwizards.ru/' target='_blank' rel='noreferrer'>
                                    <img src={require('../../assets/images/madebytw.png')} alt='madyby-tech-wizards'/>
                                </a>
                            </div>
                        </div>
                    </div>
                    : null}
            </div>
            </div>
        // </YMaps>
    );
}