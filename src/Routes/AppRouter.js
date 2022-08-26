import React, { useEffect, useState } from 'react';
import { LogInform } from '../files/userAuthentication/Sign_in.js';
import { SignUp } from '../files/userAuthentication/Sign_up.js';
import { Home } from '../files/DashBoard/Home.js';
import { ForgotPassword } from '../files/userAuthentication/ForgotPassword.js';
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from './ProtectedRoute.js';
import { UpdateuserProfile } from '../files/userAuthentication/UpdateuserProfile.js';
import { EmailVerification } from '../files/userAuthentication/EmailVerification.js';
import { InnerContent } from '../files/DashBoard/InnerContent.js';
import { MainHome } from '../files/DashBoard/DashBoardComponents/HomeContainer/MainHome.js';
import { ChatRoom } from '../files/DashBoard/DashBoardComponents/Chat/ChatRoom.js';
import { Navigate } from 'react-router-dom';
import { Subjects } from '../files/DashBoard/DashBoardComponents/HomeContainer/RenderClass/ClassContent/Subjects.js';
import { SubjectContent } from '../files/DashBoard/DashBoardComponents/HomeContainer/RenderClass/ClassContent/SubjectContent/SubjectContent.js';
import { useAuth } from '../Contexts/AuthContext';
import { ChatSpace } from '../files/DashBoard/DashBoardComponents/Chat/ChatSpace.js';
import { collection, query, onSnapshot } from 'firebase/firestore'
import { db } from '../utils/firebaseDB';
import { Settings } from '../files/DashBoard/DashBoardComponents/Settings/Settings.js';
import {TODO} from '../files/DashBoard/DashBoardComponents/TODO/TODO.js';
export function AppRouter() {
  const [createdClassData, setCreatedClassData] = useState([]);
  const [joinedClassData, setJoinedClassData] = useState([]);
  const { currentUser } = useAuth();
  function fetchCreatedClasses() {
    try {
      const q = query(collection(db, 'CreatedClass', currentUser.email, 'Classes'));
      onSnapshot(q, (querySnapshot) => {
        setCreatedClassData(querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id
          }
        }));
      })
    } catch (err) {
      console.log(err);
    }
  }
  function fetchJoinedClasses() {
    try {
      const q = query(collection(db, 'JoinedClasses', currentUser.email, 'Classes'));
      onSnapshot(q, (querySnapshot) => {
        setJoinedClassData(querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id
          }
        }));
      }
      )
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    // if (loading) return;
    // if (!currentUser) Navigate("/login", { replace: true });
  }, [currentUser]);

  useEffect(() => {
    // if (loading) return;
    fetchCreatedClasses();
  }, [currentUser]);

  useEffect(() => {
    fetchJoinedClasses();
  }, [currentUser]);

  const { subject } = useAuth();

  return (
    <div className="AppRouter">

      <Routes>
        <Route path="/login" element={<LogInform />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } >
          {/* <ProtectedRoute> */}
          <Route path="/" element={<InnerContent />}>
            <Route path="/" element={<Navigate replace to='home' />} />
            {/* <Route path="/home/:id*" element={<Subjects />} /> */}
            {/* path for the created classes */}
            {createdClassData.map((Classdata, index) => (
              <Route key={index} path={`/home/${Classdata.id}`} element={<Subjects data={Classdata} />} >
                {/* <Route path={`/home/${Classdata.id}/:id`}></Route> */}
              </Route>
              // <Route key={index} path={`/${Classdata.id}/${subjectdata.id}`} element={ <SubjectContent/>} />
            ))}
            {/* path for the created classes */}
            {joinedClassData.map((data, index) => (
              <Route key={index} path={`/home/${data.id}/`} element={<Subjects data={data} />} />
            ))}
            {/* path for the Subjects */}
            {subject.map((subjectdata, index) => (
              <Route key={index} path={`/${subjectdata.id}`} element={<SubjectContent data={subjectdata} />} />
            ))}

            <Route path="home" element={<MainHome />} />
            <Route path="chatroom" element={<ChatRoom />}>
              {/* <Route path="/chatroom" element={<ChatSpace />} /> */}
              {createdClassData.map((Classdata, index) => (
                <Route key={index} path={`/chatroom/${Classdata.id}`} element={<ChatSpace data={Classdata} />} />
              ))}
              {joinedClassData.map((data, index) => (
                <Route key={index} path={`/chatroom/${data.id}`} element={<ChatSpace data={data} />} />
              ))}
            </Route>
            <Route path="settings" element={<Settings />} />
            <Route path="todo" element={<TODO />} />
          </Route>
          {/* </ProtectedRoute> */}

        </Route>
        <Route path="/EmailVerification" element={
          <ProtectedRoute>
            <EmailVerification />
          </ProtectedRoute>
        } />
        <Route path="/UpdateuserProfile" element={
          <ProtectedRoute>
            <UpdateuserProfile />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}
