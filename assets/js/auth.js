import { validateUser, validateNewUser } from './validation.js';
import { templateLogin } from './../views/templateLogin.js';
import { templateWall } from './../views/templateWall.js';
// creamos nuevo usuario
export const createNewUser = (newUserEmail,newUserPass,newUserName,newUserLastName,childName) => {
 //guardamos funcion que llama base de datos en variable para usarla mas abajo
  let db = firebase.firestore();
  //si usuario paso por validaciones
  if(validateNewUser(newUserEmail,newUserPass,newUserName,newUserLastName,childName)){
    //creamos nuevo usuario en firebase
    firebase.auth().createUserWithEmailAndPassword(newUserEmail, newUserPass)
     .then((doc_auth)=>{
      //guardamos uid de usuario en variable
       let uid = doc_auth.user.uid;
       console.log(uid);
       //aqui ocupamos varibale db para crear nueva collecion si aun no existe y un documento con datos de usuario dentro de la collecion
       // le daremos como numero de documento uid de usuario
        db.collection("users").doc(uid).set({
        email:newUserEmail,
        name:`${newUserName} ${newUserLastName}`,
        childname:childName,
        uid:uid
        }); 
      }).then(()=>{
           emailVerification();
           swal ( "¡Felicitaciones!" , "Hemos enviado un correo de verificación de cuenta." , "success" );
           console.log("Document written");
           window.location.hash = "";
            //salimos de la app para que usuario verifique su correo
          firebase.auth().signOut();
          templateLogin();  
        }).catch((error)=>{
              //console.error("Error adding document", error);
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(errorCode);
              if (errorCode === "auth/email-already-in-use"){
              swal ( "¡Advertencia!" , "Este correo ya se encuentra en uso." , "info");
              
              document.getElementById('signup-email').value = '';
              document.getElementById('signup-email').focus();
              }
      });
     
  }else{
     return "Error en la validación";
  }
}

//funcion para logearse si ya tienes cuenta
export const signIn = (userEmail,userPass) => {
  // si paso por validaciones
  if(validateUser(userEmail,userPass)){
    //llamamos funcion fb para logearse
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(userEmail,userPass)
    .then(()=>{
      //guardamos usuario en variable
      let user = firebase.auth().currentUser;
      //si email no esta verificado osea emailVerified es false
      if(!user.emailVerified){
        console.log(user.emailVerified);
        alert('correo no verificado');
        //no dejamos entrar en wall
        firebase.auth().signOut();
      }else{
        //si todo bien entra por fin
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
 
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider)
  .then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    let db = firebase.firestore();
    // aqui queremos obtener documentos desde firestore de collecion users que tirnrn como numero uid de usuario corriente
    db.collection('users').doc(user.uid).get().then(function(doc){
      // si documento existe solamente vamos a entrar en muro
       if (doc.exists) {
        alert("Has iniciado sesión con exito");
        window.location.hash = '#/wall';
       }else{
        //si no existe lo vamos a crear , le daremos como nuemro uid de usuario
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

// funcion observador que esta viendo si hay usurio logeado
export const observer=() =>{
  firebase.auth().onAuthStateChanged(function(user) {
//console.log(user)
if(user===null){
  // si user es null osea no hay usuario logeado no dejamos a pasar adelante, en muro
  console.log("No hay usuario");
  return  window.location.hash = '';
}
if (user.emailVerified) {
  // si user existe y tiene verificado su correo que pase
  //console.log(user.email)
  window.location.hash = '#/wall';
  // User is signed in.
}
 if (!user.emailVerified && window.location.hash != ''){
  //si derepente no esta verificado el correo y por alguna razon paso al muro lo redireccionamos al login
   console.log("No verificado, redireccionando a login")
   window.location.hash = '';
 }

  })
} 
// funcion para cerrar sesion
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

//verificacion de correo
function emailVerification() {
  let user = firebase.auth().currentUser;
  user.sendEmailVerification().then(function() {
    console.log("enviamos correo");
    // Update successful.
  }).catch(function(error) {
    console.log(error);
  })
}
