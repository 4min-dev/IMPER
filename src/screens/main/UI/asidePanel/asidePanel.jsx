import React from 'react'
import './asidePanel.css'

export const AsidePanel = ({indexes, asidePanelHandler, setCurrIndex, scrollToSection}) => {
  return (
    <div className='aside__overlay' onClick={asidePanelHandler}>
        <aside onClick={(e) => e.stopPropagation()}>
        <div className='close__button' onClick={asidePanelHandler}>X</div>
        {indexes.map((index) => (
            <button
              key={index.id}
              type='button'
              onClick={() => {
                setCurrIndex(index);
                scrollToSection(index);
                asidePanelHandler()
              }}
            >
              {index.name}
            </button>
          ))}
        </aside>
    </div>
  )
}