import { initializeApp } from "firebase/app";

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: "flowky.firebaseapp.com",
	projectId: "flowky",
	storageBucket: "flowky.firebasestorage.app",
	messagingSenderId: "54746772295",
	appId: "1:54746772295:web:7151671fab5c32f1b9d262",
};

const initializeFirebase = () => {
	initializeApp(firebaseConfig);
};

export { initializeFirebase };
