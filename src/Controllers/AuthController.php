<?php

require_once '../src/Models/User.php';

class AuthController
{
    public static function register()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        if (empty($data['email']) || empty($data['password'])) {
            http_response_code(400);
            exit('E-mail e senha são obrigatórios');
        }

        $user = User::findByEmail($data['email']);

        if ($user) {
            http_response_code(409);
            exit('E-mail já cadastrado');
        }

        User::create($data['email'], $data['password']);
    }

    public static function login()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        if (empty($data['email']) || empty($data['password'])) {
            http_response_code(400);
            exit('E-mail e senha são obrigatórios');
        }

        $user = User::findByEmail($data['email']);

        if (!$user) {
            http_response_code(401);
            exit('Usuário não encontrado');
        }

        $user = User::getById($user['id']);

        if (!password_verify($data['password'], $user['password'])) {
            http_response_code(401);
            exit('E-mail ou senha inválidos');
        }

        $_SESSION['user_id'] = $user['id'];
    }
}
