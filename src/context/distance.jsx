import React, { createContext, useState } from 'react';

export const distContext = createContext();

export const DistProvider = ({ children }) => {
    const [distanceItem, setDistanceItem] = useState(null);
   
    return (
       <distContext.Provider value={{ distanceItem, setDistanceItem }}>
         {children}
       </distContext.Provider>
    );
   };
   