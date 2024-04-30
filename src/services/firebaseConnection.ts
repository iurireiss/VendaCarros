
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDhwZbusYEYuRGSH3cbaJ1vEOGkzt_bLNo",
  authDomain: "webcarros-53fe2.firebaseapp.com",
  projectId: "webcarros-53fe2",
  storageBucket: "webcarros-53fe2.appspot.com",
  messagingSenderId: "591294127900",
  appId: "1:591294127900:web:12348b13ca97ea9ce8a4d9"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth =getAuth(app);

const storage = getStorage(app)

export{db,auth,storage}