
import firebase from "firebase"; require("@firebase/firestore");
var firebaseConfig = {
    apiKey: "AIzaSyDkDKGQPJVevAOu_Zhlg93ugAMis3BtZv0",
    authDomain: "barterapp-b8388.firebaseapp.com",
    projectId: "barterapp-b8388",
    storageBucket: "barterapp-b8388.appspot.com",
    messagingSenderId: "48241483645",
    appId: "1:48241483645:web:072ce2fadf411c36d8b614"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();
