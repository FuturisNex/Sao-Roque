import React from 'react';
import { FaBoxOpen, FaClipboardList } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import './SidebarAvaria.css';

const SidebarAvaria = () => {
  const location = useLocation();

  return (
    <div className="sidebarA">
      <Link to="/avarias/avarias-home" className={`sidebar-icon ${location.pathname === '/avarias/avarias-home' ? 'active' : ''}`}>
        <FaBoxOpen />
        <span>Enviar</span>
      </Link>
      <Link to="/avarias/avarias-lista" className={`sidebar-icon ${location.pathname === '/avarias/avarias-lista' ? 'active' : ''}`}>
        <FaClipboardList />
        <span>Envios</span>
      </Link>
    </div>
  );
};

export default SidebarAvaria;
