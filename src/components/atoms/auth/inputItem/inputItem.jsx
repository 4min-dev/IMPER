import React from 'react'
import './inputItem.css'

export const InputItem = ({label, children}) => {
    return (
        <div className='input-item'>
            <div className='input-item__label'>{label}</div>
            <div>{ children }</div>
        </div>
    );
}