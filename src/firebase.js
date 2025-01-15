import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: "AIzaSyDVrKxcKr2T5U10fMZlRpzN7KbSf2ONVv8",
	authDomain: "alpes-tech-spot5.firebaseapp.com",
	projectId: "alpes-tech-spot5",
	storageBucket: "alpes-tech-spot5.firebasestorage.app",
	messagingSenderId: "908770530073",
	appId: "1:908770530073:web:8d882a1760d126e555eb88",
	measurementId: "G-R10SCTCF7F"
  };

export const firebaseApp = initializeApp(firebaseConfig);