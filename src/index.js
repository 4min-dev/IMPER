import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ModalProvider } from './context/modalContext';
import { PointProvider } from './context/ChosenItem';
import { UserStatusProvider } from './context/userStatus';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import { WayProvider } from './context/wayItem';
import { DistProvider } from './context/distance';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DistProvider>
    <WayProvider>
    <UserStatusProvider>
    <ModalProvider>
      <PointProvider>
      <App />
      </PointProvider>
    </ModalProvider>
  </UserStatusProvider>
  </WayProvider>
  </DistProvider>
  </React.StrictMode>
);