// Import the functions you need from the SDKs
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyANqxu2vj04kYwsR3VLNEC6FuxjbHAEGX4",
  authDomain: "scrap-v1.firebaseapp.com",
  projectId: "scrap-v1",
  storageBucket: "scrap-v1.firebasestorage.app",
  messagingSenderId: "104311283916",
  appId: "1:104311283916:web:96eb2ff1f4cd45c6652269",
  measurementId: "G-RVKRYFR3E8"


};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

export { auth };
