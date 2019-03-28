<?php

$app->get('/maps', function ($request, $response, $args) {
    return $this->view->render($response, 'maps.twig', [
        "Title"     => "Cartes",
        "Page"      => "Page de visualisations cartographiques"
    ]);
})->setName('maps');