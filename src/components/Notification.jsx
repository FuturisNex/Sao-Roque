import React, { useState, useEffect } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import database from '../auth/firebase.js';
import Button from './Button';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [piscando, setPiscando] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const snapshot = await database.ref('notificacao/noti').once('value');
        const notificationsData = snapshot.val();
        if (notificationsData) {
          const notificationsArray = Object.values(notificationsData);
          setNotifications(notificationsArray);
          setPiscando(true); // Ativar o efeito de piscar quando as notificações forem atualizadas
        }
      } catch (error) {
        console.log('Erro ao buscar notificações:', error);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPiscando(false); // Desativar o efeito de piscar após 1 segundo
    }, 1000);

    return () => clearTimeout(timeout);
  }, [notifications]);

  return (
    <div
      className={`nav-item absolute right-5 md:right-40 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96`}
      style={{
        animation: `${piscando ? 'piscar 1s infinite' : 'none'}`,
      }}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold text-lg dark:text-gray-200">Notificações</p>
<button type="button" className="text-white text-xs rounded p-1 px-2 bg-orange-theme mt-2">
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
            <p className="font-semibold dark:text-gray-200">{notification.Titulo}</p>
            <p className="text-gray-500 text-sm dark:text-gray-400">{notification.Descricao}</p>
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
