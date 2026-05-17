<?php

function getDatabaseConnection(): PDO
{
    $host = getenv('DB_HOST') ?: 'db';
    $database = getenv('DB_NAME') ?: 'gamesvue';
    $user = getenv('DB_USER') ?: 'gamesvue_user';
    $password = getenv('DB_PASSWORD') ?: 'gamesvue_password';

    $dsn = "mysql:host={$host};dbname={$database};charset=utf8mb4";

    return new PDO($dsn, $user, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
}
