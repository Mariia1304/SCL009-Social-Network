export const footerPosition = () =>{
	let height = document.documentElement.clientHeight;

	
	if(height > 569) {
		
		document.getElementById('footer').classList.add('fixed');
	}
}