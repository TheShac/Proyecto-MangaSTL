CREATE DATABASE DBtienda;

USE DBtienda;

DROP TABLE USUARIO;

-- TABLAS DE USUARIOS --

-- Usuario principal
CREATE TABLE Usuario (
    uuid_user CHAR(36) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100),
    email VARCHAR(150) NOT NULL,
    telefono VARCHAR(100) NOT NULL
)ENGINE = InnoDB
DEFAULT CHARSET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

-- Usuario cliente registrado
CREATE TABLE UserCustomer (
    uuid_user CHAR(36) PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    FOREIGN KEY (uuid_user) REFERENCES Usuario(uuid_user)
)ENGINE = InnoDB
DEFAULT CHARSET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

-- Usuario cliente anonimo
CREATE TABLE UnknownCustomer (
    uuid_user CHAR(36) PRIMARY KEY,
    fecha_ultima_compra DATETIME,
    FOREIGN KEY (uuid_user) REFERENCES Usuario(uuid_user)
)ENGINE = InnoDB
DEFAULT CHARSET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

-- Usuario empleado o administrador
CREATE TABLE UserEmpsTL (
    uuid_user CHAR(36) PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol ENUM('stl_emps','stl_administrador','stl_super_administrador') NOT NULL,
    FOREIGN KEY (uuid_user) REFERENCES Usuario(uuid_user)
)ENGINE = InnoDB
DEFAULT CHARSET = utf8mb4
COLLATE = utf8mb4_unicode_ci;
-- TABLAS DE USUARIOS --


-- TABLA DE DIRECCION --
CREATE TABLE Address
(
  id_adress INT NOT NULL AUTO_INCREMENT,
  pais VARCHAR(100) NOT NULL,
  codigo_postal INT,
  ciudad VARCHAR(100) NOT NULL,
  direccion VARCHAR(100) NOT NULL,
  uuid_user CHAR(36),
  PRIMARY KEY (id_adress),
  FOREIGN KEY (uuid_user) REFERENCES Usuario(uuid_user)
)ENGINE = InnoDB
DEFAULT CHARSET = utf8mb4
COLLATE = utf8mb4_unicode_ci;
-- TABLA DE DIRECCION --

-- TABLA PEDIDO --
CREATE TABLE Pedido
(
  id_pedido VARCHAR(20) NOT NULL,
  fecha_pedido DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  estado ENUM('pendiente', 'pagado','enviado', 'cancelado') NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  uuid_user INT NOT NULL,
  PRIMARY KEY (id_pedido),
  FOREIGN KEY (id_user) REFERENCES Usuario(uuid_user)
)ENGINE = InnoDB
DEFAULT CHARSET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

CREATE TABLE Producto
(
  id_producto INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  descripcion VARCHAR(225) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL,
  imagen_url VARCHAR(225) NOT NULL,
  estado BOOLEAN NOT NULL DEFAULT TRUE,
  PRIMARY KEY (id_producto)
)ENGINE = InnoDB
DEFAULT CHARSET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

CREATE TABLE DetallePedido
(
  id_detalle INT NOT NULL AUTO_INCREMENT,
  cantidad INT NOT NULL,
  precio_unitario DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(10,2) AS (cantidad * precio_unitario) STORED,
  id_pedido VARCHAR(20) NOT NULL,
  id_producto INT NOT NULL,
  PRIMARY KEY (id_detalle),
  FOREIGN KEY (id_pedido) REFERENCES Pedido(id_pedido),
  FOREIGN KEY (id_producto) REFERENCES Producto(id_producto)
)ENGINE = InnoDB
DEFAULT CHARSET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

CREATE TABLE Categoria
(
  id_categoria INT NOT NULL AUTO_INCREMENT,
  editorial VARCHAR(100) NOT NULL,
  PRIMARY KEY (id_categoria),
  UNIQUE (editorial)
)ENGINE = InnoDB
DEFAULT CHARSET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

CREATE TABLE ProductoCategoria (
  id_producto INT NOT NULL,
  id_categoria INT NOT NULL,
  PRIMARY KEY (id_producto, id_categoria),
  FOREIGN KEY (id_producto) REFERENCES Producto(id_producto),
  FOREIGN KEY (id_categoria) REFERENCES Categoria(id_categoria)
)ENGINE = InnoDB
DEFAULT CHARSET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

CREATE TABLE Genero 
(
  id_genero INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  PRIMARY KEY (id_genero),
  UNIQUE (nombre)
)ENGINE = InnoDB
DEFAULT CHARSET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

CREATE TABLE ProductoGenero 
(
  id_producto INT NOT NULL,
  id_genero INT NOT NULL,
  PRIMARY KEY (id_producto, id_genero),
  FOREIGN KEY (id_producto) REFERENCES Producto(id_producto),
  FOREIGN KEY (id_genero) REFERENCES Genero(id_genero)
)ENGINE = InnoDB
DEFAULT CHARSET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

-- =============================
-- TRIGGER PARA GENERAR ID DE PEDIDO
-- =============================
DELIMITER $$

CREATE TRIGGER generar_id_pedido
BEFORE INSERT ON Pedido
FOR EACH ROW
BEGIN
    DECLARE fecha_str CHAR(8);
    DECLARE aleatorio CHAR(5);

    -- Formato YYYYMMDD
    SET fecha_str = DATE_FORMAT(NOW(), '%Y%m%d');

    -- Generar código aleatorio en SQL
    SET aleatorio = UPPER(SUBSTRING(MD5(RAND()), 1, 5));

    -- Solo genera si no se pasó un id_pedido manualmente
    IF NEW.id_pedido IS NULL OR NEW.id_pedido = '' THEN
        SET NEW.id_pedido = CONCAT('PED-', fecha_str, '-', aleatorio);
    END IF;
END$$

DELIMITER ;

