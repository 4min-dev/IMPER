import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import { Home } from './screens/home/home';
import { Auth } from './screens/auth/auth';
import { Reg } from './screens/reg/reg';
import { NewPass } from './screens/newpass/newpass';
import LocalStorage from './utils/LocalStorage';
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { ResetPass } from './screens/resetpass/resetpass';
import { PointProvider } from './context/ChosenItem';
import { Privacy } from './screens/privacy-policy/privacy';
import { Main } from './screens/main/main';

const ScrollToTops = (props) => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return props.children
}

const { get } = new LocalStorage;

function ProtectedRoute({children}) {
  
  return children 
}

function AlreadyReg({children}) {
  let access = get('accessToken');
  let refresh = get('refreshToken');
  let user = get('user');

  if(access && refresh && user) {
    return <Navigate to="/" replace />
  }
  return children
}

function App() {
  return (
    <BrowserRouter>
    <ScrollToTops>
        <div className="App">
            <ReactNotifications />
            <Routes>
                <Route path="/" element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                } />
                <Route path='/main' element={
                  <Main/>
                }></Route>
                <Route path="/privacy-policy" element={
                  <AlreadyReg>
                    <Privacy />
                   </AlreadyReg>
                } exact/>
                <Route path="/auth" element={
                  <AlreadyReg>
                    <Auth />
                  </AlreadyReg>
                } exact/>
                <Route path="/reg" element={
                  <AlreadyReg>
                    <Reg />
                  </AlreadyReg>
                } exact/>
                <Route path="/newpass" element={
                  <AlreadyReg>
                    <NewPass />
                  </AlreadyReg>
                } exact/>
                <Route path="/resetpass" element={
                  <AlreadyReg>
                    <ResetPass />
                  </AlreadyReg>
                } exact/>
                <Route path="/api/password-reset/confirm/:uid/:token/" element={
                  <AlreadyReg>
                    <NewPass />
                  </AlreadyReg>
                } exact/>
            </Routes>
        </div>
    </ScrollToTops>
  </BrowserRouter>
  );
}

export default App;
