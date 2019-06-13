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
					
					<button class="submit"><i id="submit" class="fas fa-paper-plane"></i></button>
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
		let count = 0;
		let liked = false;
		if(document.getElementById('text-post').value === ''|| document.getElementById('text-post').value<2){
			document.getElementById('post-error').style.display = "block";
			document.getElementById('post-error').innerHTML = "Publicación debe tener minimo 2 caracteres"
		}else{
			document.getElementById('post-error').style.display = "none";
			createPost(post, count, liked);
		}

			
	});


}

export const printPost = (doc) => {
	let postDate = new Date(doc.data().date);
	postDate = postDate.toLocaleString();
	if(firebase.auth().currentUser.uid===doc.data().uid){
	document.getElementById('posts').innerHTML +=
  		  		`<div class="container container__post">
			  		<div class="row templatewall">
				  		<div class="img-person col-12">
				  			<div class="row img">
				  					<img src="assets/img/person.jpg" alt="" />				  				
				  					<p id="name">${doc.data().authorname}</p>
				  					<p id="date">${postDate}</p>
				  				
				  			</div>	
				  		</div>		
				  		<div id="msg${doc.id}" class="post col-12"> 
				  			<p>${doc.data().message}</p> 
				  		</div>
				  		<div class="input col-12">
				  			<input id="inp${doc.id}" type="text">				  				
				  		</div>
				  		<div class="buttons col-12">
					  		<button class="delete" id="delete${doc.id}"><i class="fas fa-trash-alt"></i></button>
					  		<button class="edit" id="edit${doc.id}"><i class="fas fa-edit"></i></button>
					  		<button class="save" id="save${doc.id}"><i class="fas fa-save"></i></button>	
					  		<button value="${doc.id}" id="like${doc.id}" class="like"><i id="heart${doc.id}" class="fas fa-heart"></i> <span id="counter">
                               ${doc.data().like}
                            </span></button>
					  		
				  		</div>
			  		</div>
			  	</div>
		  		
  				`
  	}else{
  		document.getElementById('posts').innerHTML +=
  		  		`<div class="container container__post">
			  		<div class="row templatewall">
				  		<div class="img-person col-12">
				  			<div class="row img">
				  				
				  					<img src="assets/img/person.jpg" alt="" />
				  				
				  				
				  					<p id="name">${doc.data().authorname}</p>
				  					<p id="date">${postDate}</p>
				  				
				  			</div>	
				  		</div>		
				  		<div id="msg${doc.id}" class="post col-12"> 
				  			<p>${doc.data().message}</p> 
				  		</div>
				  		<div class="input col-12">
				  			<input id="inp${doc.id}" type="text">				  				
				  		</div>
				  		<div class="buttons col-12">
					  		
					  		<button id="like${doc.id}" value="${doc.id}" class="like"><i id="heart${doc.id}" class="fas fa-heart"></i><span id="counter">
                                ${doc.data().like}
                            </span></button>

				  		</div>
			  		</div>
			  	</div>
		  		
  				`;

  	}
  	let liked = doc.data().liked;
  	if(liked===true){
		document.getElementById('heart'+doc.id).style.color = "#ff637d";
		
	}
}


export const addEvents = (doc) =>{
    if(firebase.auth().currentUser.uid===doc.data().uid){
       // evento click para eliminar el post
        document.getElementById('delete'+doc.id).addEventListener('click', ()=>{
            deletePost(doc.id);
            
        })
		// evento click para editar el post 
        document.getElementById('edit'+doc.id).addEventListener('click', ()=>{
            editPost(doc.id);
            console.log('editando');
        })
    }

    document.getElementById('like'+doc.id).addEventListener('click',()=>{
    	//document.getElementById('heart'+doc.id).style.color = "#ff637d";
    	// let postid = document.getElementById('like'+doc.id).value;
    	// let currentUser = firebase.auth().currentUser.uid;
    	// console.log(postid);
    	// console.log(currentUser);
    	// compareLike(postid, currentUser);
    	// createLike(postid);
    	let liked = doc.data().liked;
    	if(liked === false){
    	let count = doc.data().like;
     	count += 1;	
     	liked = true;
    	let db = firebase.firestore();
    	let docRef = db.collection('post').doc(doc.id);
			return docRef.update({
				like: count,
				liked: liked
			})
			.then(()=>{
				document.getElementById('like'+doc.id).disabled = true;
				document.getElementById('heart'+doc.id).style.color = "#ff637d";
				console.log("Documento actualizado")
			})
			.catch((error)=>{
				console.error(error);
			})
		}





    })
}
   
