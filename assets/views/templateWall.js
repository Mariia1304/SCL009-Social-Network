import { signOut, observer } from './../js/auth.js';
import { templateProfile } from './templateProfile.js';
import { changeClass } from './../js/menu.js';
import { createPost, readPost } from './../js/data.js';
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
		console.log(post);
		createPost(post);
	
		
	});
}