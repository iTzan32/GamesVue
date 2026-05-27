<?php

// Crea la conexion reutilizable con MySQL.
function getDatabaseConnection(): PDO
{
    // Variables de Docker, con valores por defecto.
    $host = getenv('DB_HOST') ?: 'db';
    $database = getenv('DB_NAME') ?: 'gamesvue';
    $user = getenv('DB_USER') ?: 'gamesvue_user';
    $password = getenv('DB_PASSWORD') ?: 'gamesvue_password';

    // DSN indica host, base de datos y codificacion.
    $dsn = "mysql:host={$host};dbname={$database};charset=utf8mb4";

    // PDO lanza excepciones y devuelve arrays asociativos.
    return new PDO($dsn, $user, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
}
