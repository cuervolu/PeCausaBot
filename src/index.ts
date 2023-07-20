// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeMCmw2TVJ_PBvtz3dEU45wwPughCq6aM",
  authDomain: "pe-causa.firebaseapp.com",
  databaseURL: "https://pe-causa-default-rtdb.firebaseio.com",
  projectId: "pe-causa",
  storageBucket: "pe-causa.appspot.com",
  messagingSenderId: "643162617697",
  appId: "1:643162617697:web:772441350023d64a10f720"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


import('./client.js');