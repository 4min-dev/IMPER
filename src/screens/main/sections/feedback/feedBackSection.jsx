import React from 'react'
import './feedbackSection.css'
import { FeedbackCard } from './feedbackCard/feedbackCard'

export const FeedBackSection = ({feedbacks}) => {
  return (
    <section id='feedback__section'>
      <p>Отзывы волонтёров</p>

      <div className='feedback__cards__container'>
        {feedbacks.length > 0 && feedbacks.map((feedback) => <FeedbackCard key={feedback.id} feedback={feedback}/>)}
      </div>
    </section>
  )
}