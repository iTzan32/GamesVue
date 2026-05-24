<?php

function handleAdmin(PDO $db, string $method, array $parts): void
{
    if ($method === 'GET') {
        $stmt = $db->query('SELECT id, name, email, is_admin FROM users ORDER BY id');
        sendJson(['users' => array_map('cleanUser', $stmt->fetchAll())]);
    }

    if ($method === 'PUT') {
        $id = idFromRoute($parts);
        $data = readJson();
        $name = cleanText($data, 'name');
        $email = cleanText($data, 'email');
        $isAdmin = (int) ($data['is_admin'] ?? 0);
        $password = (string) ($data['password'] ?? '');

        if ($name === '' || $email === '') {
            sendJson(['error' => 'faltan datos obligatorios del usuario'], 422);
        }

        if (trim($password) !== '') {
            $stmt = $db->prepare(
                'UPDATE users SET name = ?, email = ?, password_hash = ?, is_admin = ? WHERE id = ?'
            );
            $stmt->execute([$name, $email, password_hash($password, PASSWORD_DEFAULT), $isAdmin, $id]);
        } else {
            $stmt = $db->prepare('UPDATE users SET name = ?, email = ?, is_admin = ? WHERE id = ?');
            $stmt->execute([$name, $email, $isAdmin, $id]);
        }

        $stmt = $db->prepare('SELECT id, name, email, is_admin FROM users WHERE id = ?');
        $stmt->execute([$id]);
        $user = $stmt->fetch();

        if (!$user) {
            sendJson(['error' => 'usuario no encontrado'], 404);
        }

        sendJson(['user' => cleanUser($user)]);
    }

    if ($method === 'DELETE') {
        $id = idFromRoute($parts);
        $stmt = $db->prepare('DELETE FROM users WHERE id = ?');
        $stmt->execute([$id]);
        sendJson(['message' => 'usuario borrado']);
    }
}
