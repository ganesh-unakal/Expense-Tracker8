import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './store/Auth-context';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import Store from './store/Index';


const root = ReactDOM.createRoot(document.getElementById('root'));
const darktheme = localStorage.getItem('darktheme') === 'true'

console.log(darktheme)
root.render(
  <div className={darktheme ? 'dark' : null}>
    <BrowserRouter>
      <Provider store={Store}>
        <App />
      </Provider>
    </BrowserRouter>
  </div>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

