import React, {useState, useRef, useEffect, useCallback} from 'react'
import './albums.css'
import LightGallery from 'lightgallery/react';

export const Albums = ({ albums }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    
    const openImage = (index) => {
       setCurrentImageIndex(index);
       setIsOpen(true);
    };
   
    const closeImage = () => {
       setIsOpen(false);
    };
   
    const nextImage = () => {
       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % albums.length);
    };
   
    const prevImage = () => {
       setCurrentImageIndex((prevIndex) => (prevIndex - 1 + albums.length) % albums.length);
    };

    return (
        <div>
            <div className='album__wrapper'>
            <div className='opened-album__wrapp'>
                {albums.map((image, i) => (
                    <a className='opened-album__link' href={image.image} key={i} onClick={(e) => {e.preventDefault(); openImage(i);}}>
                    <img className='opened-album__image' src={image.image} alt='album-image'/>
                    </a>
                ))}
                {isOpen && (
                    <div className="image-gallery-overlay" onClick={closeImage}>
                    <img src={albums[currentImageIndex].image} alt="fullscreen" className="fullscreen-image" onClick={(e) => e.stopPropagation()}/>
                    <button className="prev-button" onClick={(e) => {e.stopPropagation(); prevImage();}}>
                       <img src={require('../../../../assets/icons/ChevronL.svg').default} alt='chevron'/> 
                    </button>
                    <button className="next-button" onClick={(e) => {e.stopPropagation(); nextImage();}}>
                       <img src={require('../../../../assets/icons/ChevronR.svg').default} alt='chevron'/> 
                    </button>
                    </div>
                )}
                </div>
                {/* <LightGallery 
                    onInit={onInit}
                    mobileSettings
                    showCloseIcon={true}
                    controls={true}
                    download={false}
                >
                    {albums.map((image, i) => (
                        <a href={image.image} key={i}>
                            <img className='opened-album__image' src={image.image} alt='album-image'/>
                        </a>
                    ))}
                </LightGallery> */}
            </div>
        </div>
    );
}