import React from 'react';
import { Provider } from 'react-redux'

import { store } from './store/store';
import AppRouter from './routers/AppRouter';

const CotizadorApp = () => {
  console.warn('Developed By Alex Vázquez');
  return (
    <div>
      <Provider store={ store }>
        <AppRouter />
      </Provider>
    </div>
  )
}

export default CotizadorApp;