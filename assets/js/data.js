// Crear post
import { addEvents, printPost } from '../views/templateWall.js';
export const createPost = (post) =>{
	let db = firebase.firestore();
	let date = Date.now();
	console.log(date);

	 firebase.auth().onAuthStateChanged(user => {
	 	db.collection('users').doc(user.uid).get().then(doc => {
	 		db.collection('post').add({
	 			uid: user.uid,
	 			author: user.email,
	 			date: date,
	 			message: post
	 		}).then(function(doc){
	 			console.log("Document written with ID: ", doc.id);

	 			document.getElementById('text-post').value ='';
	 			document.getElementById('text-post').focus();
	 			window.location.hash='/wall';
	 			readPost();
	 			
	 		}).catch(function(error) {
            console.error("Error adding document: ", error);
			});
	 	})
	 })

}
// read post
export const readPost = () => {
  let db = firebase.firestore();

  db.collection('post').onSnapshot((querySnapshot) =>{
  	if(document.getElementById('posts')){
        document.getElementById('posts').innerHTML = '';
	}
  	querySnapshot.forEach((doc) =>{	
  		printPost(doc);
   		});
  	querySnapshot.forEach((doc) => {
        addEvents(doc);
  	})
 });
  	  
}


//delete post

export const deletePost = (id) =>{
    let db = firebase.firestore();
    if(confirm("¿Seguro que quieres borrar tu publicación?")){
        db.collection("post").doc(id).delete().then(function() {
            console.log("Document successfully deleted!");
           //readPost();
                    
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }
}
// editar post

export const editPost =(id)=>{
	let db = firebase.firestore();
	db.collection('post').doc(id).get().then(doc=>{
		document.getElementById(`inp${doc.id}`).value = doc.data().message;
		document.getElementById(`inp${doc.id}`).style.display = "block";
		document.getElementById(`msg${doc.id}`).style.display = "none";
		document.getElementById(`edit${doc.id}`).style.display = "none";
		document.getElementById(`save${doc.id}`).style.display = "inline";

		document.getElementById('save'+doc.id).addEventListener('click', ()=>{
			let post = document.getElementById(`inp${doc.id}`).value;
			let docRef = db.collection('post').doc(id);
			return docRef.update({
				message: post
			})
			.then(()=>{
				console.log("Documento actualizado")
			})
			.catch((error)=>{
				console.error(error);
			})
		})
	})
}

