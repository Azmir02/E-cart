import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HelmetProvider } from 'react-helmet-async';
import { PayPalScriptProvider} from "@paypal/react-paypal-js";
import App from './App';
import {Storeprovider} from './Components/Store'

ReactDOM.render(<Storeprovider><BrowserRouter><HelmetProvider><PayPalScriptProvider><App /></PayPalScriptProvider></HelmetProvider></BrowserRouter></Storeprovider>,document.getElementById('root'));