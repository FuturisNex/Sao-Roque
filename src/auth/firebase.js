import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

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
const database = app.database();

export default database;
