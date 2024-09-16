import React, { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
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
    return signInWithPopup(auth, googleProvider);
  };

  // login using email and password
  const login = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // laogout
  const logout = () => {
    return signOut(auth);
  };

  // update profile
  const updateProfileUser = ({name, photoURL}) => {
     return updateProfile(auth.currentUser, { 
      displayName: name, photoURL: photoURL
    });
  };

  // check sign-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false)
      } else {
        // User is signed out
        // ...
      }
    });
    return () => {
      return unsubscribe();
    }
  },[])
  const authinfo = {
    user,
    createUser,
    sighUpWithGmail,
    login,
    logout,
    updateProfileUser,
  };
  return (
    <AuntContext.Provider value={authinfo}>{children}</AuntContext.Provider>
  );
};

export default AuntProvider;