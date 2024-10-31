import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8JEbLux-HMemZc5Etr51f9EYW-e1j3r8",
  authDomain: "e-cart-52295.firebaseapp.com",
  databaseURL: "https://e-cart-52295-default-rtdb.firebaseio.com",
  projectId: "e-cart-52295",
  storageBucket: "e-cart-52295.appspot.com",
  messagingSenderId: "500208609525",
  appId: "1:500208609525:web:44ad053fd6c08952d3fdbc",
  measurementId: "G-J7VBXRDM3N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to display messages
function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(() => {
    messageDiv.style.opacity = 0;
  }, 5000);
}

// Event listener for sign-up and sign-in buttons
document.addEventListener('DOMContentLoaded', function() {
  const signUpButton = document.getElementById('signUpButton');
  const signInButton = document.getElementById('signInButton');
  const submitSignUp = document.getElementById('submitSignUp');
  const submitSignIn = document.getElementById('submitSignIn');

  const signUpContainer = document.getElementById('signup');
  const signInContainer = document.getElementById('signIn');

  // Toggle to Sign-Up form
  signUpButton.addEventListener('click', function() {
    signUpContainer.style.display = 'block';
    signInContainer.style.display = 'none';
  });

  // Toggle to Sign-In form
  signInButton.addEventListener('click', function() {
    signInContainer.style.display = 'block';
    signUpContainer.style.display = 'none';
  });

  // Sign-Up logic with Firebase
  submitSignUp.addEventListener('click', async (event) => {
    event.preventDefault();

    const fName = document.getElementById('fName').value;
    const lName = document.getElementById('lName').value;
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const messageDiv = document.getElementById('signUpMessage');

    messageDiv.style.display = 'block';
    messageDiv.textContent = 'Registering...';

    try {
      // Firebase Auth - Create user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Firebase Firestore - Store user data
      await setDoc(doc(db, "users", user.uid), {
        firstName: fName,
        lastName: lName,
        email: email
      });

      messageDiv.textContent = 'Registration successful!';
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 3000);
      
    } catch (error) {
      messageDiv.textContent = 'Error: ' + error.message;
    }
  });

  // Sign-In logic with Firebase
  submitSignIn.addEventListener('click', async (event) => {
    event.preventDefault();

    const email = document.getElementById('sEmail').value;
    const password = document.getElementById('sPassword').value;
    const signInMessageDiv = document.getElementById('signInMessage');

    signInMessageDiv.style.display = 'block';
    signInMessageDiv.textContent = 'Signing in...';

    try {
      // Firebase Auth - Sign in
      await signInWithEmailAndPassword(auth, email, password);
      signInMessageDiv.textContent = 'Sign-In successful!';

      // Redirect to another page after sign-in
      setTimeout(() => {
        window.location.href = 'index.html';  // Adjust URL as needed
      }, 3000);

    } catch (error) {
      signInMessageDiv.textContent = 'Error: ' + error.message;
    }
  });
});
const signIn=document.getElementById('submitSignIn');
signIn.addEventListener('click',(event)=>{
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const auth=getAuth();

  signInWithEmailAndPassword(auth,email ,password)
  .then((userCredential)=>{
    showMessage('login successful','signInMessage');
    const user = userCredential.user;
    localStorage.setItem('loggedInUserId',user.uid);
    window.location.href='index.html';
    
  })
  .catch((error)=>
  {
    const errorCode=error.code;
    if(errorCode==='auth/invalid-credential'){
      showMessage('Incorrect email or password','signInMessage');

    }
    else{
      showMessage('account does not exist','signInMessage');
    }
  })
})
