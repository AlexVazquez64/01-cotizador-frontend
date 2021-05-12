import React from 'react';
import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';

// import { startLogout } from '../../actions/auth';
// import { startNewNote } from '../../actions/notes';

// import JournalEntries from './JournalEntries';

import '../../styles/components/sidebar.css'

const Sidebar = () => {

  // const dispatch = useDispatch();
  // const { name } = useSelector( state => state.auth );

  return (
    <aside className="d-flex flex-column p-2 sidebar">
      <div className="sidebar-navbar">
        <h3 className="">
          <span className="">Cotizador</span>
        </h3>
      </div>

      <hr />

      <div
        className="sidebar__main-content"
      >
        <Link
          to={'/'}
          className="sidebar__links"
        >
          Clientes
        </Link>
      </div>

      <hr />

      <div
        className="sidebar__main-content"
      >
        <Link
          to={'/articulos'}
          className="sidebar__links"
        >
          Artículos
        </Link>
      </div>

      <hr />

      <div
        className="sidebar__main-content"
      >
        <Link
          to={"/cotizaciones"}
          className="sidebar__links"
        >
          Cotizaciones
        </Link>
      </div>
    </aside>
  )
}

export default Sidebar
