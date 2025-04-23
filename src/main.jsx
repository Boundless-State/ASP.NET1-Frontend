import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import './assets/css/style.css';
import './assets/css/animate.css';

//här skapade jag en main.jsx då jag inte fick det att funka annars av någon konstig anledning.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);