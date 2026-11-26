
const placeList = document.querySelector(".place-list");
const search = document.querySelector(".searching");

// Render saved places
function renderPlaces(places) {
    placeList.innerHTML = "";

    // No places found
    if (places.length === 0) {
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

    // Create a card for each place
    for (const place of places) {
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
            <a class="directions">Get Directions</a>
        `;

        // Place image
        const img = article.querySelector(".place-img");
        img.alt = place.name;

        if (place.type === "Default Place" && place.image) {
            img.src = place.image;
        } else if (place.type === "Secret Spot") {
            img.src = "images/secretspot.jpg";
        } else {
            img.src = "images/savedplace.jpg";
        }

        // Place information
        article.querySelector(".place-name").textContent = place.name;
        article.querySelector(".place-city").textContent = place.city;
        article.querySelector(".lat").textContent = place.lat;
        article.querySelector(".lng").textContent = place.lng;
        article.querySelector(".place-notes").textContent = place.notes;

        // Google Maps directions
        const direc = article.querySelector(".directions");

        direc.href = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`;
        direc.target = "_blank";
        direc.rel = "noopener";

        placeList.appendChild(article);
    }
}

// Display all places when the page loads
renderPlaces(places);

// Search places by name
search.addEventListener("input", function() {
    const searchText = search.value.toLowerCase().trim();

    const filteredPlaces = places.filter(place =>
        place.name.toLowerCase().includes(searchText)
    );

    renderPlaces(filteredPlaces);
});
