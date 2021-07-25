import firebase from 'firebase/app';
import 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAWK0-ZR5vl0BwHWp44kxEVB8GlHtUDcZw",
    authDomain: "weblreact.firebaseapp.com",
    projectId: "weblreact",
    storageBucket: "weblreact.appspot.com",
    messagingSenderId: "744823622795",
    appId: "1:744823622795:web:32c5e8a4922f276c5ad88e",
    measurementId: "G-LZ3ZVQ0K3D"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage };