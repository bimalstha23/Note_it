import React, { useContext, createContext, useEffect, useState, } from 'react'
import { useAuth } from './AuthContext'
import { db } from '../utils/firebaseDB'
import { collection, query, onSnapshot } from 'firebase/firestore'

export const DBContext = createContext({
    createdClassData: [],
    joinedClassData: [],
    subject: [],
    setClassID: () => {},
    // setSubjects: () => {},
    // setClassID: () => {},
})

export const useDB = () => useContext(DBContext);
export const DBContextProvider = ({ children }) => {
    const { currentUser } = useAuth();
    const [createdClassData, setCreatedClassData] = useState([]);
    const [joinedClassData, setJoinedClassData] = useState([]);
    const [subject, setSubjects] = useState([]);
    const [classID, setClassID] = useState();
    console.log(classID);
    console.log(subject);

    useEffect(() => {
        if(localStorage.getItem('classID')){
            setClassID(localStorage.getItem('classID'));
        }
    })
    useEffect(() => {
        if(classID){
            localStorage.setItem('classID', classID);
        }
    }, [classID])
    
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

    useEffect(() => {
        // console.log(classID);
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
   
    const value = {
        createdClassData,
        joinedClassData,
        subject,
        setClassID,
    }
    return (
        <DBContext.Provider value={value}>
            {children}
        </DBContext.Provider>
    )
}
