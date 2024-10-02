import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import './main.css';
import getImage from '../../assets/getImage';
import getIcon from '../../assets/getIcon';
import { MainSection } from './sections/main/mainSection';
import { GetStartedSection } from './sections/getStarted/getStartedSection';
import { ApplicationSection } from './sections/application/applicationSection';
import { FAQSection } from './sections/FAQ/faqSection';
import { FeedBackSection } from './sections/feedback/feedBackSection';
import { AsidePanel } from './UI/asidePanel/asidePanel';

gsap.registerPlugin(ScrollToPlugin);

const indexes = [
  { name: 'Главная', id: 1, sectionRef: 'main__section' },
  { name: 'Начало работы', id: 2, sectionRef: 'get__started__section' },
  { name: 'Приложение', id: 3, sectionRef: 'application__section' },
  { name: 'Вопрос-Ответы', id: 4, sectionRef: 'faq__section' },
  { name: 'Отзывы', id: 5, sectionRef: 'feedback__section' },
];

const questions = [
  {
    id: 1,
    text: 'Сколько по времени длится мероприятие?',
    answer: `Среднее время мероприятия составляет 3-4 часа, с учётом дороги туда и обратно.`
  },
  {
    id: 2,
    text: 'Что будем делать в приюте?',
    answer: `Мы делаем то, что попросит приют: помогаем в выгуле собак, фасуем корм или чистим овощи для лосей, когда мы
            едем к диким зверям. Можем выполнять и не слишком чистую работу, такую как уборка вальеров.`
  },
  {
    id: 3,
    text: 'Как одеваться?',
    answer: `Так как мы иногда помогаем на свежем воздухе, одевайтесь по погоде в то, что не жалко испачкать или легко
            отстирывается. Возьмите с собой сменную обувь, лучше всего резиновые сапоги.`
  },
  {
    id: 4,
    text: 'Что брать с собой?',
    answer: `Воду и перекус по желанию, антисептик или влажные салфетки, сменные носки, на случай, если промочите ноги.
            Также можете захватить угощения или игрушки для животных, жители приютов будут очень рады.`
  },
  {
    id: 5,
    text: 'С какого возраста можно стать волонтёром Империи?',
    answer: `С любого. Мы подберём для вас подходящий приют и расскажем как сделать помощь весёлой и безопасной.`
  }
]

