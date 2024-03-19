// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBAj6LEm0ilC115tCzAXhbejn8o6FL0Jz0',
  authDomain: 'nextjs-auth-d7c2b.firebaseapp.com',
  databaseURL:
    'https://nextjs-auth-d7c2b-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'nextjs-auth-d7c2b',
  storageBucket: 'nextjs-auth-d7c2b.appspot.com',
  messagingSenderId: '929238136090',
  appId: '1:929238136090:web:afef7dc9b23e26112a68a3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
