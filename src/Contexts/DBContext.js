import React, { useContext, createContext, useEffect, useState, } from 'react'
import { useAuth } from './AuthContext'
import { db } from '../utils/firebaseDB'
import { collection, query, onSnapshot } from 'firebase/firestore'

const DBContext = createContext({
    createdClassData: [],
    joinedClassData: [],
})

export const useDB = () => useContext(DBContext);

export const DBContextProvider = ({ children }) => {
    const { currentUser } = useAuth();
    const [createdClassData, setCreatedClassData] = useState([]);
    const [joinedClassData, setJoinedClassData] = useState([]);

    useEffect(() => {
        if (currentUser.email) {
            const q = query(collection(db, 'CreatedClass', currentUser.email, 'Classes'));
            const unSubscribe = onSnapshot(q, (querySnapshot) => {
                setCreatedClassData(querySnapshot.docs.map((doc) => {
                    return {
                        ...doc.data(),
                        id: doc.id
                    }
                }));
            })
            return () => unSubscribe();
        }
    }, [currentUser.email])

    useEffect(() => {
        if (currentUser.email) {
            const q = query(collection(db, 'JoinedClasses', currentUser.email, 'Classes'));
            const unSubscribe = onSnapshot(q, (querySnapshot) => {
                setJoinedClassData(querySnapshot.docs.map((doc) => {
                    return {
                        ...doc.data(),
                        id: doc.id
                    }
                }));
            }
            )
            return () => unSubscribe();
        }
    }, [currentUser.email]);

   

    const value = {
        createdClassData,
        joinedClassData,
    }
    return (
        <DBContext.Provider value={value}>
            {children}
        </DBContext.Provider>
    )
}
