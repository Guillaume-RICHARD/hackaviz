<?php

include_once ("vendor/autoload.php");

use App\getCsv as getCsv;
use Slim\App as Slim;

// Configuration pour afficher les erreurs Slim/Twig
$configuration = [
    'settings' => [
        'displayErrorDetails' => true,
    ],
];
$c = new \Slim\Container($configuration);

$app = new Slim($c);
$getCsv = new getCsv();

// Fetch DI Container
$container = $app->getContainer();

// Register Twig View helper
$container['view'] = function ($c) {
    $view = new \Slim\Views\Twig('views/twig', [
        // 'cache' => 'views/cache'
    ]);

    // Instantiate and add Slim specific extension
    $router = $c->get('router');
    $uri = \Slim\Http\Uri::createFromEnvironment(new \Slim\Http\Environment($_SERVER));
    $view->addExtension(new \Slim\Views\TwigExtension($router, $uri));

    return $view;
};

// les différentes Routes du projet
$list = glob("routes/*.php");
foreach ($list as $l) {
    include_once "$l";
}

$app->run();