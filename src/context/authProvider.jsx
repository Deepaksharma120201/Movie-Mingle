import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { toast } from "react-toastify";
import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import PropTypes from "prop-types";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Functions
  const signup = async (name, email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Account created Successfully!");
    } catch (error) {
      toast.error(error.code.split("/")[1].split("-").join(" "));
    }
  };

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login Successfully!");
    } catch (error) {
      toast.error(error.code.split("/")[1].split("-").join(" "));
    }
  };

  function logout() {
    toast.success("Signout Successfully!");
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ login, signup, user, isLoading, logout }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside the AuthProvider");
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
