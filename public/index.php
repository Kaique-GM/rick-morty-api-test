<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once '../src/Controllers/AuthController.php';

session_start();

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

    case '/cadastrar':
        include 'views/register.html';
        break;

    case '/login':
        include 'views/login.html';
        break;

    case '/register':
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            http_response_code(405);
            exit;
        }

        AuthController::register();
        break;

    case '/loginUser':
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            http_response_code(405);
            exit;
        }

        AuthController::login();
        break;

    case '/me':
        echo json_encode([
            'logged' => isset($_SESSION['user_id']),
            'user_id' => $_SESSION['user_id'] ?? null,
        ]);
        break;

    default:
        http_response_code(404);
        echo "Página não encontrada";
        break;
}
