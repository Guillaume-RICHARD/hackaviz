// Chargement d'une map
var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 43.651, lng: 2.1382},
        zoom: 7
    });

    // NOTE: This uses cross-domain XHR, and may not work on older browsers.
    map.data.loadGeoJson('data/par_commune.geojson');

    // Color Capital letters blue, and lower case letters red.
    // Capital letters are represented in ascii by values less than 91
    map.data.setStyle(function(feature) {
        var departement = feature.getProperty('departement');
        var color = (departement === 31) ? 'red' : 'blue';
        return {
            fillColor: color,
            strokeWeight: 1
        };
    });
}