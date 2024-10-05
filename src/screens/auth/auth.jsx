import React, { useState } from 'react'
import './auth.css'
import { Wrapper } from '../../components/common/wrapper/wrapper';
import { Input, InputPass } from '../../components/common/input/input';
import { InputItem } from '../../components/atoms/auth/inputItem/inputItem';
import { Spacer } from '../../components/common/spacer/spacer';
import { Link } from 'react-router-dom';
import { Button } from '../../components/common/button/button';
import { Mail } from '../../components/atoms/auth/mail/mail';
import { Header } from '../../components/common/header/header';
import LocalStorage from '../../utils/LocalStorage';
import auth from '../../api/auth';
import { Store } from 'react-notifications-component';

export const Auth = () => {
const { login } = auth;
const { save, get } = new LocalStorage;

const [ showLink, setShowLink ] = useState(false);
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const authFunc = () => {
    const isFieldsEmpty = (
        email === ''
        || password === ''
    );

    if (isFieldsEmpty) {
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

    let authData = {
        "username": email,
        "email": email,
        "password": password
    }

    login(authData)
    .then(res => {
        console.log(res, "RESPONSE TOKENS");
        save('accessToken', res.data.access);
        save('refreshToken', res.data.refresh);
        save('user', res.data);
        window.location.reload();

    }).catch(async error => {
        // console.log(error, 'ERROR');
        // let message;
        // if (error && error.data.message) {
        //     message = error.data.message[0];
        // } else {
            // message = 'Неправильный логин или пароль';
        // }
        Store.addNotification({
            title: "Ошибка",
            message: error?.data ? Object.values(error.data)[0][0] : 'Неправильный логин или пароль',
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
        authFunc();
    }
}
    return (
        <>
        <Header />
        <Wrapper>
            {!showLink ? 
            <div className='auth'>
                <img className='auth__img' src={require('../../assets/images/people.png')} alt='image-people'/>
                <div className='auth__content'>
                    <InputItem label='Введите вашу почту'>
                        <Input 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                            onKeyDown={handleKeyDown}
                            type='text' 
                            placeholder='yourmail@mail.com' 
                            />
                    </InputItem>
                    <Spacer height='25px' />
                    <InputItem label='Введите пароль'>
                        <InputPass 
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                            onKeyDown={handleKeyDown}
                            type='password' 
                            placeholder='**********************' 
                            />
                    </InputItem>
                    <Link to='/resetpass' className='link auth__content-forget-pass'>Не помню пароль</Link>
                    <Button 
                        onClick={() => authFunc()} 
                        disabled={email && password ? false : true} 
                        title="Войти" 
                        />
                    <Link to='/reg' className='link auth__content-forget-pass'>Создать учетную запись IMPER ID</Link>
                </div>
            </div>
            :
            <Mail
                imageName='mail-enter'
                title='Отправили ссылку для входа в личный кабинет вам на почту.'
                subtitle='Пожалуйста, не забудьте проверить спам.'
                /> 
            }
        </Wrapper>
        </>
    );
}