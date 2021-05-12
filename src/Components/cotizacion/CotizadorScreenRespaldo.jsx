import React from 'react';

import Sidebar from '../Sidebar/Sidebar';

import ClienteScreen from './Clientes/ClienteScreen';
import ArticuloScreen from './Articulos/ArticulosScreen';
import CotizacionScreen from './Cotizaciones/CotizacionScreen';

import '../../styles/components/main.css';
import Navbar from '../NavBar/Navbar';

const CotizadorScreen = ( props ) => {

  const { pathname } = props.location;

  return (
    <div
      className="main-content"
    >

      <Sidebar />

      <main className="container-fluid">
      <Navbar />

      <div className="container">
        {
          {
            '/': <ClienteScreen /> ,
            '/articulos': <ArticuloScreen />,
            '/cotizaciones': <CotizacionScreen />
          }[ pathname ]
        }
      </div>

      </main>
      
      

      
    </div>
  )
}

export default CotizadorScreen
