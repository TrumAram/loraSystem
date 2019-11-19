import * as firebase from 'firebase';

var firebaseConfig = {
   apiKey: "AIzaSyAQYAwzUPWDOMbhJ_jhuhzX_DqHPKaPp_4",
   authDomain: "lorasystem.firebaseapp.com",
   databaseURL: "https://lorasystem.firebaseio.com",
   projectId: "lorasystem",
   storageBucket: "lorasystem.appspot.com",
   messagingSenderId: "1084801288429",
   appId: "1:1084801288429:web:7b25aca3b5dccdc2e8e4e4",
   measurementId: "G-0MFPH5BCDW"
};

export const firebaseApp= firebase.initializeApp(firebaseConfig);
//---------------Firebase ---------------SDK Copy and paste these scripts into the bottom of your <body> tag
// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/7.1.0/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/7.1.0/firebase-analytics.js"></script>

// <script>
//   // Your web app's Firebase configuration
//   var firebaseConfig = {
//     apiKey: "AIzaSyAQYAwzUPWDOMbhJ_jhuhzX_DqHPKaPp_4",
//     authDomain: "lorasystem.firebaseapp.com",
//     databaseURL: "https://lorasystem.firebaseio.com",
//     projectId: "lorasystem",
//     storageBucket: "",
//     messagingSenderId: "1084801288429",
//     appId: "1:1084801288429:web:018bdf6985a72432e8e4e4",
//     measurementId: "G-WSK8DFHNZH"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
// </script>