import React from 'react'
import './mail.css'

export const Mail = ({imageName, title, subtitle}) => {
    return (
        <div className="mail">
            <img 
                className='mail__img' 
                src={require(`../../../../assets/images/${imageName}.png`)} 
                alt='mail-image'
                />
            <div className='mail__block'>
                <div className="mail__title">{title}</div>
                <div className="mail__subtitle">{subtitle}</div>
            </div>
        </div>
    );
}