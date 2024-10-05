import React, { useState } from 'react'
import './input.css'

export const Input = ({type, placeholder, value, onChange, onKeyDown}) => {
    return (
        <input 
            type={type} 
            defaultValue={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder={placeholder} 
            className='input'
            />
    );
}

export const InputPass = ({type, placeholder, value, onChange, onKeyDown}) => {
    const [isShowText, setIsShowText] = useState(false);
    return (
        <div className='input input--pass'>
            <input 
                type={type} 
                defaultValue={value}
                onChange={onChange}
                placeholder={placeholder}
                onKeyDown={onKeyDown}
                type={isShowText ? 'text' : 'password'} 
                className='input-pass'
                />
            <img 
                onClick={() => setIsShowText(!isShowText)} 
                src={require(isShowText ? '../../../assets/icons/eye.svg' : '../../../assets/icons/eye-off.svg').default} 
                alt='eye'
                />
        </div>
    );
}