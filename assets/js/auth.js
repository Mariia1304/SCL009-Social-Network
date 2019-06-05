import { validateNewUser } from './validation.js';
import { templateLogin } from './../views/templateLogin.js';
import { templateHome } from './../views/templateHome.js';

export const createNewUser = (newUserEmail,newUserPass) => {
  if(validateNewUser(newUserEmail,newUserPass)){
    firebase.auth().createUserWithEmailAndPassword(newUserEmail, newUserPass)
    .then(()=>{
      emailVerification();
      swal ( "¡Felicitaciones!" , " Hemos enviado un correo de verificación de cuenta." , "success" );
      //alert("Hemos enviado un correo de verificación de cuenta.");
      window.location.hash = "";
      firebase.auth().signOut();
      templateLogin();
      
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      if (errorCode === "auth/email-already-in-use"){
        swal ( "¡Advertencia!" , "Este correo ya se encuentra en uso." , "info");
        //alert("Este correo ya ha sido registrado");
        document.getElementById('signup-email').value = '';
        document.getElementById('signup-email').focus();
      }
      // ...
    });
  }else{
     return "Error en la validación";
  }
}


export const signIn = (email,pass) => {
  if(validateNewUser(email,pass)){
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(email,pass)
    .then(()=>{
      swal ( "¡Bienvenid@!" , "Has iniciado sesión con exito." , "success" );
       
      window.location.hash='#/home';
    })
    .catch((error)=>{
       // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error.message);
    })
  }else{
     swal ( "¡Advertencia!" , "Error en el ingreso del usuario." , "error");
      
  }
}


// export const authGoogle = () => {
//     var provider = new firebase.auth.GoogleAuthProvider();
//     authentication(provider);
//   }
//   const authentication = (provider) => {
//     firebase.auth().signInWithRedirect(provider);
//     firebase.auth().getRedirectResult().then(function(result) {
//       if (result.credential) {
//         // This gives you a Google Access Token. You can use it to access the Google API.
//         var token = result.credential.accessToken;
//         // ...
//       }
//       // The signed-in user info.
//       var user = result.user;
//       swal ( "¡Bienvenid@!" , "Has iniciado sesión con exito." , "success" );
//        alert("Has iniciado sesión con exito");
//       window.location.hash='#/home';
//     }).catch(function(error) {
//       // Handle Errors here.
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       // The email of the user's account used.
//       var email = error.email;
//       // The firebase.auth.AuthCredential type that was used.
//       var credential = error.credential;
//       // ...
//     });
//   }


/*Función Observador, que verifica que el usuario se encuentra logueado*/
export const observer = () => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('existe usuario logueado')
      if(user.emailVerified){
        console.log('verificado');
      }
    } else {
      console.log('no existe usuario logueado');
      window.location.hash="";
      window.onhashchange ="";
      templateLogin();
    }
  });
}

/*Función signOut(), que sirve para que cuando el usuario cierre sesión, lo dirigia a la pantalla de inicio*/

export const signOut = () =>{
  firebase.auth().signOut()
  .then(function() {
    swal("Chao!");
    window.location.hash='';
  }).catch(function(error) {
    // An error happened.
  });
}


function emailVerification() {
  let user = firebase.auth().currentUser;
  user.sendEmailVerification().then(function() {
    console.log("enviamos correo");
    // Update successful.
  }).catch(function(error) {
    console.log(error);
  })
}
// firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
//  .then(function() {
//    // The link was successfully sent. Inform the user.
//    // Save the email locally so you don't need to ask the user for it again
//    // if they open the link on the same device.
//    window.localStorage.setItem('emailForSignIn', email);
//  })
//  .catch(function(error) {
//    // Some error occurred, you can inspect the code: error.code
//  });