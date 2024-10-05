import React from 'react'
import './feedbackCard.css'
import getIcon from '../../../../../assets/getIcon'

export const FeedbackCard = ({ feedback }) => {

    function getAuthorSocialNetworkFrom() {
        if (feedback.from.toLowerCase().includes('vk')) { // проверка без учета регистра
            return getIcon('Vk.svg')
        }

        if (feedback.from.toLowerCase().includes('telegram')) { // проверка без учета регистра
            return getIcon('Telegram.svg')
        }
    }

    return (
        <div className='feedback__card'>
            <span className='feedback__title'>
                {feedback.text}
            </span>

            <div className='feedback__author__container'>
                <div className='feedback__author__avatar'>
                    <img draggable={false} src={feedback.avatar} alt='Avatar' />
                </div>
                <div className="feedback__author">
                    <span className='feedback__author__name'>
                        {`${feedback.firstname} ${feedback.surname}`}
                    </span>

                    <div className='author__social__network__container'>
                        <img draggable={false} src={getAuthorSocialNetworkFrom()} alt='Social netwok logo' />
                        {feedback.networkId}
                    </div>
                </div>
            </div>
        </div>
    )
}