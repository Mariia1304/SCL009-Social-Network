//Configuración de las rutas

//importación de los templates constridos
// import { templateLogin } from './assets/views/templateLogin.js';
import { templateHome } from './assets/views/templateHome.js';
import { templateProfile } from './assets/views/templateProfile.js';
import { templateRegister } from './assets/views/templateRegister.js';
import { templateLogin } from './assets/views/templateLogin.js';

const changeRoute = (hash) =>{
	if (hash === '' || hash === '#/home' || hash === '#/register' || hash === '#/profile') {
        //le pasa como parametro #/a la función showTemplate
        return showView(hash);
	}
}

const showView = (hash) =>{
    //necesito sacar el #/ a mi string
    const router = hash.substring(2);
    //Obtener desde el html el id del elemento donde se imprimirá showTemplate
    const mainRoot = document.getElementById('root');
    mainRoot.innerHTML='';

    //Se hace el match del hash utilizado y el template que quiero mostrar
    switch (router) {          
        
        case '':
            templateLogin();
            break;
        case 'home':
        	templateHome();
        	break;
        case 'profile':
            templateProfile();
            break;
        case 'register':
            templateRegister();
            break;    
        default:
            mainRoot.innerHTML = `<p>Error 404</p>`
    }
}

export const initRoute = () =>{
    //evento que llama a toda la página, ya que necesito ir cambiando la url
    window.addEventListener('load',changeRoute(window.location.hash));
    /*se le pasa como parametro window.location.hash, ya que es el parametro 
    que tiene la página en ese momento*/

    //Metodo que reconocer si hubo un cambio en el hash y le pasa ese nuevo hash a changeRouter

    if('onhashchange' in window){
        //cuando reconoce un cambio en el hash, le pasa el hash cambiado
        window.onhashchange = () =>{
            changeRoute(window.location.hash);
        }
    }

}