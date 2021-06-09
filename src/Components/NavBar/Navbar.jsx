import React from 'react';

import '../../styles/navbar/rci_navbar.css';

const Navbar = () => {

  return (
    <div className="">
      <div className="navbar rci_navbar rounded">
        <div className="container-fluid">
          <button type="button" id="sidebarCollapse" className="btn btn-info">
            <i className="fas fa-align-left"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
