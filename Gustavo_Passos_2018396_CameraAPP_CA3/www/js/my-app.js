// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    listPhotos();
})

$$('#resetPhotos').click(function(){
    deletePhotos();
});


$$('#openCamera').click(function(){
        navigator.camera.getPicture(onSuccess, onFail, { 
        quality: 50,
        sourceType : Camera.PictureSourceType.CAMERA,
        targetWidth: 1000,
        targetHeight: 1000,
        correctOrientation: true,
        destinationType: Camera.DestinationType.FILE_URI});
});

function onSuccess(imageURI) {
    savePhoto(imageURI);
}

function onFail(message) {
    alert('Failed because: ' + message);
}


// onError callback
function onError(msg) {
    console.log(msg);
}


function deletePhotos(){
    localStorage.removeItem("photos");
    alert('Photos deleted!');
}

function savePhoto(photo) {
    //create object to save in the DataBase
  
    var objPhoto = { "photo": photo };
    var photos = JSON.parse(localStorage.getItem("photos") || "[]");
    photos.push(objPhoto);
    //localStorage.setItem("photos", JSON.stringify(objPhoto));
	localStorage.setItem("photos",JSON.stringify(photos));
    alert('Photo saved!');
}

                        
   // localStorage.setItem("photos", JSON.stringify(photo));
   

 
function listPhotos() {
    //get all locations stored in the database
    var photos = JSON.parse(localStorage.getItem("photos") || "[]");
    //loop through all the locations
    for (i = 0; i < photos.length; i++) {
        //create HTML element P 
        var p = document.createElement("p");
        //create the text to be included 
            //create image element
            var img = document.createElement("img");
            //set src element
            img.setAttribute("src", photos[i].photo);
           // alert(photos[i]);
			img.setAttribute("width", "150");
            img.setAttribute("height", "150");
        //append img element to the p element
            p.appendChild(img);
               

        //append element p to listcities div element
        document.getElementById("listPhotos").appendChild(p);
    }
    
   

    }

