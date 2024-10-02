import React from 'react'
import './applicationSection.css'
import getImage from '../../../../assets/getImage'

export const ApplicationSection = () => {
    return (
        <section id='application__section'>
            <img className='blob__left' src={getImage('Blob_1.png')} alt='Blob_1' />
            <div className='about__application'>
                <div className='styled__button aqua'>
                    <span className='dekstop'>Доступно для Android и IOS</span>
                    <span className='adaptive'>Android и IOS</span>
                </div>
                <div className='styled__button aqua'>
                    <span className='dekstop'>Абсолютно бесплатно</span>
                    <span className='adaptive'>Бесплатно</span>
                </div>
            </div>

            <p>Скачайте наше веб-приложение, чтобы помогать приютам было ещё проще!</p>

            <a href='#' className='styled__button pink download__application__button'>
                Скачать приложение
            </a>

            <img className='blob__right' src={getImage('Blob_2.png')} alt='Blob_2' />
        </section>
    )
}