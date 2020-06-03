// File: src/index.tsx
// Date: 06/03/2020
// Note: safety-shield settings
// ..............................................................................
import React from 'react';
import ReactDOM from 'react-dom';
import './_reset.scss;
import '/_animations.scss;
import './index.scss';

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

// eof
