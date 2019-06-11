
import { initRoute } from './route.js';
import { observer } from './assets/js/auth.js'
import { firebaseInit } from './assets/js/firebaseinit.js';


const init = () => {	
    firebaseInit();
    initRoute();
    //observer();       
}

const footerPosition = () =>{
	let height = document.documentElement.clientHeight;

	
	if(height > 568 && height<800) {
		
		document.getElementById('footer').classList.add('fixed');
	}
}
window.addEventListener('load', init);
window.addEventListener('load', footerPosition);

