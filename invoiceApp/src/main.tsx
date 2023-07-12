import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { InvoiceProvider } from './Context';
import './i18n';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
  <React.StrictMode>
    <InvoiceProvider>
    <App />
    </InvoiceProvider>
  </React.StrictMode>
  </BrowserRouter>
)
