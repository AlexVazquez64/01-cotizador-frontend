import React from 'react';
import ReactDOM from 'react-dom';

import CotizadorApp from './CotizadorApp';

import './styles/base/base.css';

console.log(process.env)

ReactDOM.render(
    <CotizadorApp />,
  document.getElementById('root')
);
