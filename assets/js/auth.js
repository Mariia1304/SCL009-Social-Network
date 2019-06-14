import { validateUser, validateNewUser } from './validation.js';
import { templateLogin } from './../views/templateLogin.js';
import { templateWall } from './../views/templateWall.js';

export const createNewUser = (newUserEmail,newUserPass,newUserName,newUserLastName,childName) => {
   
  if(validateNewUser(newUserEmail,newUserPass,newUserName,newUserLastName,childName)){
    firebase.auth().createUserWithEmailAndPassword(newUserEmail, newUserPass)
     .then((doc)=>{
       let db = firebase.firestore();
       let uid = doc.user.uid;
        db.collection("users").doc(uid).set({
        email:newUserEmail,
        name:newUserName,
        lastname:newUserLastName,
        childname:childName,
        uid:uid
        }).then(function(docRef){
          console.log("Document written with ID:", docRef.id);
        }).catch(function(error){
          console.error("Error adding document", error);
        })  
       
      })
     .then(()=>{
      
      emailVerification();
      swal ( "¡Felicitaciones!" , "Hemos enviado un correo de verificación de cuenta." , "success" );
      
      window.location.hash = "";
      firebase.auth().signOut();
      templateLogin();      
      })
      .catch((error)=>{
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


export const signIn = (userEmail,userPass) => {
  if(validateUser(userEmail,userPass)){
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(userEmail,userPass)
    .then(()=>{
      let user = firebase.auth().currentUser;
      if(!user.emailVerified){
        console.log(user.emailVerified);
        alert('correo no verificado');
        firebase.auth().signOut();
      }else{
      //swal ( "¡Bienvenid@!" , "Has iniciado sesión con exito." , "success" );
      templateWall();
      window.location.hash='#/wall';}
    })
    .catch((error)=>{
       // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error.code);
      if(errorCode === "auth/wrong-password"){
        swal("¡Error!" , "Contraseña incorrecta!" , "error")
      }
      if(errorCode ==="auth/user-not-found"){
        swal("¡Error!" , "Usuario no registrado!" , "error");
      }
    })
  }else{
     swal ( "¡Advertencia!" , "Error en el ingreso del usuario." , "error");
      
  }
}


export const authGoogle = () =>{
  
  /*Crea una instancia del objeto del proveedor de Google*/
  var provider = new firebase.auth.GoogleAuthProvider();
  /*Autentica con Firebase a través del objeto del proveedor de Google.*/
  firebase.auth().signInWithPopup(provider)
  .then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    let db = firebase.firestore();
    db.collection('users').doc(user.uid).get().then(function(doc){
       if (doc.exists) {
        alert("Has iniciado sesión con exito");
        window.location.hash = '#/wall';
       }else{
        db.collection("users").doc(user.uid).set({
          email:user.email,
          name:user.displayName,
          photo:user.photoURL,
          uid: user.uid
        })
        alert("Has iniciado sesión con exito");
        window.location.hash='#/wall';
       }
    });
    // ...
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
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
//                // ...
//       }

//       //The signed-in user info.
//       var user = result.user;
//       window.location.hash = '#/wall';
//      // observer();
      
     
//       //swal ( "¡Bienvenid@!" , "Has iniciado sesión con exito." , "success" );
//       //console.log(result.user);
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
// export const observer = () => {
//   firebase.auth().onAuthStateChanged(function(user){
//     console.log(user);
//     if(user===null){
//       console.log("No hay usuario");
//       window.location.hash = '';}
    
//     if(user.emailVerified){
//       console.log(user.email);
//       window.location.hash = '#/wall';
//       window.location.hash != '/#';
//       window.location.hash != '';
//       // User is signed in.
//     }
//      if (!user.emailVerified && window.location.hash != '' && window.location.hash != '#/home'){
//        console.log("No verificado, redireccionando a home")
//        window.location.hash = '';
//     }
//   });
// }
export const observer=() =>{
  firebase.auth().onAuthStateChanged(function(user) {
//console.log(user)
if(user===null){
  console.log("No hay usuario")
  return  window.location.hash = '';
}
if (user.emailVerified) {
  //console.log(user.email)
  window.location.hash = '#/wall';
  // User is signed in.
}
 if (!user.emailVerified && window.location.hash != '' && window.location.hash != '#/home'){
   console.log("No verificado, redireccionando a home")
   window.location.hash = '';
 }

  })
} 



/*Función signOut(), que sirve para que cuando el usuario cierre sesión, lo dirigia a la pantalla de inicio*/

export const signOut = () =>{
   if(confirm("¿Realmente deseas cerrar sesión?")){
  firebase.auth().signOut()
  .then(function() {
    //swal("Chao!");
    window.location.hash='';
  }).catch(function(error) {
    // An error happened.
  });
  }
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