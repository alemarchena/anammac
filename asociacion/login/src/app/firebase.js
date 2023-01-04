
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

  import { getAuth } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
  
  const firebaseConfig = {
    apiKey: "AIzaSyAjEu95TWg5DxVeOzJrh4i8FYlfFU6UFI4",
    authDomain: "atletismoptvg.firebaseapp.com",
    projectId: "atletismoptvg",
    storageBucket: "atletismoptvg.appspot.com",
    messagingSenderId: "965241151825",
    appId: "1:965241151825:web:59da91ebf75bd0bb17b370",
    measurementId: "G-XPX40TW2FZ"
  };

  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  export const analytics = getAnalytics(app);
  export const auth = getAuth(app);
