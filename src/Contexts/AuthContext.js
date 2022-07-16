import React, { useContext,useState,createContext, useEffect } from 'react';
import {auth} from '../utils/firebaseDB';
import { 
    createUserWithEmailAndPassword,
     signInWithEmailAndPassword,
      onAuthStateChanged,
       signInWithPopup,
        GoogleAuthProvider,
         FacebookAuthProvider,
        signOut
     } from "firebase/auth";

const AuthContext = createContext({
    currentUser: null,
    registerUser: () => Promise,
    loginUser: () => Promise,
    signinWithFacebook: () => Promise,
    signinWithGoogle: () => Promise,
});



export const useAuth=()=> useContext(AuthContext);

export function AuthcontextProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null);

    //geting current user from firebase
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);

    function registerUser  (email, password) {
        return  createUserWithEmailAndPassword(auth, email, password);
    }
    function loginUser (email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signinWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    }

    const signinWithFacebook = () => {
        const provider = new FacebookAuthProvider();
        return signInWithPopup(auth, provider);
    }

    const signOut = () => {
        return signOut(auth);
    }

    const values = {
        currentUser,
        registerUser,
        loginUser,
        signinWithGoogle,
        signinWithFacebook,
    };
    return(
     <AuthContext.Provider value={values}> 
        {children}
     </AuthContext.Provider>
    );
}