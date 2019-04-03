// Chargement d'une map
var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 43.651, lng: 2.1382},
        zoom: 8,
        styles: [ // Style de la carte
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e9e9e9"
                    },
                    {
                        "lightness": 17
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 17
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 29
                    },
                    {
                        "weight": 0.2
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 18
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    },
                    {
                        "lightness": 21
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dedede"
                    },
                    {
                        "lightness": 21
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    },
                    {
                        "lightness": "12"
                    }
                ]
            },
            {
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    },
                    {
                        "lightness": 19
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#fefefe"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#fefefe"
                    },
                    {
                        "lightness": 17
                    },
                    {
                        "weight": 1.2
                    }
                ]
            }
        ]
    });

    Promise.all([
        d3.csv("data/par_trajet.csv")
    ]).then(function(data) {
        data[0].forEach(function(d) {
            var element = [
                'habitants','latitude','longitude','menages','pers_par_menages','revenu_median','travail_commune',
                'travail_departement','travail_emplois','travail_insee','travail_latitude','travail_longitude',
                'unite_conso_menages','2009','2009_inter','2009_extra','2009_extra_travail_commune','2014','2014_inter',
                '2014_extra','2014_extra_travail_commune'
            ];
            element.forEach(function(el) {
                delete d[el];
            });
        });
        data['trajet'] = data[0];
        delete data[0];
        console.log(data['trajet']);

        // NOTE: This uses cross-domain XHR, and may not work on older browsers.
        map.data.loadGeoJson('data/par_commune.geojson');

        map.data.setStyle(function (par_commune) {
            var departement     = par_commune.getProperty('departement');
            var commune         = par_commune.getProperty('commune');
            var inter_voiture   = par_commune.getProperty('2015_inter_voiture');
            var extra_voiture   = par_commune.getProperty('2015_extra_voiture');

            var color       = '#666';
            var gradient = [
                '#04f', '#00b','#009','#005',
                '#315', '#704', '#f00'
            ];

            var result = data['trajet'].filter(function (trajet) {
                if (trajet.commune === commune) {
                    var distance_auto_km = (trajet.distance_auto_km !== undefined) ? trajet.distance_auto_km : null;
                    var co2 = 135 * parseFloat(distance_auto_km) * (parseFloat(inter_voiture) + parseFloat(extra_voiture));

                    if (0 <= co2 && co2 < 10000)
                        color = '#00b';
                    else if (10000 <= co2 && co2 < 100000)
                        color = '#009';
                    else if (100000 <= co2 && co2 < 500000)
                        color = '#007';
                    else if (500000 <= co2 && co2 < 1000000)
                        color = '#005';
                    else if (1000000 <= co2 && co2 < 5000000)
                        color = '#315';
                    else if (5000000 <= co2 && co2 < 10000000)
                        color = '#704';
                    else if (10000000 <= co2)
                        color = '#b02';

                    return color;
                }
            });

            return {
                fillColor: color,
                strokeWeight: 0
            };
        });
    });
}