import firebase from "firebase";
import "firebase/auth"


const app = firebase.initializeApp({
    apiKey: "AIzaSyAyCTAklqSJjv4zfamSvr27JfFT8x9FEdU",
    authDomain: "ll-orders.firebaseapp.com",
    databaseURL: "https://ll-orders-default-rtdb.firebaseio.com",
    projectId: "ll-orders",
    storageBucket: "ll-orders.appspot.com",
    messagingSenderId: "944764105169",
    appId: "944764105169:web:5c873ff507b8154b1ff0f04",
    measurementId: "G-XN9Z4RTB35"
});

export const auth = app.auth();
export default app;