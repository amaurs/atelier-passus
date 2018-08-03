import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import Hamburger from './Hamburger';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render((<BrowserRouter basename={process.env.PUBLIC_URL}> 
                   <I18nextProvider i18n={ i18n() }><App /></I18nextProvider> 
                 </BrowserRouter>
            ), document.getElementById('root'));
registerServiceWorker();
