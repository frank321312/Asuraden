DROP DATABASE IF EXISTS Crud_Asuraden;
CREATE DATABASE Crud_Asuraden;
USE Crud_Asuraden;

CREATE TABLE UsuarioNoValidado
(
    Nombre VARCHAR(45) NOT NULL,
    Email VARCHAR(75) NOT NULL,
    Contrasena VARCHAR(45) NOT NULL,
    Fecha_Creacion DATETIME,
    IdNoValidado INT AUTO_INCREMENT,
    Codigo BIGINT,
    CONSTRAINT PK_IdNoValidado PRIMARY KEY (IdNoValidado)
);

CREATE TABLE Usuario
(
    Nombre VARCHAR(45) NOT NULL,
    Email VARCHAR(75) NOT NULL,
    Contrasena VARCHAR(45) NOT NULL,
    Fecha_Creacion DATETIME,
    UsuarioId INT AUTO_INCREMENT,
    Codigo BIGINT,
    CONSTRAINT PK_UsuarioId PRIMARY KEY (UsuarioId)
);