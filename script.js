const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArray = [];

//Unsplash API
let count = 10;
const apiKey = 'pnK-kDJFvaQ2m9bPrp1SsyvJfYsBY6Fu0T_iOdks5PE';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&orientation=squarish`; //Other parameter than yuo can 'use &orientation=squarish&query=food'


// Create elements for links & photos, add to DOM
function dysplayPhotos(){
    totalImages = photoArray.length;
    //Run fuction for each obect in photosArray
    photoArray.forEach((photo) => {
        //Create <a> to link to Unsplash
        const item = document.createElement('a');
        settAtributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        //Create <im> for photo
        const img = document.createElement('img');
        settAtributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        //Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        //Put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

function settAtributes(element, attribute){
    for (const key in attribute){
        element.setAttribute(key, attribute[key]);
    }
}

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        loader.hidden = true;
        ready = true;
        imagesLoaded = 0;
        count = 30;
    }
}

//GET photos from API
async function gatPhotos(){
    try {
        const response = await fetch(apiUrl);
        photoArray = await response.json();
        dysplayPhotos();
    } catch(error){
        console.log('Ups, an error ocurred', error)
    }
}
//Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        gatPhotos();   
    }
});

//On load
gatPhotos();