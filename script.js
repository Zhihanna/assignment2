let map;
let markers = [];

document.getElementById("filter-all").addEventListener("click", () => filterMarkers("all"));
document.getElementById("filter-type1").addEventListener("click", () => filterMarkers("type1"));
document.getElementById("filter-type2").addEventListener("click", () => filterMarkers("type2"));
document.getElementById("filter-type3").addEventListener("click", () => filterMarkers("type3"));
document.getElementById("get-location").addEventListener("click", getUserLocation);

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                addUserMarker(userLocation);
            },
            (error) => {
                console.error("Error getting user location:", error);
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}

function addUserMarker(location) {
    const userMarker = new google.maps.Marker({
        position: location,
        map: map,
        icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    });
}

function filterMarkers(type) {
    markers.forEach((marker) => {
        if (type === "all" || marker.type === type) {
            marker.setVisible(true);
        } else {
            marker.setVisible(false);
        }
    });
}

function initMap() {
    // Set the initial center of the map (e.g., Hamilton, ON)
    const center = { lat: 43.2557, lng: -79.8711 };
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: center,
    });

    // Add initial markers
    addMarkers();
}

document.getElementById("add-marker-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const address = document.getElementById("address").value;
    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK") {
            const location = results[0].geometry.location;
            addMarker(location, title, category);
        } else {
            console.error("Geocode failed:", status);
        }
    });
});

function addMarker(location, title, category) {
    const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: title,
        type: category,
    });

    const infowindow = new google.maps.InfoWindow({
        content: `<h3>${title}</h3><p>Category: ${category}</p>`,
    });

    marker.addListener("click", () => {
        infowindow.open(map, marker);
    });
}

function addMarkers() {
    // Example data for markers
    const locations = [
        { lat: 43.2557, lng: -79.8711, title: "Location 1", info: "Info about Location 1", type: "type1" },
        { lat: 43.2600, lng: -79.8800, title: "Location 2", info: "Info about Location 2", type: "type2" },
        { lat: 43.2650, lng: -79.8900, title: "Location 3", info: "Info about Location 3", type: "type3" },
        { lat: 43.2700, lng: -79.9000, title: "Location 4", info: "Info about Location 4", type: "type1" },
        { lat: 43.2750, lng: -79.9100, title: "Location 5", info: "Info about Location 5", type: "type2" },
        { lat: 43.2800, lng: -79.9200, title: "Location 6", info: "Info about Location 6", type: "type3" },
        { lat: 43.2850, lng: -79.9300, title: "Location 7", info: "Info about Location 7", type: "type1" },
        { lat: 43.2900, lng: -79.9400, title: "Location 8", info: "Info about Location 8", type: "type2" },
        { lat: 43.2950, lng: -79.9500, title: "Location 9", info: "Info about Location 9", type: "type3" },
        { lat: 43.3000, lng: -79.9600, title: "Location 10", info: "Info about Location 10", type: "type1" },
    ];

    locations.forEach((location) => {
        const marker = new google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map: map,
            title: location.title,
            type: location.type,
        });

        // Add info window
        const infowindow = new google.maps.InfoWindow({
            content: `<h3>${location.title}</h3><p>${location.info}</p>`,
        });

        marker.addListener("click", () => {
            infowindow.open(map, marker);
        });

        markers.push(marker);
    });
}