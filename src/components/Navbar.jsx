import React, { useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';
import { toast } from 'react-toastify';
import database from '../auth/firebase.js';

import avatar from '../data/avatar.png';
import { Notification, UserProfile } from '.';
import { useStateContext } from '../contexts/ContextProvider';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
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
    </button>
  </Tooltip>
);

const Navbar = () => {
  const { currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize } = useStateContext();
  const [piscarStatus, setPiscarStatus] = useState(false);
  const [playSound, setPlaySound] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState(false);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [setScreenSize]);

  useEffect(() => {
    // Verificar a permissão de notificação
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission().then((permission) => {
        setNotificationPermission(permission === 'granted');
      });
    }
  }, []);

  useEffect(() => {
    const ref = database.ref('Notificacao/Piscar');

    const handlePiscarStatus = (snapshot) => {
      const value = snapshot.val();
      setPiscarStatus(value === true || value === 'true');

      if (value === true || value === 'true') {
        setPlaySound(true); // Ativa o som da notificação

        if (notificationPermission) {
          const notification = new Notification('Nova notificação!', {
            body: 'Conteúdo da notificação',
          });

          // Obter o tempo de expiração da notificação em tempo real
          const expirationRef = database.ref('Notificacao/TempoExpiracao');
          expirationRef.once('value', (expirationSnapshot) => {
            const expirationTime = expirationSnapshot.val();

            // Verificar se o tempo de expiração é um número válido
            if (typeof expirationTime === 'number' && expirationTime > 0) {
              setTimeout(() => {
                notification.close();
              }, expirationTime * 1000);
            }
          });
        }
      }
    };

    ref.on('value', handlePiscarStatus);

    return () => ref.off('value', handlePiscarStatus);
  }, [notificationPermission]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

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
          customFunc={() => {
            handleClick('notification');
            setPlaySound(false); // Desativa o som quando a notificação é aberta
          }}
          color={currentColor}
          icon={<RiNotification3Line />}
        />
        <Tooltip title="Profile" position="bottom">
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
        </Tooltip>
      </div>
      {isClicked.notification && <Notification />}
      {isClicked.userProfile && <UserProfile />}
      {playSound && (
        <audio src="../data/som.mp3" autoPlay onEnded={() => setPlaySound(false)}>
          <track kind="captions" srcLang="en" label="Portuguese captions" />
        </audio>
      )}
    </div>
  );
};

export default Navbar;
