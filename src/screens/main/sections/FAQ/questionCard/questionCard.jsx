import React, { useState } from 'react';
import './questionCard.css';
import getIcon from '../../../../../assets/getIcon';

export const QuestionCard = ({ question }) => {
    const [isQuestionUnfolding, setQuestionUnfolding] = useState(false);

    const questionButtonHandler = () => {
        setQuestionUnfolding(!isQuestionUnfolding);
    };

    return (
        <div className='question__card' onClick={questionButtonHandler}>
            <div className="question__card__text__container">
                <span className='question__title'>
                    {question.text}
                </span>
                <div className={`answer__to__question ${isQuestionUnfolding ? 'active' : ''}`}>
                    {question.answer}
                </div>
            </div>

            <div className="get__answer__button__container">
                <button type='button' className={isQuestionUnfolding ? 'active' : 'not-active'}>
                    <img draggable={false} src={getIcon('Plus.svg')} alt='Open the question' />
                </button>
            </div>
        </div>
    );
};
