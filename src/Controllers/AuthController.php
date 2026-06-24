<?php

require_once '../src/Database/Connection.php';

class AuthController
{
    public static function register()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        if (empty($data['email']) || empty($data['password'])) {
            http_response_code(400);
            exit('E-mail e senha são obrigatórios');
        }

        $pdo = Connection::getConnection();

        $check = $pdo->prepare("SELECT id FROM users WHERE email = ?");
        $check->execute([$data['email']]);
        if ($check->fetch()) {
            http_response_code(409);
            exit('E-mail já cadastrado');
        }

        $stmt = $pdo->prepare("
        INSERT INTO users (email, password)
        VALUES (?, ?)");

        $passwordHash = password_hash(
            $data['password'],
            PASSWORD_DEFAULT
        );

        $stmt->execute([
            $data['email'],
            $passwordHash
        ]);

        echo "usuário criado";
    }
}
