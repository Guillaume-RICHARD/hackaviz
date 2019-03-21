<?php

$app->get('/', function ($request, $response, $args) {
    return $this->view->render($response, 'index.twig', [
        "Title"         => "Données Hackaviz",
        "Page"          => "Page D'accueil",
        "Description"   => "Petit projet permettant de visualiser les données du Hackaviz 2019 de l'Occitanie."
    ]);
})->setName('index');