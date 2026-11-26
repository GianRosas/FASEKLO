// Array of objects for default places
const defaultPlaces = [
    {
        id: 1,
        name: "Myra Canyon",
        city: "Kelowna, BC",
        lat: 49.801944,
        lng: -119.312500,
        notes: "Myra Canyon trailway",
        image: "images/myra.jpg",
        type: "Default Place"
    },
    {
        id: 2,
        name: "Knox Mountain",
        city: "Kelowna, BC",
        lat: 49.905357,
        lng: -119.490250,
        notes: "Knox Mountain Lookout",
        image: "images/knox.jpeg",
        type: "Default Place"
    },
    {
        id: 3,
        name: "Lakestone Park",
        city: "Lake Country, BC",
        lat: 50.015660,
        lng: -119.441349,
        notes: "Lakestone Waterside Park",
        image: "images/lakestone.jpg",
        type: "Default Place"
    }
];

// Array with localstorage elements
let places;

// Check if the localStorage has saved places if not initialize the dault into the localstorage 
if (localStorage.getItem("places") === null){
    localStorage.setItem("places", JSON.stringify(defaultPlaces));
    places = defaultPlaces;
}else{
    places = JSON.parse(localStorage.getItem("places"));
}


const placeList = document.querySelector(".place-list");

function renderPlaces(places){
    placeList.innerHTML = "";

    if (places.length === 0){
        const article = document.createElement("article");
        article.classList.add("empty-card");

        article.innerHTML = `
            <img class="empty-img" src="images/noPlace.jpg" alt="">
            <h2 class="no-place"></h2>
            <p class="message"></p>
        `;

        article.querySelector(".no-place").textContent = "No places found";
        article.querySelector(".message").textContent = "Try searching for a different place.";

        placeList.appendChild(article);

        return;
    }

    for (const place of places){
        const article = document.createElement("article");
        article.classList.add("place-card");

        article.innerHTML = `
            <img class="place-img" alt="">
            <div class="place-info">
                <h2 class="place-name"></h2>
                <p class="place-city"></p>
                <div class="place-coord">
                    <span class="lat"></span>
                    <span>/</span>
                    <span class="lng"></span>
                </div>
                <p class="place-notes"></p>
            </div>
            <a class="directions"> Get Directions </a>
        `;

        const img = article.querySelector(".place-img");
        img.alt = place.name;

        if (place.type === "Default Place"){
            img.src = place.image;
        }else if (place.type === "Secret Spot") {
            img.src = "images/secretspot.jpg";
        } else {
            img.src = "images/savedplace.jpg";
        }

        article.querySelector(".place-name").textContent = place.name;
        article.querySelector(".place-city").textContent = place.city;
        article.querySelector(".lat").textContent = place.lat;
        article.querySelector(".lng").textContent = place.lng;
        article.querySelector(".place-notes").textContent = place.notes;
        
        const direc = article.querySelector(".directions");
        direc.href = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`;
        direc.target = "noopener";

        placeList.appendChild(article);
    }
}

renderPlaces(places);

const search = document.querySelector(".searching");

search.addEventListener("input", function(){
    const searchText = search.value.toLowerCase().trim();

    const filteredPlaces = places.filter(place =>
        place.name.toLowerCase().includes(searchText)
    );

    renderPlaces(filteredPlaces);
});
