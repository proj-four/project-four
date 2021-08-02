import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCgF8bHsMBloEvuth9cAwBeEFEO2j_Yw_I",
    authDomain: "project-4-56998.firebaseapp.com",
    projectId: "project-4-56998",
    storageBucket: "project-4-56998.appspot.com",
    messagingSenderId: "279390627100",
    appId: "1:279390627100:web:93de041939a80f2c5806d9"
    };

// Initialize Firebase
    firebase.initializeApp(firebaseConfig);



    export default firebase;