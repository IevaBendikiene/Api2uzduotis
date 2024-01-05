import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BeerContextProvider} from './context/BeerContext'
import { AuthContextProvider } from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BeerContextProvider >
        <App />
      </BeerContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

