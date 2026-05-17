<?php

header('Content-Type: application/json; charset=utf-8');

echo json_encode([
    'project' => 'GamesVue',
    'service' => 'api',
    'status' => 'ready',
    'message' => 'API base preparada con PHP, Apache y PDO.'
], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
