<?php

// Convierte datos de MySQL al formato que usa Vue.
function cleanGame(array $game): array
{
    return [
        'id' => (int) $game['id'],
        'title' => $game['title'],
        'description' => $game['description'],
        'genre' => $game['genre'],
        'platform' => $game['platform'],
        'price' => (float) $game['price'],
        'stock' => (int) $game['stock'],
        'image' => $game['image'],
    ];
}

// Busca un juego por id.
function getGame(PDO $db, int $id): ?array
{
    $stmt = $db->prepare('SELECT * FROM games WHERE id = ?');
    $stmt->execute([$id]);
    $game = $stmt->fetch();
    return $game ? cleanGame($game) : null;
}

// Valida y prepara datos de un juego recibido.
function gameData(array $data): array
{
    $game = [
        'title' => cleanText($data, 'title'),
        'description' => cleanText($data, 'description'),
        'genre' => cleanText($data, 'genre'),
        'platform' => cleanText($data, 'platform'),
        'price' => (float) ($data['price'] ?? -1),
        'stock' => (int) ($data['stock'] ?? -1),
        'image' => cleanText($data, 'image') ?: '🎮',
    ];

    // Campos obligatorios antes de guardar.
    if (
        $game['title'] === ''
        || $game['description'] === ''
        || $game['genre'] === ''
        || $game['platform'] === ''
        || $game['price'] < 0
        || $game['stock'] < 0
    ) {
        sendJson(['error' => 'faltan datos obligatorios del juego'], 422);
    }

    return $game;
}

// Controlador de /games.
function handleJuegos(PDO $db, string $method, array $parts): void
{
    // Listar juegos.
    if ($method === 'GET') {
        $stmt = $db->query('SELECT * FROM games ORDER BY id');
        $games = $stmt->fetchAll();
        sendJson(['games' => array_map('cleanGame', $games)]);
    }

    // Crear juego.
    if ($method === 'POST') {
        $game = gameData(readJson());
        $stmt = $db->prepare(
            'INSERT INTO games (title, description, genre, platform, price, stock, image)
             VALUES (?, ?, ?, ?, ?, ?, ?)'
        );
        $stmt->execute([
            $game['title'],
            $game['description'],
            $game['genre'],
            $game['platform'],
            $game['price'],
            $game['stock'],
            $game['image'],
        ]);

        sendJson(['game' => getGame($db, (int) $db->lastInsertId())], 201);
    }

    // Actualizar juego existente.
    if ($method === 'PUT') {
        $id = idFromRoute($parts);
        $game = gameData(readJson());
        $stmt = $db->prepare(
            'UPDATE games
             SET title = ?, description = ?, genre = ?, platform = ?, price = ?, stock = ?, image = ?
             WHERE id = ?'
        );
        $stmt->execute([
            $game['title'],
            $game['description'],
            $game['genre'],
            $game['platform'],
            $game['price'],
            $game['stock'],
            $game['image'],
            $id,
        ]);

        $updatedGame = getGame($db, $id);
        if (!$updatedGame) {
            sendJson(['error' => 'juego no encontrado'], 404);
        }
        sendJson(['game' => $updatedGame]);
    }

    // Borrar juego.
    if ($method === 'DELETE') {
        $id = idFromRoute($parts);
        $stmt = $db->prepare('DELETE FROM games WHERE id = ?');
        $stmt->execute([$id]);
        sendJson(['message' => 'juego borrado']);
    }
}
