import { createRoot } from 'react-dom/client'
import App from './App.js'
import { BrowserRouter } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import { AppContextProvider } from './context/Appcontext';
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
    <BrowserRouter>
    <AppContextProvider>
        <App />
      </AppContextProvider>
    </BrowserRouter>
    </React.StrictMode>,
)