// Your web app's Firebase configuration

export const firebaseInit = () =>{

    var firebaseConfig = {
      apiKey: "AIzaSyCj_x3LWg677LeOR_z5wiTFhXs0lywH2-Q",
      authDomain: "app-guarderia.firebaseapp.com",
      databaseURL: "https://app-guarderia.firebaseio.com",
      projectId: "app-guarderia",
      storageBucket: "app-guarderia.appspot.com",
      messagingSenderId: "480779634470",
      appId: "1:480779634470:web:90020c6bb7e33f5e"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);


    // Initialize Cloud Firestore through Firebase
   return firebase.firestore();

}