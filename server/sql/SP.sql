DELIMITER $$
CREATE PROCEDURE altaUsuarioNoValidado(IN unNombre VARCHAR(45),
                                       IN unEmail VARCHAR(75),
                                       IN unContrasena VARCHAR(75),
                                       IN unCodigo BIGINT)
BEGIN
    INSERT INTO UsuarioNoValidado(Nombre, Email, Contrasena, Fecha_creacion, Codigo)
        VALUES  (unNombre, unEmail, unContrasena, NOW(), unCodigo);
END
$$

DELIMITER $$
CREATE PROCEDURE altaUsuario(IN unNombre VARCHAR(45),
                             IN unEmail VARCHAR(75),
                             IN unContrasena VARCHAR(75),
                             IN unCodigo BIGINT)
BEGIN
    INSERT INTO Usuario(Nombre, Email, Contrasena, Fecha_creacion, Codigo)
        VALUES  (unNombre, unEmail, unContrasena, NOW(), unCodigo);
END
$$

DELIMITER $$
CREATE PROCEDURE obtenerEmailNoValidado(IN unEmail VARCHAR(75))
BEGIN
    SELECT  *
    FROM    `UsuarioNoValidado`
    WHERE   `Email` = unEmail;
END
$$ 

DELIMITER $$
CREATE PROCEDURE obtenerEmail(IN unEmail VARCHAR(75))
BEGIN
    SELECT  *
    FROM    `Usuario`
    WHERE   `Email` = unEmail;
END
$$ 