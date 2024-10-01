import React, {useContext} from 'react'
import './subscribe.css'
import { ModalContext } from '../../../context/modalContext';
import event from '../../../api/event';

export const Subscribe = () => {
    const { createPaymetnLink } = event
    const { setIsShowModal } = useContext(ModalContext);

    const handleButtonClick = () => {
        setIsShowModal(false);
    };

    const subscribeClick = async () => {
        const res = await createPaymetnLink({"plan_name": "1month"});
        // console.log(res.data.payme);
        window.location.href = res.data.payment_link;

        // window.open(res.data.payment_link, '_blank');
    }
    return (
        <div className='subscribe__wrapper'>
            <div className='subscribe'>
                <div className='subscribe__header'>
                    <div></div>
                    <img onClick={() => handleButtonClick()} className='subscribe__header-icon' src={require('../../../assets/icons/Close.svg').default} alt='close'/>
                </div>
                <img className='subscribe__img' src={require('../../../assets/images/subscribe.png')} alt='subs_img'/>
                <div className='subscribe__title'>Оформите подписку волонтёра</div>
                <div className='subscribe__describtion'>
                    Подписка волонтёра помогает нам функционировать и привлекать новых участников
                </div>
                <div onClick={() => subscribeClick()} className='subscribe__btn'>Оформить подписку</div>
                <div className='subscribe__hint'>
                    Ежемесячно с карты будут списываться 249р. Отменить подписку можно в любой момент
                </div>
                <div className='subscribe__labels auth__content-labels'>
                    <label className='auth__content-labels-item'>
                        <input className='auth__content-labels-item-checkbox' type="checkbox" name="checkbox" value="value" defaultChecked />
                        <div className='auth__content-labels-item-label'>Ежемесячная подписка</div>
                    </label>
                    <label className='auth__content-labels-item'>
                        <input className='auth__content-labels-item-checkbox' type="checkbox" name="checkbox" value="value" defaultChecked />
                        <div className='auth__content-labels-item-label'>Нажимая кнопку, соглашаюсь на передачу персональных данных согласно политике конфиденциальности и принимаю условия договора оферты</div>
                    </label>
                </div>
            </div>
        </div>
    );
}