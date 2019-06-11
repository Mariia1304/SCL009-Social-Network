// Crear post

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
	 		}).then(()=>{
	 			readPost();
	 			window.location.hash='/wall';
	 		})
	 	})
	 })

}
// read post
export const readPost = () => {
  let db = firebase.firestore();
  db.collection('post').get().then((querySnapshot) =>{
  	querySnapshot.forEach((doc) =>{
  		console.log(`${doc.id}`);
  		// ${doc.data().message}
  		document.getElementById('posts').innerHTML +=
  		  		`<div class="container container__post">
			  		<div class="row">
				  		<div class="img-person col-4">
				  			<img src="/assets/img/person.jpg" alt="" />	
				  		</div>		
				  		<div class="post col-4"> 
				  			<p>
				  				${doc.data().message}
				  			</p> 
				  		</div>
				  		<div class="buttons col-4">
					  		<button id="delete"><i class="fas fa-trash-alt"></i></button>
					  		<button id="edit"><i class="fas fa-edit"></i></button>
					  		<button id="save"><i class="fas fa-save"></i></button>
					  		<button id="like"><i class="fas fa-heart"></i></button>
				  		</div>
			  		</div>
			  	</div>
		  		
  				`
  	})
  })
}