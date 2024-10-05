import React from 'react';
import './spacer.css';

export const Spacer = ({width, height}) => {
    return (
        <div style={{width: width, height: height}} className='spacer'></div>
    );
}