//importación de las vistas
import { templateLogin } from './assets/views/templateLogin.js';
import { templateRegister } from './assets/views/templateRegister.js';
import { templateWall } from './assets/views/templateWall.js';
import { templateProfile } from './assets/views/templateProfile.js';



const changeRoute = (hash) =>{
	if (hash === '' || hash === '#/wall' || hash === '#/register' || hash === '#/profile') {
        // si le paso  algunos de esos parametros que se cargue la vista
        return showView(hash);
	}
}
 
const showView = (hash) =>{
    // saco el #/ a  string
    const router = hash.substring(2);
    //obtengo elemento de html donde voy a imprimir showView
    const elRoot = document.getElementById('root');
    elRoot.innerHTML='';

    //Se hace el match del hash obtenido y la vista que quiero imprimir
    switch (router) {          
        
        case '':
            templateLogin();
            break;
        case 'wall':
        	templateWall();
        	break;
        case 'profile':
            templateProfile();
            break;
        case 'register':
            templateRegister();
            break;    
        default:
            elRoot.innerHTML = `<h1>Error 404. No encuentro la pagina</h1>`
    }
}

export const initRoute = () =>{

    //evento que llama a toda la página, porque necesito ir cambiando la url
    window.addEventListener('load',changeRoute(window.location.hash));
    //Metodo que reconoce si fue un cambio del hash y le pasa  nuevo hash a changeRouter
    if('onhashchange' in window){
        //cuando reconoce un cambio en el hash, le pasa el hash cambiado
        window.onhashchange = () =>{

            changeRoute(window.location.hash);
        }
    }

}