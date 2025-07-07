import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getDocs,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../Config/FirebaseConfig";

export default {
  async addData(data, path) {
    console.log("in");

    try {
      const docRef = await addDoc(collection(db, path), data);
      console.log("Document written with success");
      return docRef.id;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  },

  async getAllData(path) {
    const querySnapshot = await getDocs(collection(db, path));
    const list = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        data: doc.data(),
      };
    });
    return list;
  },
  async setData(data, path, id) {
    const fragmentRef = doc(db, path, id);
    await updateDoc(fragmentRef, data);
  },
  async deleteData(path, id) {
    await deleteDoc(doc(db, path, id));
  },
  async updateData(data, path, id) {
    const fragmentRef = doc(db, path, id);
    try {
      await setDoc(fragmentRef, data, { merge: true });
      console.log("Document updated");
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  },
};
