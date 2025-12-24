/* ========= Firebase Init ========= */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
 getAuth,
 signInWithEmailAndPassword,
 sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
 getFirestore,
 doc, getDoc, setDoc, updateDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB4utzAzJiMb-R6zxQ3ihGl31mz0_bdR3I",
  authDomain: "mvgrce-permission-portal.firebaseapp.com",
  projectId: "mvgrce-permission-portal",
  storageBucket: "mvgrce-permission-portal.firebasestorage.app",
  messagingSenderId: "122416613856",
  appId: "1:122416613856:web:59007400f4298a73ff4385",
  measurementId: "G-GQDB3D0XXC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

/* ========= AUTH + ROLE RESOLUTION ========= */
export async function loginUser(email, password){
 const cred = await signInWithEmailAndPassword(auth, email, password);
 const uid = cred.user.uid;

 const ref = doc(db,"users",uid);
 const snap = await getDoc(ref);
 if(!snap.exists()) throw "NOT_WHITELISTED";

 const u = snap.data();

 if(u.disabled) throw "ACCOUNT_DISABLED";
 if(u.firstLogin){
   sessionStorage.setItem("firstLogin","true");
 }else{
   sessionStorage.setItem("firstLogin","false");
 }

 sessionStorage.setItem("loggedIn","true");
 sessionStorage.setItem("role",u.role);
 sessionStorage.setItem("uid",uid);

 return u.role;
}

/* ========= USER DOCUMENT CREATION (ADMIN ONLY) ========= */
export async function createUserDoc(uid,data){
 await setDoc(doc(db,"users",uid),{
  email:data.email,
  role:data.role,              // student | teacher | hod | admin
  department:data.department||null,
  approved:data.approved||false,
  firstLogin:true,
  disabled:false,
  createdAt:serverTimestamp()
 });
}
