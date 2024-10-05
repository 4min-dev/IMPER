import React from 'react'
import './asidePanel.css'

export const AsidePanel = ({indexes, asidePanelHandler, setCurrIndex, scrollToSection}) => {

  let [isAsideClosing, setAsideClosing] = React.useState(false)

  function asidePanelActiveStatusHandler() {
    setAsideClosing(!isAsideClosing)

    setTimeout(() => {
      asidePanelHandler()
    }, 350);
  }

  return (
    <div className={`aside__overlay ${isAsideClosing ? 'closing' : ''}`} onClick={asidePanelActiveStatusHandler}>
        <aside className='main__page__aside__panel' onClick={(e) => e.stopPropagation()}>
        <div className='close__button'  onClick={asidePanelActiveStatusHandler}>X</div>
        {indexes.map((index) => (
            <button
              key={index.id}
              type='button'
              onClick={() => {
                setCurrIndex(index);
                scrollToSection(index.sectionRef);
                asidePanelActiveStatusHandler()
              }}
            >
              {index.name}
            </button>
          ))}
        </aside>
    </div>
  )
}