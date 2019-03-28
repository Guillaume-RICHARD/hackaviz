<?php

$app->get('/analyses', function ($request, $response, $args) {
    return $this->view->render($response, 'analyses.twig', [
        "Title"     => "Données Hackaviz",
        "Page"      => "Page d'analyse des données"
    ]);
})->setName('analyses');