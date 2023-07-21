import React, { useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';
import { toast } from 'react-toastify';
import database from '../auth/firebase.js';

import './Style/navbar.css';
import './Style/notificationBellAnimation.css';

import avatar from '../data/avatar.png';
import { Notification, UserProfile } from '.';
import { useStateContext } from '../contexts/ContextProvider';

const NavButton = ({ title, customFunc, icon, color, dotColor, children }) => (
  <Tooltip title={title} position="bottom">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
      {children}
    </button>
  </Tooltip>
);

const Navbar = () => {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
  } = useStateContext();
  const [piscarStatus, setPiscarStatus] = useState(false);
  const [playSound, setPlaySound] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [bellAnimation, setBellAnimation] = useState(false); // Estado para controlar a animação do sino de notificação

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [setScreenSize]);

  useEffect(() => {
    const ref = database.ref('Notificacao/Alerta');

    const handleNotificationCount = (snapshot) => {
      const data = snapshot.val();
      const count = Object.keys(data).length;
      setNotificationCount(count);

      if (count > 0) {
        setBellAnimation(true); // Ativa a animação do sino de notificação se houver notificações
        setTimeout(() => {
          setBellAnimation(false);
        }, 1000);
      }
    };

    ref.on('value', handleNotificationCount);

    return () => ref.off('value', handleNotificationCount);
  }, []);

  useEffect(() => {
    const ref = database.ref('Notificacao/Piscar');

    const handlePiscarStatus = (snapshot) => {
      const value = snapshot.val();
      setPiscarStatus(value === true || value === 'true');

      if (value === true || value === 'true') {
        setPlaySound(true);

        const toastStyle = {
          position: toast.POSITION.END_CENTER,
          marginTop: '50px',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        };

        toast('Nova notificação!', {
          position: toast.POSITION.END_CENTER,
          autoClose: 3000,
          style: toastStyle,
        });

        setBellAnimation(true); // Ativa a animação do sino de notificação quando houver uma notificação
        setTimeout(() => {
          setBellAnimation(false);
        }, 1000);
      }
    };

    ref.on('value', handlePiscarStatus);

    return () => ref.off('value', handlePiscarStatus);
  }, []);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  const handleNotificationClick = () => {
    handleClick('notification');
    setPlaySound(false);
    setBellAnimation(true);
    setTimeout(() => {
      setBellAnimation(false);
    }, 1000);
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
          title="Notificações"
          dotColor={piscarStatus ? 'rgb(254, 201, 15)' : 'transparent'}
          customFunc={handleNotificationClick} // Usamos a nova função criada
          color={currentColor}
          icon={<RiNotification3Line className={bellAnimation ? 'bell-animation' : ''} />}
        >
          {notificationCount > 0 && (
            <span className="notification-count" style={{ background: 'red' }}>
              {notificationCount}
            </span>
          )}
        </NavButton>
        <Tooltip title="Perfil" position="bottom">
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
                Bem-vindo
              </span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </Tooltip>
      </div>
      {isClicked.notification && <Notification />}
      {isClicked.userProfile && <UserProfile />}
      {playSound && (
        <audio
          src="../data/som.mp3"
          autoPlay
          onEnded={() => setPlaySound(false)}
        >
          <track kind="captions" srcLang="en" label="Portuguese captions" />
        </audio>
      )}
    </div>
  );
};

export default Navbar;
