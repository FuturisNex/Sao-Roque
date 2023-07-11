import React, { useState, useEffect } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { messaging } from '../auth/firebase';
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
    const handleNotificationReceived = (payload) => {
      const notification = {
        titulo: payload.notification.title,
        descricao: payload.notification.body,
        recebida: true,
      };

      setNotifications((prevState) => [...prevState, notification]);
      setPiscando(true);
    };

    messaging.onMessage(handleNotificationReceived);

    return () => {
      messaging.onMessage(handleNotificationReceived);
    };
  }, []);

  useEffect(() => {
    const requestNotificationPermission = async () => {
      try {
        await messaging.requestPermission();
        const token = await messaging.getToken();
        console.log('Token do dispositivo:', token);
      } catch (error) {
        console.log('Erro ao solicitar permissão de notificação:', error);
      }
    };

    requestNotificationPermission();
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
        />
      </div>
      <div className="mt-5">
        {notifications.map((notification, index) => (
          <div key={index} className="flex flex-col gap-1 border-b-1 border-color p-3">
            <p className="font-semibold dark:text-gray-200">{notification.titulo}</p>
            <p className="text-gray-500 text-sm dark:text-gray-400">{notification.descricao}</p>
            {/* Exibe a notificação recebida */}
            {notification.recebida && (
              <div className="text-xs text-red-theme font-semibold mt-1">
                Notificação recebida
              </div>
            )}
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
