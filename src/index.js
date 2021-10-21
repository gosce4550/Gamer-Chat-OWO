import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

import {ChatEngine} from 'react-chat-engine';
ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);
