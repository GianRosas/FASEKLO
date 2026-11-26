
// Initialize map
const map = L.map("map");

map.setView([49.8880, -119.4960], 12);

// OpenStreetMap tiles
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Place information
const placeInfo = document.querySelector("#place-info");
const closeInfo = document.querySelector("#close-info");

// Display place information
function showPlaceInfo(place) {
    document.querySelector("#place-name").textContent = place.name;
    document.querySelector("#place-category").textContent = place.type;
    document.querySelector("#place-address").textContent = place.city;
    document.querySelector("#place-notes").textContent = place.notes;

    document.querySelector("#place-coordinates").textContent =
        `${place.lat} / ${place.lng}`;

    placeInfo.hidden = false;
}

// Create markers for saved places
for (const place of places) {
    const marker = L.marker([place.lat, place.lng], {
        title: place.name,
        alt: place.name
    }).addTo(map);

    marker.on("click", function() {
        showPlaceInfo(place);
    });
}

// Adjust map to show all saved places
if (places.length > 1) {
    const coordinates = places.map(place => [place.lat, place.lng]);

    map.fitBounds(coordinates, {
        padding: [30, 30]
    });
} else if (places.length === 1) {
    map.setView([places[0].lat, places[0].lng], 14);
}

// Close information card
closeInfo.addEventListener("click", function() {
    placeInfo.hidden = true;
});