const feedbacks = [
  {
    id: 1,
    firstname: 'Алена',
    surname: 'Струева',
    from: 'VK',
    networkId: 'Deimosgirl',
    avatar: 'https://s3-alpha-sig.figma.com/img/3ad0/0efa/32ffc8afec8daedd522cf3a3e928401b?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Mz45QFP8pkkog09wpuAqjk1b5p2ujHV6iUs0tK9Pp9MMePCX2Sja0U3EE4l8iiZoZ1v8uJaCZZPTi5rc40aBqOSRiAcv1ogbErdaSWgId4yrhy4I2vdETpFyUsEUxDoloJC3zArQwnQmjzeXnqebToWsXVroo9UKr98mPW5TXYxNz2pzbvlDQIKJK4RRwLM~wuV3QYbhQCjoQGnrDlREcOAXsob2WUCAd~ezOkiFlWLDcg~7WbtYpua2~xgBa2gIZ3~cLeRdxElg045sJfeJSRTJa-hBSekSYQKHBO6LTP7TswSOVcqAUiKB1n0mCBUJFoh653J-aZvLAB782dWJMg__',
    text: `Была вчера в приюте «Друг».
 Благодаря Империи Добра без проблем нашла дорогу и прекрасно провела время с собачкой Айзой.
 Помогать другим - животным или людям, это классно, тем более, если видишь, что есть 🥴единомышленники.
 Поэтому присоединяйтесь, делитесь теплом и вниманием и получайте его взамен😍👍`
  },

  {
    id: 2,
    firstname: 'Юлия',
    surname: 'Смирнова',
    from: 'vk',
    networkId: 'Anfisa_ahmetshina',
    avatar: 'https://s3-alpha-sig.figma.com/img/6538/e435/e67880968c4fb161e3d05800c70628bf?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iHRtWH0-LM4H9N-MxHcAPpqu4Ivql7xFfOrIr1riP1Ia8Mp44aySiVlJl2imC9XaNpfHpzOba4FrBuq1UZWaI0GKQ09wn8NYYsSeVRb2vpFjgfeJUaMEkhhXduEKhJsTKlypNtCf6Gkv9ijskZgArgJrrHQeRPn0iS4oH0sieeq-R9kOE9OD2Fpg1ErXnRxwGW4dJvSO-oFTofnsFxGEvG6X~-Gvrl69ljzYGLqD1heWwg14M63hU0Rc7ZnkK3H4U6167bAJt2DlNmTobbj1p6cdfIneWUbOOQhHqOvcQuK6TWscTdE42xCRLijxnxt0jYBL479gJ54QhON3ToqoVQ__',
    text: `Огромная благодарность организаторам за эту поездку! Впечатлений море, сил - ноль)) Все прошло супер, нас встретили (никого не потеряли 😻, доставили. И без приключений вернули обратно) Все собаки очень милые и добрые)
Спасибо вам за то, что делаете помощь доступной  каждому`
  },

  {
    id: 3,
    firstname: 'Оксана',
    surname: 'Боброва',
    from: 'vk',
    networkId: 'Zhuva22',
    avatar: 'https://www.figma.com/file/K5PsXovoHkhMJnpr4pFQzl/image/efddadbeb988938131a299b7eb57f8449b145fb6',
    text: `Спасибо большое за отличную поездку, впервые поехала в приют, все благодаря организации Империи добра) Это было непросто, но приятная усталость и эмоции запомнятся надолго. Желаю
дальнейшего развития, нет ничего лучше, чем помогать животным)❤️`
  },

  {
    id: 4,
    firstname: 'Лида',
    surname: 'Аношкина',
    from: 'vk',
    networkId: 'ID529121380',
    avatar: 'https://s3-alpha-sig.figma.com/img/d05d/a7d5/4561151a8bc13c020553f25a8bfcfab8?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=q95W2UGw~Z96fY78sN9NuJhqQvh5Rc9IyPLkdYPJCd6AqnVaAVfoFVVu11Gpp1UVgtJqNhEugc~LXqmr-975vc1Qc7Yflvm4LXWeOgjJrjfPeMrg-SRlhEOVsrJwgRFCKZ1U6jLt7p0z7AC5tvmbRhttBmCf2SL0SeHCtANW1~nj5JsYIMSP-6bZjYQSnboup4QnHOGBLaubKRJanSqCNvZqAa-ZGtDdSTOvdpyTeFWOogqlg2rHhY6RntAjx9E79x6qBQkpQVNVpoGsm2uLHn-T2Qe0L5TAwLvB5Qar6d898H1~jWV7FqAxdXU1icSrj3fSPVHfdj~jUWdgH24Qqw__',
    text: `Совсем недавно ездила с Империей добра в приют Келтсские ангелы к милым пушистым созданиям)
Было приятно не только погулять под солнцем вместе с собачками, но и приятно провести время с другими ребятами, которые были на выезде. Обязательно присоединюсь к ребятам на следующие выезды`
  },

  {
    id: 5,
    firstname: 'Валерия',
    surname: 'Гартунг',
    from: 'vk',
    networkId: 'Korolevskaya_viverna',
    avatar: 'https://s3-alpha-sig.figma.com/img/3219/1101/c26a03747e9a7933f25fe068a2091348?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pw9Cj05daCBSKq5oR8TAXrOWYsnkSqPeP1LLtrZEATNSnaRuYz5XKWwBMipEIcUy5f9haGo7ws0e9alAGUpBJIJNey5RKk4-ARPEYOSgmNCwwSo~08g9Bsf8Rm9KlE6PEg2I0lFRkHjxo3WLpwg0AmR9YKmoFtyR1GfQ8tUxdl5Z527u3g98iJwlXpYqkOf1L8IIC2cPKytiU599HcQXf-~An7edMNIDeN4-qgxAhj0S7nc3gEPg99i3PjLHHMs8Wn2-JY1GzABY~zDWRJUalXjprgVi2STcoHtOm6~3laUG9EI~c3NNe-LCgitlcdlMJdULpfLNj~PTB9vZLfRVKQ__',
    text: `Ездила в приют Велес с молодым человеком, который ни разу не бывал в таких местах и не знал вообще, что это такое, но даже ему очень понравилось!😍👍
Я тоже была в восторге, так как до этого бывала лишь в приютах для собак и кошек.
Спасибо организаторам за эту поездку, обязательно съездим еще🥴`
  }
]

