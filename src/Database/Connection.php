<?php

class Connection
{
    public static function getConnection()
    {
        return new PDO(
            'sqlite:' . __DIR__ . '/../../database/database.sqlite'
        );
    }
}