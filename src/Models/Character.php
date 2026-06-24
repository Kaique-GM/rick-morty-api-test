<?php

require_once '../src/Database/Connection.php';

class Character
{
    public int $api_id;
    public int $user_id;
    public string $name;
    public string $species;
    public string $image;
    public string $url;

    public static function save(int $api_id, int $user_id, string $name, string $species, string $image, string $url)
    {
        $pdo = Connection::getConnection();

        $stmt = $pdo->prepare("INSERT INTO characters (api_id, user_id, name, species, image, url) VALUES (?, ?, ?, ?, ?, ?)");

        return $stmt->execute([$api_id, $user_id, $name, $species, $image, $url]);
    }

    public static function findCharacterByApiIdAndUserId(int $api_id, int $user_id)
    {
        $pdo = Connection::getConnection();

        $stmt = $pdo->prepare("SELECT api_id, user_id FROM characters WHERE api_id = ? AND user_id = ?");
        $stmt->execute([$api_id, $user_id]);

        $character = $stmt->fetch(PDO::FETCH_ASSOC);

        return $character;
    }


    public static function findCharactersByUserId(int $user_id)
    {
        $pdo = Connection::getConnection();

        $stmt = $pdo->prepare("SELECT * FROM characters WHERE user_id = ?");
        $stmt->execute([$user_id]);

        $characters = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $characters;
    }
}
