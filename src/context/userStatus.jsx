import React, { createContext, useState } from 'react';

export const UserStatusContext = createContext();

export const UserStatusProvider = ({ children }) => {
    const [userStatus, setUserStatus] = useState(null);
   
    return (
       <UserStatusContext.Provider value={{ userStatus, setUserStatus }}>
         {children}
       </UserStatusContext.Provider>
    );
   };
   