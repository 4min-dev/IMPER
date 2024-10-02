import React from 'react'
import './mainSection.css'
import getIcon from '../../../../assets/getIcon'
import getImage from '../../../../assets/getImage'

export const MainSection = ({ scrollToMiddle }) => {
    return (
        <section id='main__section'>
            <div className='landing'>
                <span className='section__title'>Стать волонтером - просто,</span>
                <span className='section__title section__title__styled'>c Империей Добра</span>
                <div className='section__description'>
                    Империя Добра- это движение волонтёров, помогающее приютам животных. Становись частью нашей команды!
                </div>
                <div className='landing__logo'>
                    <img draggable={false} src={getImage('the__girl__stroking.png')} alt='Landing logo' />
                </div>

                <div className='landing__clickable'>
                    <a href='https://dobrayaimperia.ru/reg' className='styled__button blue'>Стать волонтёром</a>

                    <a href='#' className='styled__border__button'>
                        <img draggable={false} src={getIcon('Vk.svg')} alt='VK' />
                    </a>

                    <a href='https://t.me/kushneriov_kirill' className='styled__border__button'>
                        <img draggable={false} src={getIcon('Telegram.svg')} alt='Telegram' />
                    </a>
                </div>

                <button onClick={scrollToMiddle} type='button' className='button__to__down'>
                    <img draggable={false} src={getIcon('DownArrow.svg')} alt='Down' />
                </button>
            </div>
        </section>
    )
}