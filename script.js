let map;
let markers = [];

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