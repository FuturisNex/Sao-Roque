import React, { useState, useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import database from '../auth/firebase.js';

import avatar from '../data/avatar.png';
import { UserProfile } from '.';
import { useStateContext } from '../contexts/ContextProvider';
import './Style/noti.css';

const NavButton = ({ title, customFunc, icon, color, showBolinha }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      {showBolinha && (
        <span
          style={{ background: 'yellow' }}
          className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
        />
      )}
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const { currentColor, handleClick, isClicked } = useStateContext();
  const [showBolinha, setShowBolinha] = useState(false);

  useEffect(() => {
    const ref = database.ref('notificacao');

    const handleNotificationAdded = () => {
      setShowBolinha(true);
    };

    const handleNotificationRemoved = () => {
      setShowBolinha(false);
    };

    ref.child('noti').on('child_added', handleNotificationAdded);
    ref.child('noti').on('child_removed', handleNotificationRemoved);

    return () => {
      ref.child('noti').off('child_added', handleNotificationAdded);
      ref.child('noti').off('child_removed', handleNotificationRemoved);
    };
  }, []);

  const handleActiveMenu = () => {
    // Implemente a lógica para ativar/desativar o menu
  };

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />
      <div className="flex">
        <NavButton
          title="Notification"
          customFunc={() => handleClick('notification')}
          color={currentColor}
          icon={<RiNotification3Line />}
          showBolinha={showBolinha}
        />
        <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick('userProfile')}
          >
            <img
              className="rounded-full w-8 h-8"
              src={avatar}
              alt="user-profile"
            />
            <p>
              <span className="text-gray-400 text-14">Olá,</span>{' '}
              <span className="text-gray-400 font-bold ml-1 text-14">
                Bem Vindo
              </span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </TooltipComponent>
      </div>
      {isClicked.userProfile && <UserProfile />}
    </div>
  );
};

export default Navbar;
