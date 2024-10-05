import React, { createContext, useState } from 'react';

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <ModalContext.Provider value={{ isShowModal, setIsShowModal }}>
      {children}
    </ModalContext.Provider>
  );
};
