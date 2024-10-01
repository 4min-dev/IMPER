import React, { useState } from 'react';
import './resetpass.css'

import { Header } from '../../components/common/header/header';
import { Wrapper } from '../../components/common/wrapper/wrapper';
import { Input, InputPass } from '../../components/common/input/input';
import { InputItem } from '../../components/atoms/auth/inputItem/inputItem';
import { Button } from '../../components/common/button/button';
import { Spacer } from '../../components/common/spacer/spacer';
import auth from '../../api/auth';
import { Store } from 'react-notifications-component';
import { Mail } from '../../components/atoms/auth/mail/mail';

export const ResetPass = () => {
    const { passwordReset } = auth;
    const [showMailImage, setShowMailImage] = useState(false);
    const [email, setEmail] = useState('');

    const cleanAllFields = () => {
        setEmail('');
    }

    const resetPassFunc = () => {
        const isFieldsEmpty = (
            email === ''
        );

        if (isFieldsEmpty) {
            // alert('Необходимо заполнить все поля!');
            Store.addNotification({
                title: "Ошибка",
                message: "Необходимо заполнить все поля!",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });
            return;
        }

        let resetData = {
            "email": email
        }

        passwordReset(resetData)
            .then(res => {
                console.log(res, "RESPONSE");
                setShowMailImage(true);
            }).catch(async error => {
                console.log(error.data.detail, "TOKENS ERROR");
                cleanAllFields();
                Store.addNotification({
                    title: "Ошибка",
                    message: error.data.detail,
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 5000,
                        onScreen: true
                    }
                });
            })
    }

    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            resetPassFunc();
        }
    }
    return (
        <>
            <Header />
            <Wrapper>
                {!showMailImage ?
                    <div className='auth'>
                        <img className='auth__img' src={require('../../assets/images/people.png')} alt='image-people' />
                        <div className='auth__content'>
                            <div className='auth__content-labels'>
                                <div className='newpass__content-title'>
                                    Для смены пароля
                                </div>
                                <b className='newpass__content-title'>
                                    Введите почтовый адрес вашего аккаунта
                                </b>
                            </div>
                            <Spacer height='35px' />
                            <InputItem label='Ваша почта'>
                                <Input
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    type='text'
                                    placeholder='yourmail@mail.com'
                                />
                            </InputItem>
                            <Spacer height='30px' />
                            <Button onClick={() => resetPassFunc()} title="Отправить ссылку" />
                        </div>
                    </div>
                    :
                    <Mail
                        imageName='mail-link'
                        title={`Отправили ссылку для смены пароля пользователя ${email} вам на почту.`}
                        subtitle='Пожалуйста, не забудьте проверить спам.'
                    />
                }
            </Wrapper>
        </>
    );
}
