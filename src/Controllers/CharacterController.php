<?php

require_once '../src/Models/Character.php';

class CharacterController
{

    public static function saveCharacter()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        if (!isset($data['api_id'], $data['user_id'], $data['name'], $data['species'], $data['image'], $data['url'])) {
            http_response_code(400);
            exit('Dados inválidos');
        }

        $characterExists = Character::findCharacterByApiIdAndUserId($data['api_id'], $data['user_id']);

        if ($characterExists) {
            http_response_code(409);
            exit('Personagem já cadastrado!');
        }

        Character::save($data['api_id'], $data['user_id'], $data['name'], $data['species'], $data['image'], $data['url']);

        http_response_code(200);
        echo 'Personagem salvo com sucesso!';
        exit;
    }

    public static function checkCharacter()
    {
        header('Content-Type: application/json');

        $data = json_decode(file_get_contents('php://input'), true);

        if (!isset($data['api_id'], $data['user_id'], $data['name'], $data['species'], $data['image'], $data['url'])) {
            http_response_code(400);
            exit('Dados inválidos');
        }

        $characterExists = Character::findCharacterByApiIdAndUserId($data['api_id'], $data['user_id']);

        echo json_encode([
            'exists' => $characterExists ? true : false
        ]);
        exit;
    }

    public static function findAllCharacters()
    {

        header('Content-Type: application/json');

        $data = json_decode(file_get_contents('php://input'), true);

        if (!isset($data['user_id'])) {
            http_response_code(400);
            exit('Usuário não está logado');
        }

        $characters = Character::findCharactersByUserId($data['user_id']);

        echo json_encode([
            'characters' => $characters
        ]);
        exit;
    }
}
