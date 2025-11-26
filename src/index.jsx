import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import registerServiceWorker from './registerServiceWorker';

const container = document.getElementById('root');
const root = createRoot(container);
root.render((<BrowserRouter basename={'/'}>
               <I18nextProvider i18n={ i18n() }><App /></I18nextProvider>
             </BrowserRouter>
        ));
registerServiceWorker();
