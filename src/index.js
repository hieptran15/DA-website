import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import store from './redux/store/Store';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import './i18next';
import { Suspense } from 'react';
i18next.init({
  interpolation: { escapeValue: false },  // React already does escaping
});

ReactDOM.render(
  <Suspense fallback={(<div>Loading ...</div>)}>
    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
serviceWorker.unregister();
