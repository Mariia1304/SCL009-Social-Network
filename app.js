
import { initRoute } from './route.js';
//import { observer } from './assets/js/auth.js'
import { firebaseInit } from './assets/js/firebaseinit.js';


const init = () => {	
    firebaseInit();
    initRoute();
    //observer();       
}

 
window.addEventListener('load', init);


