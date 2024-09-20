import React, { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuntContext = createContext();
const AuntProvider = ({ children }) => {
  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // create and accont
  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
    // .then((userCredential) => {
    //   // Signed up
    //   const user = userCredential.user;
    //   // ...
    // })
    // .catch((error) => {
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   // ..
    // });
  };

  // signup with Gmail
  const sighUpWithGmail = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider);
  };

  // login using email and password
  const login = (email, password) => {
    
    return signInWithEmailAndPassword(auth, email, password);
  };

  // laogout
  const logout = () => {

    return signOut(auth);
  };

  // update profile
  const updateProfileUser = (name, photoURL) => {
     return updateProfile(auth.currentUser, { 
      displayName: name, photoURL: photoURL
    });
  };

  // check sign-in user
  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, currentUser =>{
          // console.log(currentUser);
          setUser(currentUser);
          setLoading(false);
      });

      return () =>{
          return unsubscribe();
      }
  }, [])
  const authinfo = {
    user,
    createUser,
    sighUpWithGmail,
    login,
    logout,
    updateProfileUser,
    loading,
  };
  return (
    <AuntContext.Provider value={authinfo}>{children}</AuntContext.Provider>
  );
};

export default AuntProvider;
