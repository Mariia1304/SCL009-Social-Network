//importación de las vistas
import { templateLogin } from './assets/views/templateLogin.js';
import { templateRegister } from './assets/views/templateRegister.js';
import { templateWall } from './assets/views/templateWall.js';
import { templateProfile } from './assets/views/templateProfile.js';



// const changeRoute = (hash) =>{
// 	if (hash === '' || hash === '#/wall' || hash === '#/register' || hash === '#/profile') {
//         //le pasa parametro #/ a la función showView
//         return showView(hash);
// 	}
// }
 
const changeRoute = (hash) =>{
    if (hash === '#/profile') {
        //le pasa como parametro #/home a la función showTemplate
        return showView(hash);
    }

    if (hash === '#/wall') {
        //le pasa como parametro #/about a la función showTemplate
        return showView(hash);
    }

    if (hash === '') {
        //le pasa como parametro #/ a la función showTemplate
        return showView(hash);
    }

    if (hash === '#/register') {
        //le pasa como parametro #/ a la función showTemplate
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