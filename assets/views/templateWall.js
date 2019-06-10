import { signOut, observer } from './../js/auth.js';
import { templateProfile } from './templateProfile.js';
import { changeClass } from './../js/menu.js';
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
			<div id="messages" class="row templatewall">				
			</div>
			<div class="row templatewall">
				<div class="col-12">
					<textarea placeholder="escribe algo.." name=""  id="textarea" ></textarea>
					<i class="fas fa-paper-plane"></i>
				</div>
			</div>
		</main>
														`
	changeClass();
	document.getElementById('btn-logout').addEventListener('click', (e) => {
		e.preventDefault();
		signOut();
	});
	document.getElementById('btn-profile').addEventListener('click', (e)=>{
		e.preventDefault();
		templateProfile();
		window.location.hash = '#/profile';
	});

}