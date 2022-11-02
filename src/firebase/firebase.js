import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCYiVyNDcmydhPqWJb5C4el8-2MN4U5Jik",
  authDomain: "test-2fff9.firebaseapp.com",
  databaseURL:
    "https://test-2fff9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "test-2fff9",
  storageBucket: "test-2fff9.appspot.com",
  messagingSenderId: "626346150141",
  appId: "1:626346150141:web:80a28f036d5046da729694",
  measurementId: "G-5H19TSMCD9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

export const getFlights = new Promise((resolve, reject) => {
  onValue(ref(db, "/"), (snapshot) => {
    resolve(snapshot.val());
  });
});
