import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.module.scss';
import App from './App';
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3333';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

