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
    sendPasswordResetEmail,
} from "firebase/auth";


export const AuthContext = createContext({
    currentUser: null,
    registerUser: () => Promise,
    loginUser: () => Promise,
    signinWithFacebook: () => Promise,
    signinWithGoogle: () => Promise,
    SignOut: () => Promise,
    PasswordResetEmail: () => Promise,
    updateUser: () => Promise,
    setSubjects: () => { },
    setTheme: () => { },
    Theme: null,
    Themes: null,
});



export const useAuth = () => useContext(AuthContext);

export function AuthcontextProvider({ children }) {
    const [subject, setSubjects] = useState([]);
    const [classID, setClassID] = useState();
    const [currentUser, setCurrentUser] = useState("null");
    const [Theme, setTheme] = useState(null);
    const [Themes, setThemes] = useState({});
    console.log(Theme);
    console.log(Themes);

    useEffect(() => {
        if (Theme === null) {
            setTheme("Black");
        } else if (Theme === "Purple") {
            setThemes({ backgroundColor: "#5502BF", color: "#ffffff",paperColor:'rgba(229, 209, 255, 1)' });
            document.body.style.backgroundColor = "rgba(229, 209, 255, 1)";
        } else if (Theme === "Blue") {
            setThemes({ backgroundColor: "rgba(0, 99, 216, 1)", color: "#ffffff",paperColor: "rgba(191, 216, 245, 1)" });
            document.body.style.backgroundColor = "rgba(191, 216, 245, 1)";
        } else if (Theme === "Black") {
            document.body.style.backgroundColor = "#ffffff";
            setThemes({ backgroundColor: "#121212", color: "#ffffff",paperColor: "#ffffff" });
        }
    }, [Theme]);

    useEffect(() => {
        if (Theme) {
            localStorage.setItem("theme", Theme);
        }
    }, [Theme]);

    useEffect(() => {
        if (localStorage.getItem("theme")) {
            setTheme(localStorage.getItem("theme"));
        }
    })

    useEffect(() => {
        if (classID) {
            localStorage.setItem('classID', classID);
        }
    }, [classID])

    useEffect(() => {
        if (localStorage.getItem('classID')) {
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
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);

    const registerUser = async (email, password) => {
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

    const signinWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        const res = await signInWithPopup(auth, provider);
        return res;
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
        subject,
        setClassID,
        Theme,
        setTheme,
        Themes,
    };
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
}