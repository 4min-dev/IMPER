import React, { createContext, useState } from 'react';

export const wayContext = createContext();

export const WayProvider = ({ children }) => {
    const [wayItem, setWayItem] = useState(null);
   
    return (
       <wayContext.Provider value={{ wayItem, setWayItem }}>
         {children}
       </wayContext.Provider>
    );
   };
   