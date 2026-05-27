<?php

// Oculta password_hash y normaliza el usuario para Vue.
function cleanUser(array $user): array
{
    return [
        'id' => (int) $user['id'],
        'name' => $user['name'],
        'email' => $user['email'],
        'direccion' => $user['direccion'] ?? '',
        'telefono' => $user['telefono'] ?? '',
        'is_admin' => (int) $user['is_admin'],
    ];
}

// Controlador de login y registro.
function handleUsuarios(PDO $db, string $method, string $resource): void
{
    // Login con email y password.
    if ($resource === 'login' && $method === 'POST') {
        $data = readJson();
        $email = cleanText($data, 'email');
        $password = (string) ($data['password'] ?? '');

        $stmt = $db->prepare('SELECT * FROM users WHERE email = ?');
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if (!$user || !password_verify($password, $user['password_hash'])) {
            sendJson(['error' => 'email o password incorrectos'], 401);
        }

        sendJson(['user' => cleanUser($user)]);
    }

    // Alta de usuario normal.
    if ($resource === 'register' && $method === 'POST') {
        $data = readJson();
        $name = cleanText($data, 'name');
        $email = cleanText($data, 'email');
        $password = (string) ($data['password'] ?? '');

        if ($name === '' || $email === '' || $password === '') {
            sendJson(['error' => 'faltan datos obligatorios'], 422);
        }

        // La contrasena se guarda hasheada, no en texto plano.
        $stmt = $db->prepare(
            'INSERT INTO users (name, email, password_hash, is_admin) VALUES (?, ?, ?, 0)'
        );
        $stmt->execute([$name, $email, password_hash($password, PASSWORD_DEFAULT)]);

        sendJson([
            'user' => [
                'id' => (int) $db->lastInsertId(),
                'name' => $name,
                'email' => $email,
                'direccion' => '',
                'telefono' => '',
                'is_admin' => 0,
            ],
        ], 201);
    }
}
