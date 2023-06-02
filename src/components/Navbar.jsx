import React from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import avatar from '../data/avatar.png';
import { Notification, UserProfile } from '.';
import { useStateContext } from '../contexts/ContextProvider';
import './Style/noti.css';

const NavButton = ({ title, customFunc, icon, color, dotColor, isPiscando }) => {
  return (
    <TooltipComponent content={title} position="BottomCenter">
      <button
        type="button"
        onClick={() => customFunc()}
        style={{ color }}
        className="relative text-xl rounded-full p-3 hover:bg-light-gray"
      >
        {isPiscando && (
          <span
            style={{ background: dotColor }}
            className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2 animate-piscar"
          />
        )}
        {icon}
      </button>
    </TooltipComponent>
  );
};

const Navbar = () => {
  const { currentColor, activeMenu, setActiveMenu, handleClick, isClicked } = useStateContext();

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
          dotColor="red"
          customFunc={() => handleClick('notification')}
          color={currentColor}
          icon={<RiNotification3Line />}
          isPiscando={isPiscando}
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
      {isClicked.notification && (<Notification />)}
      {isClicked.userProfile && (<UserProfile />)}
    </div>
  );
};

export default Navbar;
