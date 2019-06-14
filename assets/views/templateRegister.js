import { validateEmail } from "../js/validation.js";
import { createNewUser } from "../js/auth.js";
import { templateLogin } from "./templateLogin.js";
import { footerPosition } from "../js/footerposition.js";;

export const templateRegister = () => {

	document.getElementById('root').innerHTML = `
	<header id="templatelogin">
		<div class="logo row">
			<div class="col-12"> 
				<center>
					<img src="assets/img/mama-sabe2.png" alt="logo">
			   	</center>
			</div>
		</div>
	</header>
	<div class="row templateregister">											
		<div class="col-12">
			<input  id="signup-email" type="email" placeholder="email">
		</div>
		<p class="col-12 error" id="email-error">
		</p>
		<div id="password" class="col-12">
			<input type="password" placeholder="contraseña" id="signup-pass">	
			
		</div>
		<div class="col-12">
			<input type="password" placeholder="confirma contraseña" id="signup-confirm">
		</div>
		<p class="col-12 error" id="pass-error">
		</p>
		<div class="col-12">
			<input  id="user-name" type="text" placeholder="nombre">
		</div>
		<p class="col-12 error" id="name-error">
		</p>
		<div class="col-12">
			<input  id="user-lastname" type="text" placeholder="apellido">
		</div>
		<p class="col-12 error" id="lastname-error">
		</p>
		<div class="col-12">
			<input  id="child-name" type="text" placeholder="nombre de hij@">
		</div>
		<p class="col-12 error" id="childname-error">
		<div  class="col-12">
			<input type="button" id="submit" value="Enviar">
		</div>
		<div class="col-12">
			<input  type="button" id="back" value="Volver">
		</div>
	</div>
	<footer id="footer">
		<p class="col-12">Todos derechos reservados &copy MamaSabeApp</p>
	</footer>
												`;
	footerPosition();
	document.getElementById('submit').addEventListener('click', ()=>{
		let newUserEmail = document.getElementById('signup-email').value;
		let newUserPass = document.getElementById('signup-pass').value;
		let newUserPassConfirm = document.getElementById('signup-confirm').value;
		let newUserName = document.getElementById('user-name').value;
		let newUserLastName = document.getElementById('user-lastname').value;
		let childName = document.getElementById('child-name').value;
		
           //validacion de dom:
           if(newUserPass !== newUserPassConfirm){
           	document.getElementById('pass-error').style.display = "block";
           	document.getElementById('pass-error').innerHTML = "Contraseñas no coinciden :(";
           	document.getElementById('signup-pass').value = '';
           	document.getElementById('signup-confirm').value ='';
           	document.getElementById('signup-pass').focus();
           }else{
           	 document.getElementById('pass-error').style.display = "none";
           	 if(newUserPass === "" || newUserPass.length<6){
	        	document.getElementById('pass-error').style.display = "block";
	            document.getElementById('pass-error').innerHTML=`Debes ingresar una contraseña con minimo 6 caracteres.`;
	        	document.getElementById('signup-pass').focus();
	        }else{
	        	document.getElementById('pass-error').style.display = "none";
	            
	        }
           	 if(newUserEmail=== "" || !validateEmail(newUserEmail)){
        	document.getElementById('email-error').style.display = "block";
            document.getElementById('email-error').innerHTML="Debes ingresar un correo válido.";
	        document.getElementById('signup-email').value = '';
	        document.getElementById('signup-email').focus();
	        }else{
	        	document.getElementById('email-error').style.display = "none";

	           	if(newUserName===""){
	        	document.getElementById('name-error').style.display = "block";
	        	document.getElementById('name-error').innerHTML = "Debes ingresar tu nombre";
	        	// document.getElementById('user-name').focus();
		       	}else{
		       		document.getElementById('name-error').style.display = "none";
		       		if(newUserLastName === ""){
		       			document.getElementById('lastname-error').style.display="block";
		       			document.getElementById('lastname-error').innerHTML = "Debes ingresar tu apellido";
		       			// document.getElementById('user-lastname').focus();
		       		}else{
		       			document.getElementById('lastname-error').style.display = "none";
		       			if(childName === ""){
		       			document.getElementById('childname-error').style.display="block";
		       			document.getElementById('childname-error').innerHTML = "Debes ingresar nombre de tu hij@";	
		       			}else{
		       				document.getElementById('childname-error').style.display="none";
		       				createNewUser(newUserEmail,newUserPass,newUserName,newUserLastName,childName);
		       			}
		       		}
	        	}
	        }
	        
        }
               
	})	

	document.getElementById('back').addEventListener('click', ()=>{
		templateLogin();
		window.location.hash = "";
	}) 										
}