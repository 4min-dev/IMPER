import React, { useState } from 'react'
import './reg.css'
import { Header } from '../../components/common/header/header';
import { Wrapper } from '../../components/common/wrapper/wrapper';
import { Input, InputPass } from '../../components/common/input/input';
import { InputItem } from '../../components/atoms/auth/inputItem/inputItem';
import { Spacer } from '../../components/common/spacer/spacer';
import { Link } from 'react-router-dom';
import { Button } from '../../components/common/button/button';
import { Mail } from '../../components/atoms/auth/mail/mail';
import auth from '../../api/auth';
import { Store } from 'react-notifications-component';
import LocalStorage from '../../utils/LocalStorage';


// TODO: future getToken
// let tokenData = {
//     "username": get('user').email,
//     "password": get('user').password
// }
// getTokens(tokenData)
// .then(res => {
//     console.log(res, "RESPONSE TOKENS");
// }).catch(async error => {
//     console.log(error, "TOKENS ERROR");
// })

export const Reg = () => {
    const { reg, getTokens, login } = auth;
    const { save, get } = new LocalStorage;

    const [showLink, setShowLink] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [checkboxAds, setCheckboxAds] = useState(false);
    const [checkboxPrivacy, setCheckboxPrivacy] = useState(true);

    const cleanAllFields = () => {
        setEmail('');
        setPassword('');
        setPasswordConfirm('');
    }

    const authFunc = () => {
        const isFieldsEmpty = (
            email === ''
            || password === ''
        );

        if (isFieldsEmpty) {
            alert('Необходимо заполнить все поля!');
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

                window.location.reload();
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }).catch(async error => {
                cleanAllFields();
                console.log(error, "TOKENS ERROR");
                Store.addNotification({
                    title: "Ошибка",
                    message: Object.values(error.data)[0][0],
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

    const regFunc = () => {
        const isFieldsEmpty = (
            email === ''
            || password === ''
            || passwordConfirm === ''
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

        let regData = {
            "password1": password,
            "username": email,
            "email": email,
            "password2": passwordConfirm
        };

        const response = reg(regData);

        response.then(res => {
            console.log(res, "RESPONSE REG");
            // save('user', res.data.user);
            // save('accessToken', res.data.access);
            // save('refreshToken', res.data.refresh);

            // cleanAllFields();
            setShowLink(true);

            // window.location.reload();

            // setTimeout(() => {
            //     window.location.reload();
            // }, 2000);
        }).catch(async error => {
            // cleanAllFields();
            // alert(error);
            Store.addNotification({
                title: "Ошибка",
                message: error?.data ? Object.values(error.data)[0][0] : 'Ошибка регистрации',
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
            regFunc();
        }
    }
    return (
        <>
            <Header />
            <Wrapper>
                {!showLink ?
                    <div className='reg auth'>
                        <img className='auth__img' src={require('../../assets/images/people.png')} alt='image-people' />
                        <div className='auth__content'>
                            <InputItem label='Введите вашу почту'>
                                <Input value={email} onKeyDown={handleKeyDown} onChange={e => setEmail(e.target.value)} type='text' placeholder='yourmail@mail.com' />
                            </InputItem>
                            <Spacer height='25px' />
                            <InputItem label='Придумайте пароль'>
                                <InputPass value={password} onKeyDown={handleKeyDown} onChange={e => setPassword(e.target.value)} type='password' placeholder='**********************' />
                            </InputItem>
                            <Spacer height='25px' />
                            <InputItem label='Повторите пароль'>
                                <InputPass value={passwordConfirm} onKeyDown={handleKeyDown} onChange={e => setPasswordConfirm(e.target.value)} type='password' placeholder='**********************' />
                            </InputItem>
                            <Spacer height='25px' />
                            <Button
                                onClick={() => regFunc()}
                                disabled={email && password && passwordConfirm && checkboxPrivacy ? false : true}
                                title="Зарегистрироваться"
                            />
                            <Link to='/auth' className='link auth__content-forget-pass'>Уже есть аккаунт IMPER ID?</Link>
                            <div className='auth__content-labels'>
                                <label className='auth__content-labels-item'>
                                    <input
                                        className='auth__content-labels-item-checkbox'
                                        defaultChecked={checkboxPrivacy}
                                        onChange={() => setCheckboxPrivacy(!checkboxPrivacy)}
                                        type="checkbox"
                                        name="checkbox"
                                        value="value"
                                    />
                                    <div className='auth__content-labels-item-label'>Я принимаю условия <Link to='#' className='link auth__content-forget-pass'>Пользовательского соглашения</Link> и даю свое согласие Империи Добра на обработку моей персональной информации на условиях, определенных <Link to='#' className='link auth__content-forget-pass'>Политикой конфиденциальности.</Link></div>
                                </label>
                                <label className='auth__content-labels-item'>
                                    <input
                                        className='auth__content-labels-item-checkbox'
                                        defaultChecked={checkboxAds}
                                        onChange={() => setCheckboxAds(!checkboxAds)}
                                        type="checkbox"
                                        name="checkbox"
                                        value="value"
                                    />
                                    <div className='auth__content-labels-item-label'>Я не хочу получать рекламу и другие предложения данного сервиса.</div>
                                </label>
                            </div>
                        </div>
                    </div>
                    : 
                    <Mail
                        imageName='mail-enter'
                        title='Отправили ссылку для входа в личный кабинет вам на почту.'
                        subtitle='Пожалуйста, не забудьте проверить спам.'
                    />
                    // <div className='auth'>
                    //     <img className='auth__img' src={require('../../assets/images/people.png')} alt='image-people' />
                    //     <div className='auth__content'>
                    //         <h2>Подтвердите свою учетную запись</h2>
                    //         <InputItem label='Введите вашу почту'>
                    //             <Input value={email} onChange={e => setEmail(e.target.value)} type='text' placeholder='yourmail@mail.com' />
                    //         </InputItem>
                    //         <Spacer height='25px' />
                    //         <InputItem label='Введите пароль'>
                    //             <InputPass value={password} onChange={e => setPassword(e.target.value)} type='password' placeholder='**********************' />
                    //         </InputItem>
                    //         <Spacer height='25px' />
                    //         <Button onClick={() => authFunc()} disabled={email && password ? false : true} title="Войти" />
                    //     </div>
                    // </div>
                    // <div>
                    //     <h2>Подтвердите свою учетную запись</h2>
                    //     <InputItem label='Введите вашу почту'>
                    //             <Input value={email} onChange={e => setEmail(e.target.value)} type='text' placeholder='yourmail@mail.com' />
                    //         </InputItem>
                    //     <Spacer height='25px' />
                    //     <InputItem label='Придумайте пароль'>
                    //         <InputPass value={password} onChange={e => setPassword(e.target.value)} type='password' placeholder='**********************' />
                    //     </InputItem>
                    //     <Button onClick={() => authFunc()} title="Войти" />
                    // </div>  
                    // <Mail
                    //     imageName='mail-link'
                    //     title='Отправили ссылку для восстановления пароля на почту'
                    //     subtitle='Пожалуйста, не забудьте проверить спам.'
                    //     /> 
                }
            </Wrapper>
        </>
    );
}
