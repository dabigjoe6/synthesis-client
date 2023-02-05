import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';
import AppRoot from './pages/index.js';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <AppRoot />
  </React.StrictMode>
);
