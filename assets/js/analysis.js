// Chargement des fichiers CSV
Promise.all([
    d3.csv("data/par_commune.csv"),
    d3.csv("data/par_trajet.csv")
]).then(function(data) {
    data[0].forEach(function(d) {
        var element = [
            '2009','2009_inter','2009_extra','2009_extra_communes','2009_intra_communes','2009_extra_km','2009_intra_km',
            '2009_extra_heure','2009_intra_heure','2014','2014_inter','2014_extra','2014_extra_communes',
            '2014_intra_communes','2014_extra_km','2014_intra_km','2014_extra_heure','2014_intra_heure','departement_nom',
            'emplois','habitants','latitude','longitude','​​​menages','pers_par_menages','revenu_median','statut','menages',
            'superficie','unite_conso_menages','altitude_moy'
        ];
        element.forEach(function(el) {
            delete d[el];
        });

        d['inter_voiture'] = d['2015_inter_voiture'];
        d['extra_voiture'] = d['2015_extra_voiture'];
    });
    data['commune'] = data[0];
    delete data[0];
    console.log(data['commune']);

    data[1].forEach(function(d) {
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
    data['trajet'] = data[1];
    delete data[1];
    console.log(data['trajet']);

    let emission = [];
    data['commune'].forEach(function(commune) {
        // Émission de CO2 par an et par habitant en France en 2016 : 4,38 Tonnes
        // Émission CO2 d’un véhicule  : 135 g/km ou 13,5 kg/100km
        // 135 * trajet.distance_auto_km * (commune.inter_voiture + commune.extra_voiture);

        data['trajet'].filter(function(trajet) {
            if (trajet.insee === commune.insee) {
                commune.distance_auto_km = (trajet.distance_auto_km !== undefined) ? trajet.distance_auto_km : null;
                commune.co2 = 135 * parseFloat(trajet.distance_auto_km) * (parseFloat(commune.inter_voiture) + parseFloat(commune.extra_voiture));
            }
        });
        if (commune.co2) {
            emission.push(commune.co2);
        }
    });

    console.log(data['commune']);

    /*
    // Quelques recherches sur les datas du fichier "par_commune.csv"
    console.log("Nombre de villes : "+data['commune'].length);

    var departementsCommunes = [];
    data['commune'].forEach(function(element) {
        departementsCommunes.push(element.departement);
    });

    departements = cleanArray(departementsCommunes);
    var nbDepartement = departements.length;

    console.log("Nombre de département en Occitanie : " + nbDepartement);
    console.log("Département en Occitanie : "+departements);

    var countOccurencesCommunesByDepartement = countOccurences(departementsCommunes);
    data['commune'].forEach(function(element) {
        departementsCommunes.push(element.departement);
    });

    console.log(countOccurencesCommunesByDepartement);

     */
});