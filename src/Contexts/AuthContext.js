import React, { useContext, useState, createContext, useEffect } from 'react';
import { auth, } from '../utils/firebaseDB';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signOut,
    updateProfile,
    // createUser,
    confirmPasswordReset,
    sendPasswordResetEmail,
    sendEmailVerification,
} from "firebase/auth";

const AuthContext = createContext({
    currentUser: null,
    registerUser: () => Promise,
    loginUser: () => Promise,
    signinWithFacebook: () => Promise,
    signinWithGoogle: () => Promise,
    SignOut: () => Promise,
    PasswordResetEmail: () => Promise,
    updateUser: () => Promise,
    verifyEmail: () => Promise,
});



export const useAuth = () => useContext(AuthContext);

export function AuthcontextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState("null");

    //geting current user from firebase
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);

    const  registerUser= (email, password)=> {
     return  createUserWithEmailAndPassword(auth,email, password);
    }

    const updateUser =  (firstName,lastName) => {
        const user = auth.currentUser;
        updateProfile(user,{
            displayName: `${firstName} ${lastName}`,
            photoURL: "https://i.pinimg.com/564x/26/f7/df/26f7df7b4db91a5444cc3a3796fd3da0.jpg"
        });
    }

    function loginUser(email, password) {
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

    const SignOut = () => {
        return signOut(auth);
    }
 
    const verifyEmail = () => {
    return sendEmailVerification(auth.currentUser);
    }

    const PasswordResetEmail=(email)=>{
        return sendPasswordResetEmail(auth,email,{
            url: "https://localhost:3000/"
        });
    }

    const values = {
        currentUser,
        registerUser,
        loginUser,
        signinWithGoogle,
        signinWithFacebook,
        SignOut,
        PasswordResetEmail,
        updateUser,
        verifyEmail,
    };
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
}