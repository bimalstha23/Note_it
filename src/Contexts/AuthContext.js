import React, { useContext, useState, createContext, useEffect } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore'
import { auth, db } from '../utils/firebaseDB';
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

export  const AuthContext = createContext({
    currentUser: null,
    registerUser: () => Promise,
    loginUser: () => Promise,
    signinWithFacebook: () => Promise,
    signinWithGoogle: () => Promise,
    SignOut: () => Promise,
    PasswordResetEmail: () => Promise,
    updateUser: () => Promise,
    setSubjects: () => {},
    createdClassData: [],
    subject: [],
    // verifyEmail: () => Promise,
});



export const useAuth = () => useContext(AuthContext);

export function AuthcontextProvider({ children }) {
    const [createdClassData, setCreatedClassData] = useState([]);
    const [joinedClassData, setJoinedClassData] = useState([]);
    const [subject, setSubjects] = useState([]);
    const [classID, setClassID] = useState();
    const [state, setState] = useState('');
    const [currentUser, setCurrentUser] = useState("null");
    
    useEffect(() => {
        if(classID){
            localStorage.setItem('classID', classID);
        }
    }, [classID])

    useEffect(() => {
        if(localStorage.getItem('classID')){
            setClassID(localStorage.getItem('classID'));
        }
    })
    
    
    useEffect(() => {
        if (classID) {
            const q = query(collection(db, "CreatedSubject", classID, "Subjects"));
            const unSubscribe = onSnapshot(q, (querySnapshot) => {
                setSubjects(
                    querySnapshot.docs.map((doc) => {
                        return {
                            ...doc.data(),
                            id: doc.id,
                        };
                    })
                );
            });
            return () => unSubscribe();
        }
    }, [classID]);
    

   console.log(subject);
    //geting current user from firebase
    useEffect(() => {
        const unsubscribe =  onAuthStateChanged(auth, user => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);

    const registerUser =  async (email, password) => {
            return createUserWithEmailAndPassword(auth, email, password);
    }

    const updateUser = (firstName, lastName) => {
        const user = auth.currentUser;
        updateProfile(user, {
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


    const PasswordResetEmail = (email) => {
        return sendPasswordResetEmail(auth, email, {
            url: "https://localhost:3000/"
        });
    }

 

    // console.log(createdClassData);
   
   
    const values = {
        currentUser,
        registerUser,
        loginUser,
        signinWithGoogle,
        signinWithFacebook,
        SignOut,
        PasswordResetEmail,
        updateUser,
        setSubjects,
        createdClassData,
        joinedClassData,
        subject,
        setClassID,
    };
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
}