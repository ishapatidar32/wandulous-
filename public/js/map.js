

// Check if all required data exists before initializing map
// We check each level: listing -> geometry -> coordinates
// This prevents errors if:
// 1. Listing data is missing
// 2. Geometry wasn't saved (old listings or geocoding failed)
// 3. Coordinates array is empty
if (mapToken && listing && listing.geometry && listing.geometry.coordinates) {
    mapboxgl.accessToken = mapToken;

    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style:"mapbox://styles/mapbox/streets-v12",
        center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 ,// starting zoom
    });

    const marker = new mapboxgl.Marker({color: "red"})
    .setLngLat(listing.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({offset: 25 }) .setHTML(`<h4>${listing.location}</h4><p>Exact Location provided after booking </p>`))
   .addTo(map);
} else {
    console.error("Map cannot be initialized. Missing:", {
        mapToken: !mapToken,
        listing: !listing,
        geometry: !listing?.geometry,
        coordinates: !listing?.geometry?.coordinates
    });
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
        mapContainer.innerHTML = '<p style="padding: 20px; color: red;">Map unavailable: Location data not found</p>';
    }
}