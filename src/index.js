import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './scripts/components/App.js';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);