export const Main = () => {

  const [isMobilePanel, setMobilePanel] = React.useState(false)
  const [currIndex, setCurrIndex] = React.useState(indexes[0]);
  const circleRef = useRef(null);
  const buttonRefs = useRef([]);
  const sectionRefs = useRef([]);
  const isScrolling = useRef(false); // Для отслеживания прокрутки

  function mobilePanelHandler() {
    setMobilePanel(!isMobilePanel)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling.current) return; // Игнорировать, если сейчас прокручиваем

      sectionRefs.current.forEach((section, index) => {
        if (
          section &&
          section.getBoundingClientRect().top >= 0 &&
          section.getBoundingClientRect().top < window.innerHeight - 300
        ) {
          setCurrIndex(indexes[index]);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const activeButton = buttonRefs.current[currIndex.id - 1];
    if (circleRef.current && activeButton) {
      circleRef.current.style.width = `${activeButton.offsetWidth}px`;
      circleRef.current.style.transform = `translateX(${activeButton.offsetLeft}px)`;
    }
  }, [currIndex]);

  const scrollToIndex = (scrollIndex) => {
    if (scrollIndex) {
      isScrolling.current = true; // Начинаем прокрутку
      gsap.to(window, {
        duration: .7,
        scrollTo: scrollIndex,
        ease: "power2.inOut",
        onComplete: () => {
          isScrolling.current = false; // Завершаем прокрутку
        },
      });
    }
  }

  const scrollToSection = (index) => {
    const section = sectionRefs.current[index.id - 1];
    scrollToIndex(section.offsetTop)
  };

  const scrollToMiddle = () => {
    const middlePosition = document.body.scrollHeight / 2; // Вычисляем середину страницы
    scrollToIndex(middlePosition)
  };

  return (
    <div className="main__page">
      {isMobilePanel && <AsidePanel
        indexes={indexes}
        asidePanelHandler={mobilePanelHandler}
        setCurrIndex={setCurrIndex}
        scrollToSection={scrollToSection} />}
      <header className='main__page__header'>
        <div className='header__logo'>
          <a href='https://dobrayaimperia.ru' className='border__button'>
            <img draggable={false} className='dekstop' src='https://www.figma.com/file/K5PsXovoHkhMJnpr4pFQzl/image/40f80a498c3617d04fb02ce20b4f1849053ab037' alt="Logo" />
            <img draggable={false} className='adaptive' src={getImage('header__adaptive__logo.png')} alt="Logo" />
          </a>
        </div>

        <nav className='adaptive main__page__navigation'>
          <div onClick={mobilePanelHandler} className='styled__border__button'>
            <img draggable={false} src={getIcon('BurgerMenu.svg')} alt='Menu' />
          </div>

          <a href='#' className='styled__border__button'>
            <img draggable={false} src={getIcon('Vk.svg')} alt='VK' />
          </a>

          <a href='https://t.me/kushneriov_kirill' className='styled__border__button'>
            <img draggable={false} src={getIcon('Telegram.svg')} alt='Telegram' />
          </a>
        </nav>

        <nav className='dekstop main__page__navigation'>
          {indexes.map((index) => (
            <button
              ref={el => buttonRefs.current[index.id - 1] = el}
              className={index.id === currIndex.id ? 'active' : 'not-active'}
              key={index.id}
              type='button'
              onClick={() => {
                setCurrIndex(index);
                scrollToSection(index);
              }}
            >
              {index.name}
            </button>
          ))}
          <div className='styled__button blue circle' ref={circleRef} />
        </nav>
      </header>

      <div ref={el => sectionRefs.current[0] = el}><MainSection scrollToMiddle={scrollToMiddle} /></div>
      <div ref={el => sectionRefs.current[1] = el}><GetStartedSection /></div>
      <div ref={el => sectionRefs.current[2] = el}><ApplicationSection /></div>
      <div ref={el => sectionRefs.current[3] = el}><FAQSection questions={questions} /></div>
      <div ref={el => sectionRefs.current[4] = el}><FeedBackSection feedbacks={feedbacks} /></div>

      <footer className='main__page__footer'>
        <img draggable={false} className='footer__image__to__left' src={getImage('blind_girl_with_dog.png')} alt='Left' />
        <img draggable={false} className='footer__image__to__right' src={getImage('girl_trains_a_dog.png')} alt='Right' />
        <div className='footer__partners__container'>
          <span className='footer__partner__personal__identity'>ИНН: 7804681810 ОГРН: 1217800056407</span>
          <span className='footer__partner__email'>partners@dobrayaimperia.ru</span>
        </div>
        <a href='https://dobrayaimperia.ru/privacy-policy'>Политика конфиденциальности</a>
        <div className='partners__logos'>
          <img draggable={false} src={getIcon('Visa.svg')} alt='Visa' />
          <img draggable={false} src={getIcon('Mastercard.svg')} alt='Mastercard' />
          <img draggable={false} src={getIcon('Google-pay.svg')} alt='Google pay' />
          <img draggable={false} src={getIcon('Mir.svg')} alt='Mir' />
        </div>

        <div className='copiryting__container'>
          <span>By Tech Wizards</span>
          <span>2024</span>
        </div>
      </footer>
    </div>
  );
};