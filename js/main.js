//Form Submission
document.getElementById("form").addEventListener("submit",saveBookmark);
//Save Bookmark
function saveBookmark(x){
	//Get form values
	var siteName=document.getElementById('siteName').value;
	var siteUrl=document.getElementById('siteURL').value;
	
	var Bookmark={
		name:siteName,
		url:siteUrl
	}
	if(!validateForm(siteName,siteUrl)){
		return false;
	}

	//test if bookmark is null
	if(localStorage.getItem('bookmark')===null){
		//init array
		var bookmark=[];
		//adding values to array
		bookmark.push(Bookmark);
		//set to local storage
		localStorage.setItem('bookmark',JSON.stringify(bookmark));

	}else{
		//get bookmarks from localstorage
		var bookmark=JSON.parse(localStorage.getItem('bookmark'));
		//Add bookmark to array
		bookmark.push(Bookmark);
		//reset to local storage
		localStorage.setItem('bookmark',JSON.stringify(bookmark));


	}
	//clearing form
	document.getElementById("form").reset();
	fetchBookmark();

	//To prevent form from submitting
	x.preventDefault();
}
//Delete Bookmark
function deleteBookmark(url){
	//get bookmark from local storage
	 var bookmark=JSON.parse(localStorage.getItem('bookmark'));
	 //loop through bookmark
	 for(var i=0;i<bookmark.length;i++){
	 	if(bookmark[i].url==url){
	 		//remove from array
	 		bookmark.splice(i,1);
	 	}

	 }
	 localStorage.setItem('bookmark',JSON.stringify(bookmark));
 	//refetch book mark
 	fetchBookmark();


}
//Fetch bookmark
function fetchBookmark(){
 	var bookmark=JSON.parse(localStorage.getItem('bookmark'));
 	console.log(bookmark);
 	//get output id
 	var bookmarkResults=document.getElementById('bookmarkResults');
 	//Build Output
 	bookmarkResults.innerHTML='';
 	for(var i=0;i<bookmark.length;i++){
 		var name=bookmark[i].name;
 		var url=bookmark[i].url;
 		
 		bookmarkResults.innerHTML+='<div class="well">'+
 									'<h3>'+name+
 									' <a class="btn btn-success" target="_blank" href="'+url+'">Visit</a> '
 									+' <a onclick="deleteBookmark(\''+url+'\')"  class="btn btn-danger" href="#">Delete</a> '

 									'</h3>'+
 									'</div>';

 	}
}
//Validate Form 
function validateForm(siteName,siteUrl){
	if(!siteName||!siteURL){
		alert("Please fill out the form");
		return false;
	}
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);
	if(!siteUrl.match(regex)){
		alert('please enter valid url');
		return false;

	}
	return true;
}
