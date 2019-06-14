//importación de las vistas
import { templateLogin } from './assets/views/templateLogin.js';
import { templateRegister } from './assets/views/templateRegister.js';
import { templateWall } from './assets/views/templateWall.js';
import { templateProfile } from './assets/views/templateProfile.js';



const changeRoute = (hash) =>{
	if (hash === '' || hash === '#/wall' || hash === '#/register' || hash === '#/profile') {
        //le pasa parametro #/ a la función showView
        return showView(hash);
	}
}
 
const showView = (hash) =>{
    // saco el #/ a  string
    const router = hash.substring(2);
    //obtengo elemento de html donde voy a imprimir showView
    const elRoot = document.getElementById('root');
    elRoot.innerHTML='';

    //Se hace el match del hash utilizado y el template que quiero mostrar
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
            elRoot.innerHTML = `<p>Error 404. No encuentro la pagina</p>`
    }
}

export const initRoute = () =>{
    //evento que llama a toda la página, ya que necesito ir cambiando la url
    window.addEventListener('load',changeRoute(window.location.hash));
    //Metodo que reconocer si hubo un cambio en el hash y le pasa ese nuevo hash a changeRouter
    if('onhashchange' in window){
        //cuando reconoce un cambio en el hash, le pasa el hash cambiado
        window.onhashchange = () =>{
            changeRoute(window.location.hash);
        }
    }

}