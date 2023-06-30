import React, { useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';
import { toast } from 'react-toastify';
import { messaging } from '../auth/firebase.js';
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
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [setScreenSize]);

  useEffect(() => {
    const requestNotificationPermission = async () => {
      try {
        await messaging.requestPermission();
        console.log('Permissões de notificação concedidas.');

        const token = await messaging.getToken();
        console.log('Token de registro:', token);

        // Agora você pode enviar o token de registro para o seu servidor
      } catch (error) {
        console.log('Falha ao solicitar permissões de notificação:', error);
      }
    };

    requestNotificationPermission();
  }, []);

  useEffect(() => {
    const handleNotification = (payload) => {
      const { title } = payload.notification;
      toast(title); // Exibe a notificação usando o React Toastify
    };

    messaging.onMessage(handleNotification);

    return () => {
      messaging.onMessage.unsubscibe(handleNotification);
    };
  }, []);

  useEffect(() => {
    const handlePiscarStatus = (snapshot) => {
      const value = snapshot.val();
      setPiscarStatus(value === true || value === 'true');

      if (value === true || value === 'true') {
        setPlaySound(true); // Ativa o som da notificação
        toast('Nova notificação!'); // Exibe a notificação do navegador
      }
    };

    const ref = database.ref('Notificacoes');
    ref.child('Piscar').on('value', handlePiscarStatus);

    return () => ref.child('Piscar').off('value', handlePiscarStatus);
  }, []);

  useEffect(() => {
    const handleNotificationAdded = (snapshot) => {
      const notification = snapshot.val();
      setNotifications((prevState) => [...prevState, notification]);

      const expirationTimeInMillis = notification.expiracao * 24 * 60 * 60 * 1000;

      setTimeout(() => {
        setNotifications((prevState) => prevState.filter((item) => item.id !== notification.id));
      }, expirationTimeInMillis);
    };

    const handleNotificationRemoved = (snapshot) => {
      const notification = snapshot.val();
      setNotifications((prevState) => prevState.filter((item) => item.id !== notification.id));
    };

    const ref = database.ref('Notificacoes');
    ref.on('child_added', handleNotificationAdded);
    ref.on('child_removed', handleNotificationRemoved);

    return () => {
      ref.off('child_added', handleNotificationAdded);
      ref.off('child_removed', handleNotificationRemoved);
    };
  }, []);

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
      {isClicked.notification && <Notification notifications={notifications} />}
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
