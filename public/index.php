<?php

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

switch ($uri) {

    case '/':
        include 'views/home.html';
        break;

    case '/rotaX':
        include 'views/datails.html';
        break;

    default:
        http_response_code(404);
        echo "Página não encontrada";
        break;
}