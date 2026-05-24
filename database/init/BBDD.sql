CREATE DATABASE IF NOT EXISTS gamesvue
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE gamesvue;

SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(190) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  is_admin TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY users_email_unique (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS games (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  genre VARCHAR(80) NOT NULL,
  platform VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock INT UNSIGNED NOT NULL DEFAULT 0,
  image VARCHAR(20) NOT NULL DEFAULT '🎮',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT games_price_check CHECK (price >= 0),
  KEY games_title_index (title),
  KEY games_genre_index (genre),
  KEY games_platform_index (platform)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS cart_items (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  game_id INT UNSIGNED NOT NULL,
  quantity INT UNSIGNED NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT cart_items_quantity_check CHECK (quantity > 0),
  UNIQUE KEY cart_items_user_game_unique (user_id, game_id),
  CONSTRAINT cart_items_user_fk FOREIGN KEY (user_id)
    REFERENCES users (id)
    ON DELETE CASCADE,
  CONSTRAINT cart_items_game_fk FOREIGN KEY (game_id)
    REFERENCES games (id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS orders (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NULL,
  status ENUM('pending', 'paid', 'cancelled') NOT NULL DEFAULT 'pending',
  total_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT orders_total_amount_check CHECK (total_amount >= 0),
  KEY orders_user_index (user_id),
  CONSTRAINT orders_user_fk FOREIGN KEY (user_id)
    REFERENCES users (id)
    ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS order_items (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_id INT UNSIGNED NOT NULL,
  game_id INT UNSIGNED NULL,
  game_title VARCHAR(150) NOT NULL,
  game_platform VARCHAR(100) NOT NULL,
  quantity INT UNSIGNED NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT order_items_quantity_check CHECK (quantity > 0),
  CONSTRAINT order_items_unit_price_check CHECK (unit_price >= 0),
  KEY order_items_order_index (order_id),
  KEY order_items_game_index (game_id),
  CONSTRAINT order_items_order_fk FOREIGN KEY (order_id)
    REFERENCES orders (id)
    ON DELETE CASCADE,
  CONSTRAINT order_items_game_fk FOREIGN KEY (game_id)
    REFERENCES games (id)
    ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO users (id, name, email, password_hash, is_admin)
VALUES
  (1, 'Izan', 'izanbelcam@icloud.com', '$2y$10$unKLuAnMogrFLVt.72bySONlDW7XyMS1sucCHWcde1f3cxbWFxmFe', 1),
  (2, 'Adrian', 'adrian@gmail.com', '$2y$10$OFzYMTCnbyOsy6qjBwJX4eDU0GL5LrVR72EfcyiRn/KpwswMQ/dfK', 0)
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  email = VALUES(email),
  password_hash = VALUES(password_hash),
  is_admin = VALUES(is_admin);

INSERT INTO games (id, title, description, genre, platform, price, stock, image)
VALUES
  (1, 'The Legend of Zelda', 'Aventura clasica de exploracion y fantasia', 'Aventura', 'Nintendo Switch', 59.99, 8, '🗡️'),
  (2, 'Minecraft', 'Construccion y supervivencia en mundo abierto', 'Sandbox', 'PC', 29.99, 12, '⛏️'),
  (3, 'FIFA', 'Juego de futbol con equipos y partidos rapidos', 'Deportes', 'PlayStation 5', 49.99, 0, '⚽'),
  (4, 'God of War', 'Accion y aventura con historia principal', 'Accion', 'PlayStation 5', 69.99, 5, '🛡️'),
  (5, 'Stardew Valley', 'Granja, gestion y vida tranquila en un pueblo', 'Simulacion', 'PC', 14.99, 10, '🌱')
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  description = VALUES(description),
  genre = VALUES(genre),
  platform = VALUES(platform),
  price = VALUES(price),
  stock = VALUES(stock),
  image = VALUES(image);
