import { observer } from './../js/auth.js';

export const templateProfile = () => {
	observer();
	document.getElementById('main').innerHTML = `
												<section id="perfil">
													<div class="row">
														<div class="col-4 col-12-sm perfil">
															<center><img src="assets/img/perfil.jpg" alt="foto de perfil"></center>
															<center><i class="fas fa-camera"></i></center> 
														</div>
														<div class="col-8 col-12-sm perfil-info">
															<div class="perfil-info-string">Juanita Perez<i class="far fa-edit"></i>
															</div>
															<div class="perfil-info-string">hijo: Jorge Gonzalez<i class="far fa-edit"></i>
															</div>
														</div>
													</div>
												</section>
												`
}