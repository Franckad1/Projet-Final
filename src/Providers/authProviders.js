import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { auth } from "../Config/FirebaseConfig";
export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Success
    })
    .catch((error) => {
      console.error("Firebase registration error:", error.code, error.message);
      throw new Error(error);
    });
};

export const doSignInWithEmailAndPassword = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Success
    })
    .catch((error) => {
      console.error("Firebase registration error:", error.code, error.message);
      throw new Error(error);
    });
};
export const doSignWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  return await signInWithPopup(auth, provider);
};

export const doSignOut = () => {
  return auth.signOut();
};
