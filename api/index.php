<?php

require __DIR__ . '/config/database.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function sendJson(array $data, int $status = 200): void
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

function readJson(): array
{
    $body = file_get_contents('php://input');

    if ($body === false || trim($body) === '') {
        return [];
    }

    $data = json_decode($body, true);
    return is_array($data) ? $data : [];
}

function routeParts(): array
{
    $path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
    $scriptName = $_SERVER['SCRIPT_NAME'] ?? '';

    if ($scriptName !== '' && str_starts_with($path, $scriptName)) {
        $path = substr($path, strlen($scriptName));
    }

    $path = trim($path, '/');
    return $path === '' ? [] : explode('/', $path);
}

function cleanText(array $data, string $key): string
{
    return trim((string) ($data[$key] ?? ''));
}

function idFromRoute(array $parts): int
{
    $id = (int) ($parts[1] ?? 0);

    if ($id <= 0) {
        sendJson(['error' => 'id no valido'], 400);
    }

    return $id;
}

require __DIR__ . '/usuarios.php';
require __DIR__ . '/juegos.php';
require __DIR__ . '/admin.php';
require __DIR__ . '/carrito.php';

$method = $_SERVER['REQUEST_METHOD'];
$parts = routeParts();
$resource = $parts[0] ?? '';

try {
    $db = getDatabaseConnection();

    if ($resource === '') {
        sendJson([
            'project' => 'GamesVue',
            'service' => 'api',
            'status' => 'ready',
            'endpoints' => [
                'GET /index.php/games',
                'POST /index.php/login',
                'POST /index.php/register',
                'GET /index.php/users',
                'POST /index.php/checkout',
            ],
        ]);
    }

    if ($resource === 'login' || $resource === 'register') {
        handleUsuarios($db, $method, $resource);
    }

    if ($resource === 'games') {
        handleJuegos($db, $method, $parts);
    }

    if ($resource === 'users') {
        handleAdmin($db, $method, $parts);
    }

    if ($resource === 'checkout') {
        handleCarrito($db, $method);
    }

    sendJson(['error' => 'ruta no encontrada'], 404);
} catch (PDOException $exception) {
    if ($exception->getCode() === '23000') {
        sendJson(['error' => 'ya existe un registro con esos datos'], 409);
    }

    sendJson(['error' => 'error de base de datos'], 500);
}
