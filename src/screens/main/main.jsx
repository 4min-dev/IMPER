import React, { useRef, useEffect } from 'react';
import './main.css';
import { QuestionCard } from './questionCard/questionCard';
import getImage from '../../assets/getImage';
import getIcon from '../../assets/getIcon';

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
      <section id='main__section'>
        <div className='landing'>
          <span className='section__title'>Стать волонтером - просто,</span>
          <span className='section__title section__title__styled'>c Империей Добра</span>
          <div className='section__description'>
            Империя Добра- это движение волонтёров, помогающее приютам животных. Становись частью нашей команды!
          </div>
          <div className='landing__logo'>
            <img src='https://s3-alpha-sig.figma.com/img/beb7/2f6f/e037040ec3f53081448ced4f717fa71b?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YqgdYmqOOdNlBZg9fILKAf5-NvpUOrCJlC9mwJwuoaGVQpwRSgX7A1QHhFWGEoNiRUG2LdBrKARJPWM55lPY55w7h2sMMuYALP5Ws~zV~c-1yQg5FLv5KxmHkrlTAPRp1ZhaEwWn5BenEohygXNPMujIlXEW9V~Z~aGMgl1BacbpiKhMXLa35z0C5Kx4jBQGeDzgGp54E8YKCaHxbX1rb1hZjziWkO8s1uOZxApnFW9C0Gat9TNl~vldgS4GljqHAvPyT02uSohwUDNXnUX0hkyYouw137dxFca3rX3sFdsm~6bbUuhdGFbPbkxY1uZcU~YvYJnQpFnJA26K~bxOMQ__' alt='Landing logo'/>
          </div>

          <div className='landing__clickable'>
            <a href='#' className='styled__button blue'>Стать волонтёром</a>

            <a href='#' className='styled__border__button'>
              <img src={getIcon('Vk.svg')} alt='VK' />
            </a>

            <a href='#' className='styled__border__button'>
              <img src={getIcon('Telegram.svg')} alt='Telegram' />
            </a>
          </div>

          <button type='button' className='button__to__down'>
            <img src={getIcon('DownArrow.svg')} alt='Down'/>
          </button>
        </div>
      </section>

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
              <img src={getImage('image__1.png')} alt='Card logo'/>
              <div className='card__button__wrapper'>
                Зарегистрируйтесь на сайте
                <a href='#' >
                <img src={getIcon('LinkBlue.svg')} alt='Sign up'/>
                </a>
              </div>
            </div>

            <div className='get__started__card'>
              <span className='card__id'>02</span>
              <img src={getImage('image__2.png')} alt='Card logo'/>
              <div className='card__button__wrapper'>
                Выберите ближайший приют
                <a href='#' >
                  <img src={getIcon('GeoBlue.svg')} alt='Geo'/>
                </a>
              </div>
            </div>

            <div className='get__started__card'>
              <span className='card__id'>03</span>
              <img src={getImage('image__3.png')} alt='Card logo'/>
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

      <section id='application__section'>
        <img className='blob__left' src={getImage('Blob_1.png')} alt='Blob_1'/>
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

        <img className='blob__right' src={getImage('Blob_2.png')} alt='Blob_2'/>
      </section>

      <section id='faq__section'>
        <p>Вопрос - ответ 🦮🐈</p>
        <div className='new__question__button__container dekstop'>
          <a href='#' className='styled__button blue new__question__button'>
            Задать вопрос
          </a>
        </div>

        <div className='questions__container'>
          {questions.length > 0 && questions.map((question) => <QuestionCard question={question}/>)}
        </div>
      </section>
    </>
  );
};
