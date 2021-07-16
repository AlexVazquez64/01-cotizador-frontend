import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../../styles/components/sidebar.css'

const Sidebar = () => {

  const sidebarCollapsed = localStorage.getItem('sidebar-collapsed');
  const [isExpanded, setIsExpanded] = useState(sidebarCollapsed ? false : true);

  const handleToggler = () => {
    console.log('click on handleToggler');
    if (isExpanded) {
      setIsExpanded(false);
      localStorage.setItem('sidebar-collapsed', true);
      return;
    }
      setIsExpanded(true);
      localStorage.removeItem('sidebar-collapsed');
  };

  return (
    <aside className={isExpanded ? "sidebar" : "sidebar active"}>
      <div className="sidebar-header">
        <h5 className="">
          <span className="d-inline-flex">Cotizador RCI</span>
          <button type="button" id="sidebarCollapse" className="btn btn-info btnSideBar" onClick={handleToggler}>
          <i className="fas fa-align-left"></i>
        </button>
        </h5>
        
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
