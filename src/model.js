import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

export class ModelHotel {
   constructor() {
      this.options = {
         method: 'GET',
         headers: {
            'x-rapidapi-key': 'ded04dc4a2msh36093ebc1f742f8p19eb3ajsnec6e5dfcc716',
            'x-rapidapi-host': 'tripadvisor-scraper.p.rapidapi.com'
         }
      }
   }

   async getHotels(location) {
      try {
         console.log(location);
         const response = await fetch(`temp.json`);

         if (!response.ok) throw new Error(`Something went wrong ${response.statusText}`);

         const { results } = await response.json();
         return results;
      } catch (error) {
         alert(error);
      }
   }
}

export class ModelDB {
   constructor() {
      this.firebaseApp = initializeApp({
         apiKey: "AIzaSyDRWNTKDOG2ZGqAY2WM4fY_KcZjK49YnF4",
         authDomain: "sign-in-and-log-in-6139f.firebaseapp.com",
         databaseURL: "https://sign-in-and-log-in-6139f-default-rtdb.firebaseio.com",
         projectId: "sign-in-and-log-in-6139f",
         storageBucket: "sign-in-and-log-in-6139f.appspot.com",
         messagingSenderId: "271538485115",
         appId: "1:271538485115:web:468f2b24b5bb9122112fde"
      });
      this.auth = getAuth(this.firebaseApp);
   }

   validateEmail(email) {
      return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
   }

   validatePassword(password) {
      return password.length > 5;
   }

   async signIn(email, password) {
      const isValidEmail = this.validateEmail(email);
      const isValidPassword = this.validatePassword(password);

      if (!isValidEmail) {
         alert('Invalid email');
         return false;
      }

      if (!isValidPassword) {
         alert('Password must contain more than 6 characters');
         return false;
      }

      let isSuccessful;

      await signInWithEmailAndPassword(this.auth, email, password).
         then(() => {
            isSuccessful = true;
            alert("Signed in successfully")
         }).
         catch(() => {
            isSuccessful = false;
            alert('Incorrect email or password');
         });

      return isSuccessful;
   }

   async signOut() {
      let isSuccessful = false;

      await signOut(this.auth).
         then(() => {
            isSuccessful = true;
            alert('Sign out successful');
         }).
         catch((error) => alert('Error occurred' + error.message));

      return isSuccessful;
   }

   async createUser(email, password) {
      const isValidEmail = this.validateEmail(email);
      const isValidPassword = this.validatePassword(password);

      if (!isValidEmail) {
         alert('Invalid email');
         return false;
      }

      if (!isValidPassword) {
         alert('Password must contain more than 6 characters');
         return false;
      }

      let isSuccessful;

      await createUserWithEmailAndPassword(this.auth, email, password).
         then(() => {
            isSuccessful = true;
            alert("Account created")
         }).
         catch((error) => {
            isSuccessful = false;
            alert(error.code, error.message);
         });

      return isSuccessful;
   }
}