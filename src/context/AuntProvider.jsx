import React, {createContext , useState} from 'react'
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithPopup } from "firebase/auth";
import app from "../firebase/firebase.config"

export const AuntContext = createContext();
const AuntProvider = ({children}) => {
  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth(app);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // create and accont
    const createUser = (email, password) => {
      return createUserWithEmailAndPassword(auth, email, password)
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
    }

    // signup with Gmail
    const sighUpWithGmail = () => {
      return signInWithPopup(auth, googleProvider)
    }

    // login using email and password
    const authinfo = {
        user,
        createUser,
        sighUpWithGmail,
    }
  return (
    <AuntContext.Provider value={authinfo}>
        {children}
    </AuntContext.Provider>
  )
}

export default AuntProvider