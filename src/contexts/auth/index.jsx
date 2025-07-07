import {
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../Config/FirebaseConfig";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1️⃣ Définir la session volatile
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        // 2️⃣ Écouter l'état de connexion
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
      })
      .catch((error) => {
        console.error("Erreur de persistance Firebase :", error);
        setLoading(false);
      });
  }, []);

  async function initializeUser(user) {
    if (user) {
      setCurrentUser({ ...user });
      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  }

  const value = { currentUser, userLoggedIn, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
