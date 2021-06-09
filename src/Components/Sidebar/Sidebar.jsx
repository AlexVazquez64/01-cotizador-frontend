import React from 'react';
import { Link } from 'react-router-dom';

import '../../styles/components/sidebar.css'

const Sidebar = () => {
  return (
    <aside id="sidebar">
      <div className="sidebar-header">
        <h3 className="">
          <span className="">Cotizador RCI</span>
        </h3>
      </div>

      <ul className="components">
        <li className="">
          <Link
            to={'/'}
            className=""
          >
            Clientes
          </Link>
        </li>

        <li className="">
          <Link
            to={'/articulos'}
            className=""
          >
            Artículos
          </Link>
        </li>

        <li className="">
          <Link
            to={"/cotizaciones"}
            className=""
          >
            Cotizaciones
          </Link>
        </li>
      </ul>

      
    </aside>
  )
}

export default Sidebar
