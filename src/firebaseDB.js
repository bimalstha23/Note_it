// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "process.env.React_ApiKey",
  authDomain: "prcess.env.React_AuthDomain",
  projectId: "process.env.React_ProjectID",
  storageBucket: "process.env.React_StorageBucket",
  messagingSenderId: "process.env.React_MessagingSenderID",
  appId: "process.env.React_AppID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
