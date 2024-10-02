import React, { useRef, useEffect } from 'react';
import './main.css';
import getImage from '../../assets/getImage';
import getIcon from '../../assets/getIcon';
import { MainSection } from './sections/main/mainSection';
import { GetStartedSection } from './sections/main/getStarted/getStartedSection';
import { ApplicationSection } from './sections/application/applicationSection';
import { FAQSection } from './sections/FAQ/faqSection';

const indexes = [
  { name: 'Главная', id: 1 },
  { name: 'Начало работы', id: 2 },
  { name: 'Приложение', id: 3 },
  { name: 'Вопрос-Ответы', id: 4 },
  { name: 'Отзывы', id: 5 },
];

const questions = [
  {
    id:1,
    text:'Сколько по времени длится мероприятие?',
    answer:'Среднее время мероприятия составляет 3-4 часа, с учётом дороги туда и обратно.'
  },
  {
    id:2,
    text:'Сколько по времени длится мероприятие?',
    answer:'Среднее время мероприятия составляет 3-4 часа, с учётом дороги туда и обратно.'
  },
  {
    id:3,
    text:'Сколько по времени длится мероприятие?',
    answer:'Среднее время мероприятия составляет 3-4 часа, с учётом дороги туда и обратно.'
  },
  {
    id:4,
    text:'Сколько по времени длится мероприятие?',
    answer:'Среднее время мероприятия составляет 3-4 часа, с учётом дороги туда и обратно.'
  },
]

export const Main = () => {
  const [currIndex, setCurrIndex] = React.useState(indexes[0]);
  const circleRef = useRef(null);
  const buttonRefs = useRef([]);

  useEffect(() => {
    const activeButton = buttonRefs.current[currIndex.id - 1];
    if (circleRef.current && activeButton) {
      circleRef.current.style.width = `${activeButton.offsetWidth}px`;
      circleRef.current.style.transform = `translateX(${activeButton.offsetLeft}px)`;
    }
  }, [currIndex]);

  return (
    <>
      <header>
        <div className='header__logo'>
          <a href='#' className='border__button'>
            <img className='dekstop' src='https://www.figma.com/file/K5PsXovoHkhMJnpr4pFQzl/image/40f80a498c3617d04fb02ce20b4f1849053ab037' alt="Logo" />
            <img className='adaptive' src={getImage('header__adaptive__logo.png')} alt="Logo" />
          </a>
        </div>

        <nav className='adaptive'>
          <a href='#' className='styled__border__button'>
            <img src={getIcon('BurgerMenu.svg')} alt='Menu'/>
          </a>

          <a href='#' className='styled__border__button'>
              <img src={getIcon('Vk.svg')} alt='VK' />
            </a>

            <a href='#' className='styled__border__button'>
              <img src={getIcon('Telegram.svg')} alt='Telegram' />
            </a>
        </nav>

        <nav className='dekstop'>
          {indexes.map((index) => (
            <button
              ref={el => buttonRefs.current[index.id - 1] = el}
              className={index.id === currIndex.id ? 'active' : 'not-active'}
              key={index.id}
              type='button'
              onClick={() => setCurrIndex(index)}
            >
              {index.name}
            </button>
          ))}
          <div className='styled__button blue circle' ref={circleRef} />
        </nav>
      </header>
      <MainSection/>
      <GetStartedSection/>
      <ApplicationSection/>
      <FAQSection questions={questions}/>
    </>
  );
};
