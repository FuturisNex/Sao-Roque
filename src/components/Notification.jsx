import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage } from 'firebase/messaging';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBR7ZeYNiLbshvMe5powb4wNnT6p7xt1q8',
  authDomain: 'grupo-sao-roque.firebaseapp.com',
  databaseURL: 'https://grupo-sao-roque-default-rtdb.firebaseio.com',
  projectId: 'grupo-sao-roque',
  storageBucket: 'grupo-sao-roque.appspot.com',
  messagingSenderId: '436605416235',
  appId: '1:436605416235:web:6e9db798ded70ab7690b6e',
};

// Inicialização do app Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Listener para receber notificações em tempo real
    onMessage(messaging, (payload) => {
      const { notification } = payload;
      setNotifications((prevState) => [...prevState, notification]);
    });
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
