import React from 'react'
import './button.css'
import { Link } from 'react-router-dom';

export const Button = ({to, title, onClick, disabled}) => {
    return (
        <Link 
            to={ to } 
            onClick={ disabled ? null : onClick }
            className={`link ${disabled ? 'button disabled-btn' : 'button'}`}
            >
            { title }
        </Link>
    );
}