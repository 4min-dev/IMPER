import React from 'react'
import './mainSection.css'
import getIcon from '../../../../assets/getIcon'

export const MainSection = () => {
    return (
        <section id='main__section'>
            <div className='landing'>
                <span className='section__title'>Стать волонтером - просто,</span>
                <span className='section__title section__title__styled'>c Империей Добра</span>
                <div className='section__description'>
                    Империя Добра- это движение волонтёров, помогающее приютам животных. Становись частью нашей команды!
                </div>
                <div className='landing__logo'>
                    <img src='https://s3-alpha-sig.figma.com/img/beb7/2f6f/e037040ec3f53081448ced4f717fa71b?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YqgdYmqOOdNlBZg9fILKAf5-NvpUOrCJlC9mwJwuoaGVQpwRSgX7A1QHhFWGEoNiRUG2LdBrKARJPWM55lPY55w7h2sMMuYALP5Ws~zV~c-1yQg5FLv5KxmHkrlTAPRp1ZhaEwWn5BenEohygXNPMujIlXEW9V~Z~aGMgl1BacbpiKhMXLa35z0C5Kx4jBQGeDzgGp54E8YKCaHxbX1rb1hZjziWkO8s1uOZxApnFW9C0Gat9TNl~vldgS4GljqHAvPyT02uSohwUDNXnUX0hkyYouw137dxFca3rX3sFdsm~6bbUuhdGFbPbkxY1uZcU~YvYJnQpFnJA26K~bxOMQ__' alt='Landing logo' />
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
                    <img src={getIcon('DownArrow.svg')} alt='Down' />
                </button>
            </div>
        </section>
    )
}