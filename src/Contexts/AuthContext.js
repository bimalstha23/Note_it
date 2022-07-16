import React, { useContext,useState,createContext } from 'react';
import {auth} from '../utils/firebaseDB';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const AuthContext = createContext({
    currentUser: null,
    registerUser: () => Promise,
    loginUser: () => Promise,
});

export const useAuth=()=> useContext(AuthContext);
    
export function AuthcontextProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null);
    function registerUser  (email, password) {
        return  createUserWithEmailAndPassword(auth, email, password);
    }
    function loginUser (email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const values = {
        currentUser,
        registerUser,
        loginUser,
    };
    return(
     <AuthContext.Provider value={values}> 
        {children}
     </AuthContext.Provider>
    );
}