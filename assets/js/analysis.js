// Chargement des fichiers CSV
Promise.all([
    d3.csv("data/par_commune.csv"),
    d3.csv("data/par_trajet.csv")
]).then(function(data) {
    data['commune'] = data[0];
    data['trajet'] = data[1];
    delete data[0];
    delete data[1];

    // Quelques recherches sur les datas du fichier "par_commune.csv"
    console.log("Nombre de villes : "+data['commune'].length);

    var departement = [];
    data['commune'].forEach(function(element) {
        departement.push(element.departement);
    });
    console.log("Nombre de département en Occitanie : "+cleanArray(departement).length);
    console.log("Département en Occitanie : "+cleanArray(departement));
});