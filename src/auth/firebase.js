import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyBR7ZeYNiLbshvMe5powb4wNnT6p7xt1q8',
  authDomain: 'grupo-sao-roque.firebaseapp.com',
  databaseURL: 'https://grupo-sao-roque-default-rtdb.firebaseio.com',
  projectId: 'grupo-sao-roque',
  storageBucket: 'grupo-sao-roque.appspot.com',
  messagingSenderId: '436605416235',
  appId: '1:436605416235:web:6e9db798ded70ab7690b6e',
};

const app = firebase.initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const requestFirebaseNotificationPermission = async () => {
  try {
    await Notification.requestPermission();
    const token = await getToken(messaging);
    console.log('Firebase Cloud Messaging token:', token);
  } catch (error) {
    console.error('Error requesting notification permission:', error);
  }
};

const setupFirebaseMessaging = () => {
  onMessage(messaging, (payload) => {
    console.log('Received FCM message:', payload);
    // Faça algo com a notificação recebida, como exibir um toast ou uma notificação no navegador
    Notification(payload.notification.title, { body: payload.notification.body });
  });
};

export { app, messaging, requestFirebaseNotificationPermission, setupFirebaseMessaging };
