<?php

// Controlador para gestionar usuarios desde admin.
function handleAdmin(PDO $db, string $method, array $parts): void
{
    // Lista usuarios sin mostrar password_hash.
    if ($method === 'GET') {
        $stmt = $db->query('SELECT id, name, email, direccion, telefono, is_admin FROM users ORDER BY id');
        sendJson(['users' => array_map('cleanUser', $stmt->fetchAll())]);
    }

    // Actualiza datos y rol de usuario.
    if ($method === 'PUT') {
        $id = idFromRoute($parts);
        $data = readJson();
        $name = cleanText($data, 'name');
        $email = cleanText($data, 'email');
        $direccion = cleanText($data, 'direccion');
        $telefono = cleanText($data, 'telefono');
        $password = (string) ($data['password'] ?? '');

        if ($name === '' || $email === '') {
            sendJson(['error' => 'faltan datos obligatorios del usuario'], 422);
        }

        $stmt = $db->prepare('SELECT * FROM users WHERE id = ?');
        $stmt->execute([$id]);
        $currentUser = $stmt->fetch();

        if (!$currentUser) {
            sendJson(['error' => 'usuario no encontrado'], 404);
        }

        // Si no llega is_admin, conserva el rol anterior.
        $isAdmin = array_key_exists('is_admin', $data)
            ? (int) $data['is_admin']
            : (int) $currentUser['is_admin'];

        // Solo cambia password si el campo no esta vacio.
        if (trim($password) !== '') {
            $stmt = $db->prepare(
                'UPDATE users SET name = ?, email = ?, direccion = ?, telefono = ?, password_hash = ?, is_admin = ? WHERE id = ?'
            );
            $stmt->execute([$name, $email, $direccion, $telefono, password_hash($password, PASSWORD_DEFAULT), $isAdmin, $id]);
        } else {
            $stmt = $db->prepare(
                'UPDATE users SET name = ?, email = ?, direccion = ?, telefono = ?, is_admin = ? WHERE id = ?'
            );
            $stmt->execute([$name, $email, $direccion, $telefono, $isAdmin, $id]);
        }

        $stmt = $db->prepare('SELECT id, name, email, direccion, telefono, is_admin FROM users WHERE id = ?');
        $stmt->execute([$id]);
        $user = $stmt->fetch();

        if (!$user) {
            sendJson(['error' => 'usuario no encontrado'], 404);
        }

        sendJson(['user' => cleanUser($user)]);
    }

    // Borra usuario por id.
    if ($method === 'DELETE') {
        $id = idFromRoute($parts);
        $stmt = $db->prepare('DELETE FROM users WHERE id = ?');
        $stmt->execute([$id]);
        sendJson(['message' => 'usuario borrado']);
    }
}
