import React from 'react'
import './header.css'

export const Header = () => {
    return (
        <div className='header'>
            <div className='header__logo'>
                <div className='header__logo-title'>IMPER ID</div>
                <img className='header__logo-logo' src={require('../../../assets/images/logo.png')} alt='logo'/>
            </div>
            <div className='header__subtitle'>Единая учетная запись волонтёра Империи.</div>
        </div>
    );
}