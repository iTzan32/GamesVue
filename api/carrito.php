<?php

function checkoutError(PDO $db, string $message, int $status = 400): void
{
    if ($db->inTransaction()) {
        $db->rollBack();
    }

    sendJson(['error' => $message], $status);
}

function handleCarrito(PDO $db, string $method): void
{
    if ($method !== 'POST') {
        sendJson(['error' => 'metodo no permitido'], 405);
    }

    $data = readJson();
    $userId = (int) ($data['user_id'] ?? 0);
    $items = $data['items'] ?? [];

    if ($userId <= 0) {
        sendJson(['error' => 'inicia sesion para finalizar la compra'], 422);
    }

    if (!is_array($items) || count($items) === 0) {
        sendJson(['error' => 'el carrito esta vacio'], 422);
    }

    $stmt = $db->prepare('SELECT id, name, email FROM users WHERE id = ?');
    $stmt->execute([$userId]);
    $user = $stmt->fetch();

    if (!$user) {
        sendJson(['error' => 'usuario no encontrado'], 404);
    }

    $db->beginTransaction();

    $total = 0;
    $historyItems = [];

    foreach ($items as $item) {
        $gameId = (int) ($item['id'] ?? 0);
        $quantity = (int) ($item['quantity'] ?? 0);

        if ($gameId <= 0 || $quantity <= 0) {
            checkoutError($db, 'hay un producto no valido', 422);
        }

        $stmt = $db->prepare('SELECT * FROM games WHERE id = ? FOR UPDATE');
        $stmt->execute([$gameId]);
        $game = $stmt->fetch();

        if (!$game) {
            checkoutError($db, 'uno de los juegos ya no existe', 404);
        }

        if ((int) $game['stock'] < $quantity) {
            checkoutError($db, 'no hay stock suficiente de ' . $game['title'], 422);
        }

        $unitPrice = (float) $game['price'];
        $total += $unitPrice * $quantity;

        $historyItems[] = [
            'game_id' => (int) $game['id'],
            'game_title' => $game['title'],
            'game_platform' => $game['platform'],
            'quantity' => $quantity,
            'unit_price' => $unitPrice,
            'line_total' => $unitPrice * $quantity,
        ];
    }

    foreach ($historyItems as $item) {
        $stmt = $db->prepare('UPDATE games SET stock = stock - ? WHERE id = ?');
        $stmt->execute([$item['quantity'], $item['game_id']]);
    }

    $stmt = $db->prepare(
        'INSERT INTO historial_compras (user_id, user_name, user_email, total_amount, items)
         VALUES (?, ?, ?, ?, ?)'
    );
    $stmt->execute([
        $userId,
        $user['name'],
        $user['email'],
        $total,
        json_encode($historyItems, JSON_UNESCAPED_UNICODE),
    ]);
    $compraId = (int) $db->lastInsertId();

    $db->commit();

    sendJson([
        'compra' => [
            'id' => $compraId,
            'total_amount' => round($total, 2),
        ],
    ], 201);
}
