<?php

$app->get('/communes', function ($request, $response, $args) use ($getCsv) {
    $data = $getCsv->readFile("par_commune");

    return $this->view->render($response, 'communes.twig', [
        "Title"     => "Données Hackaviz",
        "Page"      => "Page des trajets",
        "Headers"   => $data["header"],
        "Infos"     => $data["infos"]
    ]);
})->setName('communes');