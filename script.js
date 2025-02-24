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

function addMarkers() {
    // Example data for markers
    const locations = [
        { lat: 43.2557, lng: -79.8711, title: "Location 1", info: "Info about Location 1", type: "type1" },
        { lat: 43.2600, lng: -79.8800, title: "Location 2", info: "Info about Location 2", type: "type2" },
        // Add at least 10 locations
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