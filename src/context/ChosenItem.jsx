import React, { createContext, useState } from 'react';

export const PointContext = createContext();

export const PointProvider = ({ children }) => {
    const [selectedItem, setSelectedItem] = useState(null);
   
    return (
       <PointContext.Provider value={{ selectedItem, setSelectedItem }}>
         {children}
       </PointContext.Provider>
    );
   };
   