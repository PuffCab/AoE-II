// 1. Import hook
import { createContext, useEffect, useState } from "react";
import { auth } from "../config";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

// 2. Create Context / Store

export const AuthContext = createContext();

// 3. Create provider
export const AuthContextProvider = (props) => {

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isUser, setIsUser] = useState(false)
  const redirectTo = useNavigate();

  const register = async (email, password) => {
    console.log("email, password", email, password);
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      console.log("userCredentials :>> ", userCredentials);

      redirectTo("/");

    } catch (error) {

      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("register error", error);
      setError(errorCode);
    }
  };

  const login = async (email, password) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      console.log("userCredentials :>> ", userCredentials);

      redirectTo("/");

    } catch (error) {

      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("login error", error);
      setError(errorCode);
    }
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("logged out");
        // Sign-out successful.
        redirectTo("/");
        
      })
      .catch((error) => {
        // An error happened.
      });
  };


  const checkIfUserIsLoggedIn = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        console.log("user is logged in");
        setUser(user);
        setIsUser(true)

      } else {
        // User is signed out
        // ...
        console.log("user is NOT logged in");
        setUser(null);
        setIsUser(false)
      }
    });
  };

  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, []);

  // 4. Move state and function

  return (
    <AuthContext.Provider value={{ user, setUser, register, login, logout, error, isUser }}>{props.children}</AuthContext.Provider>
  );
};
