import React from 'react'
import './getStartedSection.css'
import getImage from '../../../../../assets/getImage'
import getIcon from '../../../../../assets/getIcon'

export const GetStartedSection = () => {
    return (
        <section id='get__started__section'>
            <span className='section__title'>
                Выполни всего <span className='section__title__styled'>3 простых шага</span>
            </span>
            <span className='section__title'>
                и начинай помогать животным
            </span>

            <div className='get__started__cards__container'>
                <div className='get__started__card'>
                    <span className='card__id'>01</span>
                    <img src={getImage('image__1.png')} alt='Card logo' />
                    <div className='card__button__wrapper'>
                        Зарегистрируйтесь на сайте
                        <a href='#' >
                            <img src={getIcon('LinkBlue.svg')} alt='Sign up' />
                        </a>
                    </div>
                </div>

                <div className='get__started__card'>
                    <span className='card__id'>02</span>
                    <img src={getImage('image__2.png')} alt='Card logo' />
                    <div className='card__button__wrapper'>
                        Выберите ближайший приют
                        <a href='#' >
                            <img src={getIcon('GeoBlue.svg')} alt='Geo' />
                        </a>
                    </div>
                </div>

                <div className='get__started__card'>
                    <span className='card__id'>03</span>
                    <img className='dekstop' src={getImage('image__3.png')} alt='Card logo' />
                    <img className='adaptive' src={getImage('image__3__adaptive.png')} alt='Card logo' />
                    <div className='card__button__wrapper'>
                        Запись на время и дату, в которую вы хотите прийти и помочь
                        <a href='#' className='styled__button blue'>
                            Принять участие
                        </a>
                    </div>
                </div>
            </div>

            <span className='section__description'>
                *Это важно, потому что - в день, когда вы захотите помочь в приюте может оказаться и так слишком много волонтёров, по этому мы разработали для вас систему записей
            </span>
        </section>
    )
}