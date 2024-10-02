import React, { useState } from 'react'
import './questionCard.css'
import getIcon from '../../../../../assets/getIcon'

export const QuestionCard = ({question}) => {

    let [isQuestionUnfolding, setQuestionUnfolding] = useState(false)

    function questionButtonHandler() {
        setQuestionUnfolding(!isQuestionUnfolding)
    }

    return (
        <div className='question__card'>
            <div className="question__card__text__container">
                <span className='question__title'>
                    {question.text}
                </span>
                {isQuestionUnfolding && <div className='answer__to__question'>{question.answer}</div>}
            </div>

            <div className="get__answer__button__container">
            <button type='button' className={isQuestionUnfolding ? 'active' : 'not-active'}>
                <img draggable={false} src={getIcon('Plus.svg')} alt='Open the question' onClick={questionButtonHandler} />
            </button>
            </div>
        </div>
    )
}