// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
    // apiKey: "AIzaSyBWBNlz8NesgrgI1h8Xwa-g3GxC2xU45GU",
    // authDomain: "ecovision-3c23d.firebaseapp.com",
    // projectId: "ecovision-3c23d",
    // storageBucket: "ecovision-3c23d.firebasestorage.app",
    // messagingSenderId: "91257610604",
    // appId: "1:91257610604:web:6102a7b7b067957cf1d349"
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);

// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';

// // Your Firebase Config
// const firebaseConfig = {
//     apiKey: "AIzaSyBWBNlz8NesgrgI1h8Xwa-g3GxC2xU45GU",
//     authDomain: "ecovision-3c23d.firebaseapp.com",
//     projectId: "ecovision-3c23d",
//     storageBucket: "ecovision-3c23d.firebasestorage.app",
//     messagingSenderId: "91257610604",
//     appId: "1:91257610604:web:6102a7b7b067957cf1d349"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app); // Firestore database

// export { auth, db };

// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
// import { getDatabase, ref, onValue } from 'firebase/database';

// // Your Firebase Config
// const firebaseConfig = {
//     apiKey: "AIzaSyBWBNlz8NesgrgI1h8Xwa-g3GxC2xU45GU",
//     authDomain: "ecovision-3c23d.firebaseapp.com",
//     databaseURL: "https://ecovision-3c23d-default-rtdb.firebaseio.com/",
//     projectId: "ecovision-3c23d",
//     storageBucket: "ecovision-3c23d.firebasestorage.app",
//     messagingSenderId: "91257610604",
//     appId: "1:91257610604:web:6102a7b7b067957cf1d349"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app); // Firestore database
// const database = getDatabase(app);

// export { database, ref, onValue };
// export { auth, db };


import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBWBNlz8NesgrgI1h8Xwa-g3GxC2xU45GU",
    authDomain: "ecovision-3c23d.firebaseapp.com",
    databaseURL: "https://ecovision-3c23d-default-rtdb.firebaseio.com/",
    projectId: "ecovision-3c23d",
    storageBucket: "ecovision-3c23d.firebasestorage.app",
    messagingSenderId: "91257610604",
    appId: "1:91257610604:web:6102a7b7b067957cf1d349"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const db = getFirestore(app); // Firestore database
export { app, database, ref, onValue, auth, db };

