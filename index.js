import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './store/Auth-context';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux';
import Store from './store/Index'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
  <BrowserRouter>
  <Provider store={Store}>
   <AuthContextProvider> 
    
    <App />
    </AuthContextProvider>
    </Provider>
   
  </BrowserRouter>
  

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

