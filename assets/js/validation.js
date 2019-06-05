//Función que valida el correo
export const validateEmail = (newUserEmail)=>{
  /*expresión regular que simula el patron de búsqueda del correo electrónico*/
  let regEx = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
  return regEx.test(newUserEmail);
}
//funcion que valida si los datos de nuevo usario ne estan vacios y email es valido
export const validateNewUser = (newUserEmail,newUserPass) => {
  if(!validateEmail(newUserEmail) || newUserEmail ==="" || newUserPass ==="" || newUserPass.length<6){
    return false;
  }else{
    return true;
  }
}

