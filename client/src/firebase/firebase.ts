// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDWJZjeGHp1hKwhJGuY_n4k89-4hKiCzCc',
	authDomain: 'socialmedia-daf29.firebaseapp.com',
	projectId: 'socialmedia-daf29',
	storageBucket: 'socialmedia-daf29.appspot.com',
	messagingSenderId: '790362175597',
	appId: '1:790362175597:web:f9e4ff328e33b4c50ce764',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
