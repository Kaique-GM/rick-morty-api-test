<?php

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

switch ($uri) {

    case '/':
        include 'views/home.html';
        break;

    case '/personagem':
        include 'views/datails.html';
        break;

    case '/personagens':
        include 'views/characters.html';
        break;

    case '/sobre':
        include 'views/about.html';
        break;

    case '/login':
        include 'views/login.html';
        break;

    default:
        http_response_code(404);
        echo "Página não encontrada";
        break;
}
