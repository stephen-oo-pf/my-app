// File: src/index.tsx
// Date: 05/20/2020
// Note: cra-with-typescript.jsx
// Name: stephen.oo@phonefusion.com
// ..............................................................................
import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import App from './App';

import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
	<BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
