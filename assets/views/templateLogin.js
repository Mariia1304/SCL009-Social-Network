import { signIn, authGoogle, observer } from "./../js/auth.js";
import { templateWall } from "./templateWall.js";
import { validateEmail } from "../js/validation.js";
import { templateRegister } from "./templateRegister.js" ;
import { footerPosition } from "/app.js";


export const templateLogin = () =>{
observer();
	document.getElementById('root').innerHTML =
		 /*html*/ `
		<header id="templatelogin">
			<div class="row">
				<div class="col-12"> 
					<center>
						<img src="assets/img/mama-sabe2.png" alt="logo">
				   	</center>
				</div>			
			</div>
		</header>
		<main>
		<div class="row templatelogin">
			<p class="col-12 msge">
				<i class="msge">Conectate con la guarderia de tu hij@</i>
			</p>
			<p class="col-12 msge" id="msge1">Si tienes cuenta accede aquí:</p>
			<div class="col-12">
				<input  id="txt-email" type="email" placeholder="email">
			</div>
			<p class="col-12 error" id="emailerror"></p>
			<div class="col-12">
				<input type="password" placeholder="contraseña" id="txt-pass">
			</div>
			<p class="col-12 error" id="passerror"></p>
			<div class="col-12">	
				<input type="button" id="login" value="Iniciar sesión">
			</div>
			<p class="col-12 msge" id="msge2">Acceso con cuenta Google:</p>
			<div class="col-12">
				<input type="button" id="login-google" value="Acceder con Google">
			</div>
			<p class="col-12 msge" id="msge3">Todavía no tienes cuenta?</p>
			<div class="col-12">
				<input type="button" id="sign-up" value="Registrarse">
			</div>
		</div>
		</main>
		
		<footer id="footer">
		<p class="col-12">Todos derechos reservados &copy MamaSabeApp</p>
		</footer>
		`;
		footerPosition();
	
	document.getElementById('login').addEventListener('click', () => {
		let userEmail = document.getElementById('txt-email').value;
		let userPass = document.getElementById('txt-pass').value;
		
		 /*validacio en dom*/
		const emailerror = document.getElementById('emailerror');
		const passerror = document.getElementById('passerror');
        if(userEmail==="" || !validateEmail(userEmail)){
        	emailerror.style.display = "block";
            emailerror.innerHTML="Debes ingresar un correo válido.";
        }else{
        	emailerror.style.display = "none";
            emailerror.innerHTML='';
             if(userPass==="" || userPass.length<6){
	        	passerror.style.display = "block";
	            passerror.innerHTML=`Debes ingresar una contraseña con minimo 6 caracteres.`;
	        }else{
	        	passerror.style.display = "none";
	            passerror.innerHTML='';
	            signIn(userEmail,userPass);
	        }
        }
        
       
		
       
	});

	 document.getElementById('login-google').addEventListener('click',()=>{
        authGoogle();

	});
	  document.getElementById('sign-up').addEventListener('click', ()=>{
	  	templateRegister();
	  	window.location.hash = '#/register';

	});
}

