import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import 'antd/dist/reset.css';
import App from './App';
import './service-worker.js';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);