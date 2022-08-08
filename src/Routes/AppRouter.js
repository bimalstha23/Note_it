import React,{useEffect,useState} from 'react';
import { LogInform } from '../files/userAuthentication/Sign_in.js';
import { SignUp } from '../files/userAuthentication/Sign_up.js';
import { Home } from '../files/DashBoard/Home.js';
import { ForgotPassword } from '../files/userAuthentication/ForgotPassword.js';
import { Routes, Route } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import { ProtectedRoute } from './ProtectedRoute.js';
import { UpdateuserProfile } from '../files/userAuthentication/UpdateuserProfile.js';
import { EmailVerification } from '../files/userAuthentication/EmailVerification.js';
import { InnerContent } from '../files/DashBoard/DashBoardComponents/InnerContent.js';
import { MainHome } from '../files/DashBoard/DashBoardComponents/HomeContainer/MainHome.js';
import { ChatRoom } from '../files/DashBoard/DashBoardComponents/ChatRoom.js';
import { Navigate } from 'react-router-dom';
import { Subjects } from '../files/DashBoard/Classes/Subjects/Subjects.js';
import {SubjectContent} from '../files/DashBoard/Classes/Subjects/SubjectContent.js';
import {useAuth} from '../Contexts/AuthContext';
import { collection, query, onSnapshot } from 'firebase/firestore'
import {db} from '../utils/firebaseDB';


export function AppRouter() {
  const [createdClassData, setCreatedClassData] = useState([]);
  const[joinedClassData, setJoinedClassData] = useState([]);
  const {currentUser} = useAuth();
  function fetchCreatedClasses() {
      try {
          const q = query(collection(db, 'CreatedClass', currentUser.email, 'Classes'));
          const unSubscribe = onSnapshot(q, (querySnapshot) => {
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
          const unSubscribe = onSnapshot(q, (querySnapshot) => {
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
  } ,[currentUser]);

const {subject} = useAuth();

  return (
    <div className="AppRouter">
      <Container>
        <Grid>
          <Grid item>
            <Routes>
              <Route path="/login" element={<LogInform />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/ForgotPassword" element={<ForgotPassword />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } >
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
                  <Route path="chatroom" element={<ChatRoom />} />
                </Route>
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
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
