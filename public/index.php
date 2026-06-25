<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);
date_default_timezone_set('America/Sao_Paulo');

require_once '../src/Controllers/AuthController.php';
require_once '../src/Controllers/CharacterController.php';

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

    case '/logout':
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            http_response_code(405);
            exit;
        }

        AuthController::logout();
        break;

    case '/me':
        echo json_encode([
            'logged' => isset($_SESSION['user_id']),
            'user_id' => $_SESSION['user_id'] ?? null,
        ]);
        break;

    case '/saveCharacter':
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            http_response_code(405);
            exit;
        }

        CharacterController::saveCharacter();
        break;

    case '/getCharacters':
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            http_response_code(405);
            exit;
        }

        CharacterController::findAllCharacters();
        break;

    case '/checkCharacter':
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            http_response_code(405);
            exit;
        }

        CharacterController::checkCharacter();
        break;

    case '/deleteCharacter':
        if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
            http_response_code(405);
            exit;
        }

        CharacterController::deleteCharacter();
        break;

    case '/editCharacter':
        if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
            http_response_code(405);
            exit;
        }

        CharacterController::editCharacter();
        break;

    default:
        include 'views/404.html';
        http_response_code(404);
        break;
}
