<?php

require_once '../src/Database/Connection.php';

class User
{
    public string $email;
    public string $password;

    public static function findByEmail(String $email)
    {
        $pdo = Connection::getConnection();

        $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->execute([$email]);

        return $stmt->fetch();
    }

    
    public static function getById(int $id)
    {
        $pdo = Connection::getConnection();

        $stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
        $stmt->execute([$id]);

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        return $user;
    }


    public static function create(String $email, String $password)
    {
        $pdo = Connection::getConnection();

        $passwordHash = password_hash($password, PASSWORD_DEFAULT);

        $stmt = $pdo->prepare("INSERT INTO users (email, password) VALUES (?, ?)");

        return $stmt->execute([$email, $passwordHash]);
    }
}
