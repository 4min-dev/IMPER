import React from 'react';
import './wrapper.css';

export const Wrapper = ({children}) => {
    return (
        <div className='wrapper'>
            {children}
        </div>
    );
}