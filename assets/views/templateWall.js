import { signOut, observer } from './../js/auth.js';
import { templateProfile } from './templateProfile.js';
import { changeClass } from './../js/menu.js';
import { createPost, readPost, deletePost, editPost } from './../js/data.js';
export const templateWall = () =>{
	observer();
	document.getElementById('root').innerHTML = `
		<header id="wall">
			<a href="#">
				<img  src="assets/img/mama-sabe2.png" alt="logo">
			</a>			
			<nav id="site-nav" class="site-nav">
				<ul>
					<li>
						<a href="" id="btn-profile">
							perfil
						</a>
					</li>
					<li>
						<a href="">
							tabla de tía
						</a>
					</li>
					<li>
						<a href="">
							tabla de directora
						</a>
					</li>
					<li>
						<a href="">
							tabla de papás
						</a>
					</li>
					<li>
						<a href="" id="btn-logout">
							cerrar sesión
						</a>
					</li>
				</ul>
			</nav>
			<div id="menu-toggle" class="menu-toggle">
				<div class="hamburger"></div>
			</div>
		</header>
		<main id="main">
			<div class="row templatewall">
				<div class="col-12">
					<textarea placeholder="escribe algo.." name=""  id="text-post"></textarea>
					
					<i id="submit" class="fas fa-paper-plane"></i>
					<p id="post-error" class="error"></p>
				</div>
			</div>
			<div id="posts" class="row templatewall">				
			</div>			
		</main>
														`
	changeClass();
	readPost();
	
	document.getElementById('btn-logout').addEventListener('click', (e) => {
		e.preventDefault();
		signOut();
	});
	document.getElementById('btn-profile').addEventListener('click', (e)=>{
		e.preventDefault();
		templateProfile();
		window.location.hash = '#/profile';
	});
	document.getElementById('submit').addEventListener('click',()=>{
		let post = document.getElementById('text-post').value;
		if(document.getElementById('text-post').value === ''|| document.getElementById('text-post').value<2){
			document.getElementById('post-error').style.display = "block";
			document.getElementById('post-error').innerHTML = "Publicación debe tener minimo 2 caracteres"
		}else{
			document.getElementById('post-error').style.display = "none";
			createPost(post);
		}

			
	});


}

export const printPost = (doc) => {
	//let postDate = new Date(doc.data().date);
	document.getElementById('posts').innerHTML +=
  		  		`<div class="container container__post">
			  		<div class="row">
				  		<div class="img-person col-4">
				  			<img src="assets/img/person.jpg" alt="" />	
				  		</div>		
				  		<div id="msg${doc.id}" class="post col-4"> 
				  			<p>${doc.data().message}</p> 
				  		</div>
				  		<div class="input col-4">
				  			<input id="inp${doc.id}" type="text">				  				
				  		</div>
				  		<div class="buttons col-4">
					  		<button class="delete" id="delete${doc.id}"><i class="fas fa-trash-alt"></i></button>
					  		<button class="edit" id="edit${doc.id}"><i class="fas fa-edit"></i></button>
					  		<button class="save" id="save${doc.id}"><i class="fas fa-save"></i></button>
					  		<button class="like"><i class="fas fa-heart"></i></button>
				  		</div>
			  		</div>
			  	</div>
		  		
  				`
}


export const addEvents = (doc) =>{
    
        /*Evento que permite eliminar un post*/
        document.getElementById('delete'+doc.id).addEventListener('click', ()=>{
            deletePost(doc.id);
            console.log('hola');
        })
        /*Evento que permite editar un post*/
        document.getElementById('edit'+doc.id).addEventListener('click', ()=>{
            editPost(doc.id);
            console.log('editando');
        })
    }
   
