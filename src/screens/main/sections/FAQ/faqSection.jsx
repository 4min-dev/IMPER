import React from 'react'
import './faqSection.css'
import { QuestionCard } from './questionCard/questionCard'

export const FAQSection = ({questions}) => {
    return (
        <section id='faq__section'>
            <p>Вопрос - ответ 🦮🐈</p>
            <div className='new__question__button__container dekstop'>
                <a href='#' className='styled__button blue new__question__button'>
                    Задать вопрос
                </a>
            </div>

            <div className='questions__container'>
                {questions.length > 0 && questions.map((question) => <QuestionCard question={question} />)}
            </div>
        </section>
    )
}