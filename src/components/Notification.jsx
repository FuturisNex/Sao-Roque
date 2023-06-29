import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { getMessaging, onMessage } from 'firebase/compat/messaging';
import database from '../auth/firebase.js'; // Importe a instância do Firebase

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const messaging = getMessaging(database); // Use a instância do Firebase importada

    onMessage(messaging, (payload) => {
      const { notification } = payload;
      setNotifications((prevState) => [...prevState, notification]);
    });

    return () => {
      messaging.onMessage.unsubscribe();
    };
  }, []);

  const handleClick = () => {
    setNotifications([]);
  };

   return (
    <div className="absolute bg-white shadow-lg rounded-xl text-14 z-20 overflow-y-auto max-h-96 w-60 top-14 right-0 mr-6 mt-1">
      <div className="flex justify-between items-center p-2 border-b border-gray-300">
        <h2 className="text-base font-semibold">Notificações</h2>
        <button
          type="button"
          onClick={handleClick}
          className="text-gray-500 hover:text-gray-700"
        >
          <MdClose />
        </button>
      </div>
      <div className="p-2">
        {notifications.map((notification, index) => (
          <div key={index} className="mb-2">
            <p>{notification.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
