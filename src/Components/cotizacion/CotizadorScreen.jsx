import React from 'react';

import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../NavBar/Navbar';
import ClienteScreen from './Clientes/ClienteScreen';
import ArticuloScreen from './Articulos/ArticulosScreen';
import CotizacionScreen from './Cotizaciones/CotizacionScreen';

import '../../styles/components/main.css';

const CotizadorScreen = ( props ) => {

  const { pathname } = props.location;

  return (
    <div className="wrapper">
      <Sidebar />
      <main className="container-fluid">
      <Navbar />
      <div className="content">
        {
          {
            '/': <ClienteScreen pathname={pathname} />,
            '/articulos': <ArticuloScreen />,
            '/cotizaciones': <CotizacionScreen pathname={pathname} />
          }[ pathname ]
        }
      </div>
      </main>
    </div>
  )
}

export default CotizadorScreen
