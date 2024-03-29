import React, { useState, useEffect } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import database from '../auth/firebase.js';
import Button from './Button';
import './Style/noti.css';

const Notification = ({ navId }) => {
  const [notifications, setNotifications] = useState([]);
  const [piscando, setPiscando] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const ref = database.ref('Notificacao');

    const handleNotificationAdded = (snapshot) => {
      const notification = snapshot.val();
      setNotifications((prevState) => [...prevState, notification]);
      setPiscando(true);
    };

    const handleNotificationRemoved = (snapshot) => {
      const notification = snapshot.val();
      setNotifications((prevState) => prevState.filter((item) => item.id !== notification.id));
      setPiscando(notifications.length > 1);
    };

    ref.child('Alerta').on('child_added', handleNotificationAdded);
    ref.child('Alerta').on('child_removed', handleNotificationRemoved);

    return () => {
      ref.child('Alerta').off('child_added', handleNotificationAdded);
      ref.child('Alerta').off('child_removed', handleNotificationRemoved);
    };
  }, []);

  return (
    <div className={`nav-item absolute right-5 md:right-40 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg ${isMobile ? 'w-full' : 'w-96'} ${piscando ? 'piscando' : ''}`} id={navId}>
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold text-lg dark:text-gray-200">Notificações</p>
          <button
            type="button"
            className={`text-white text-xs rounded p-1 px-2 mt-2 ${piscando ? 'bg-red-theme' : ''}`}
          >
            {notifications.length} Notificação{notifications.length !== 1 ? 'ões' : ''}
          </button>
        </div>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
          className="mt-2"
        />
      </div>
      <div>
        {notifications.map((notification, index) => (
          <div key={index} className="flex flex-col gap-1 border-b-1 border-color p-3">
            <p className="font-semibold dark:text-gray-200">{notification.titulo}</p>
            <p className="text-gray-500 text-sm dark:text-gray-400">{notification.descricao}</p>
          </div>
        ))}
        {notifications.length === 0 && (
          <div className="flex items-center justify-center mt-3">
            <p className="text-gray-500 text-sm">Nenhuma notificação encontrada.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
