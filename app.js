import { initRoute } from './route.js';
import { firebaseInit } from './assets/js/firebaseinit.js';

const init = () => {	
    firebaseInit();
    initRoute();
          
}
 
window.addEventListener('load', init);


