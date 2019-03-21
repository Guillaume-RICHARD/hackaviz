<?php

$app->get('/trajets', function ($request, $response, $args) use ($getCsv) {
    $data = $getCsv->readFile("par_trajet");

    return $this->view->render($response, 'trajets.twig', [
        "Title"     => "Données Hackaviz",
        "Page"      => "Page des trajets",
        "Headers"   => $data["header"],
        "Infos"     => $data["infos"]
    ]);
})->setName('trajets');