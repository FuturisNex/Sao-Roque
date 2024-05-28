import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { links } from '../data/dummy';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import logo from '../data/img/logotipo.png';
import { useStateContext } from '../contexts/ContextProvider';

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  if (!activeMenu) {
    return null;
  }

  const getStyle = (isActive) => ({
    backgroundColor: isActive ? currentColor : '',
  });

  return (
    <div
      className="h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 sidebar"
      style={{
        width: '275px',
        backgroundColor: '#fff',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '10px',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
      }}
    >
      <img
        src={logo}
        alt="Logo"
        className="Sidebar-logo"
        style={{
          display: 'block',
          margin: '25px auto -20px',
          width: '60%',
        }}
      />
      <div className="flex justify-between items-center sidebar-header">
        <Link
          to="/"
          onClick={handleCloseSideBar}
          className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
        />
        <TooltipComponent content="Menu" position="BottomCenter">
          <button
            id="button"
            type="button"
            onClick={() => setActiveMenu(!activeMenu)}
            style={{ color: currentColor }}
            className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden sidebar-close-btn"
          >
            <MdOutlineCancel />
          </button>
        </TooltipComponent>
      </div>
      <div
        className="mt-10 sidebar-links"
        style={{ marginTop: '2.5rem', padding: '0 1rem' }}
      >
        {links.map((item) => (
          <div key={item.title}>
            <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase sidebar-category">
              {item.title}
            </p>
            {item.links.map((link) => (
              <NavLink
                to={`/${link.url}`}
                key={link.name}
                onClick={handleCloseSideBar}
                style={({ isActive }) => getStyle(isActive)}
                className={isActive ? 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2 sidebar-link active' : 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2 sidebar-link'}
                target={link.target === '_blank' ? '_blank' : undefined}
              >
                {link.icon}
                <span className="capitalize sidebar-link-text">{link.name}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
