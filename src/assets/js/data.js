
import { addEvents, printPost } from '../views/templateWall.js';
import { validatePost} from './validation.js';
// Crear Post
export const createPost = (post, count, liked) =>{
	//guardamos firestore en variable
	let db = firebase.firestore();
	//guardamos fecha
	let date = Date.now();
	//usamos esta funcion para obtener uid de uauario corriente
	 firebase.auth().onAuthStateChanged(user => {
	 	//getName(user.email);
	 	//obtenemos desde collecion users datos de usuario corriente con uid
	 	db.collection('users').doc(user.uid).get().then(doc => {
	 		//si post paso por validaciones(true)
	 		if(validatePost(post)){
	 			//creamos si aun no existela collecion post y agregamos documento post con datos que queremos pasar
		 		db.collection('post').add({
		 			uid: user.uid,
		 			author: user.email,
		 			authorname:doc.data().name,
		 			date: date,
		 			message: post,
		 			like: count,
		 			liked: liked
		 		}).then(function(doc){
		 			//veamos que post esta escrito en db
		 			console.log("Document written with ID: ", doc.id);
		 			//vaciamos input
		 			document.getElementById('text-post').value ='';
		 			//focus
		 			document.getElementById('text-post').focus();
		 			// al muro
		 			window.location.hash='/wall';
		 			//leer post
		 			readPost();

		 		}).catch(function(error) {
	            console.error("Error adding document: ", error);
				});

			}else{
				console.log('error de validacion del post')
				//return "error de validacion del post";

			}
	 	})
	 })

}
// read post
export const readPost = () => {
  let db = firebase.firestore();
//ordenamos post por fecha
  db.collection('post').orderBy("date", "desc").onSnapshot((querySnapshot) =>{
//si existe elemento con id posts lo vaciamos
  	if(document.getElementById('posts')){
        document.getElementById('posts').innerHTML = '';
	}
  	querySnapshot.forEach((doc) =>{	
  		//imprimimos posts
  		printPost(doc);
   		});
  	querySnapshot.forEach((doc) => {
  		//agregamos la funcion con eventos adiccionales
        addEvents(doc);
  	})
 });
  	  
}

// obtener nombre de usuario para colocarlo en post

// const getName = (email) =>{
//     let db = firebase.firestore();
//     let users = db.collection("users").where("email","==",email);
//     users.get().then((querySnapshot) => {
//         querySnapshot.forEach((doc)=>{
//             firebase.auth().currentUser.name = doc.data().name;
//         })
        
//     });
// }

//delete post

export const deletePost = (id) =>{
    let db = firebase.firestore();
    if(confirm("¿Seguro que quieres borrar tu publicación?")){
        db.collection("post").doc(id).delete().then(function() {
            console.log("Document successfully deleted!");
           
                    
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }
}
// editar post

export const editPost =(id)=>{
	let db = firebase.firestore();
	//obtenemos post
	db.collection('post').doc(id).get().then(doc=>{
		//obtenemos valor de elemento con texto de post
		document.getElementById(`inp${doc.id}`).value = doc.data().message;
		//daremos display block a input para poder cambiar texto(para que se vea el input)
		document.getElementById(`inp${doc.id}`).style.display = "block";
		//display none al <p> para que no se veia
		document.getElementById(`msg${doc.id}`).style.display = "none";
		//escondemos boton editar
		document.getElementById(`edit${doc.id}`).style.display = "none";
		// mostramos boton guardar
		document.getElementById(`save${doc.id}`).style.display = "inline";
		//evento con boton guardar
		document.getElementById('save'+doc.id).addEventListener('click', ()=>{
			//guardamos nuevo valor de post que esta en input
			let post = document.getElementById(`inp${doc.id}`).value;
			// hacemos update de post
			let docRef = db.collection('post').doc(id);
			return docRef.update({
				message: post
			})
			.then(()=>{
				//volvemos que todo sea como era
				document.getElementById(`msg${doc.id}`).style.display = "block";
				document.getElementById(`inp${doc.id}`).style.display = "none";
				document.getElementById(`save${doc.id}`).style.display = "none";
				document.getElementById(`edit${doc.id}`).style.display = "inline";
				console.log("Documento actualizado")
			})
			.catch((error)=>{
				console.error(error);
			})
		})
	})
}
//creamos collection likes
// export const createLike = (id) =>{
// 	let db = firebase.firestore();
// 	db.collection('post').doc(id).get().then(doc =>{
// 		db.collection('likes').add({
// 			uid: doc.data().uid,
// 			postid: id
// 		}).then(function(doc){
//  			console.log("Document written with ID: ", doc.id);
//  		}).catch(function(error) {
//         console.error("Error adding document: ", error);
// 		});
// 	})

// }

// export const  compareLike = (postid, currentUser) =>{
	
// 	let db = firebase.firestore();
// 			db.collection('likes').where("postid","==",postid)
// 			.get()
//			.where("uid","===",currentUser)
//		    .get()
// 			.then(function(querySnapshot){
// 		        querySnapshot.forEach(function(doc) {

// 		        });
// 		    })
// 		    .catch(function(error) {
// 		        console.log("Error getting documents: ", error);
// 		    });
// }