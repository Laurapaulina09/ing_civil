-- MySQL Script generated by MySQL Workbench
-- Thu May 12 19:22:24 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema db_ingcivil
-- -----------------------------------------------------
-- Tabla Usuarios

-- -----------------------------------------------------
-- Schema db_ingcivil
--
-- Tabla Usuarios
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_ingcivil` DEFAULT CHARACTER SET utf8mb4 ;
USE `db_ingcivil` ;

CREATE TABLE IF NOT EXISTS `db_ingcivil`.`departamentos` (
  `id` VARCHAR(10) NOT NULL,
  `nombre` VARCHAR(70) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;
CREATE TABLE IF NOT EXISTS `db_ingcivil`.`municipios` (
  `id_municipio` VARCHAR(10) NOT NULL,
  `nombre_municipio` VARCHAR(100) NULL,
  `id_departamento` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id_municipio`),
  CONSTRAINT `fk_municipios_departamentos1`
    FOREIGN KEY (`id_departamento`)
    REFERENCES `db_ingcivil`.`departamentos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_ingcivil`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_ingcivil`.`usuario` (
  `primerNombre` VARCHAR(45) NOT NULL,
  `segundoNombre` VARCHAR(45) NOT NULL,
  `primerApellido` VARCHAR(45) NOT NULL,
  `segundoApellido` VARCHAR(45) NOT NULL,
  `celular` VARCHAR(15) NOT NULL,
  `correo` VARCHAR(255) NOT NULL,
  `cedula` VARCHAR(20) NOT NULL,
  `direccion` VARCHAR(200) NOT NULL,
  `nombre_Unidad` VARCHAR(45) NOT NULL,
  `departamentos_id` VARCHAR(10) NOT NULL,
  `municipios_id` VARCHAR(10) NOT NULL,
  `barrio` VARCHAR(45) NOT NULL,
  `tratamientoDatos` TINYINT NULL,
  PRIMARY KEY (`cedula`),
  CONSTRAINT `fk_usuario_departamentos1`
    FOREIGN KEY (`departamentos_id`)
    REFERENCES `db_ingcivil`.`departamentos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_municipios1`
    FOREIGN KEY (`municipios_id`)
    REFERENCES `db_ingcivil`.`municipios` (`id_municipio`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE IF NOT EXISTS `db_ingcivil`.`Administrador` (
  `contrasena` VARCHAR(100) NULL,
  `cedula` VARCHAR(20) NOT NULL,
  INDEX `fk_Administrador_encuestado1_idx` (`cedula` ASC) VISIBLE,
  PRIMARY KEY (`cedula`),
  CONSTRAINT `fk_Administrador_encuestado1`
    FOREIGN KEY (`cedula`)
    REFERENCES `db_ingcivil`.`usuario` (`cedula`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE IF NOT EXISTS `db_ingcivil`.`Encuesta` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nivelFormacion` VARCHAR(45) NOT NULL,
  `añoConstruccion` VARCHAR(50) NOT NULL,
  `añoConstruccionPuntos` INT(2) NULL,
  `ConstruidaPorEntidad` TINYINT NULL,
  `construidaPorEntidadPuntos` INT(2) NULL,
  `nombreConstructora` VARCHAR(45) NULL,
  `encuestadoCedula` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_Encuesta_encuestado1`
    FOREIGN KEY (`encuestadoCedula`)
    REFERENCES `db_ingcivil`.`usuario` (`cedula`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)



-- -----------------------------------------------------
-- Table `db_ingcivil`.`EncuestaViviendaExterior`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_ingcivil`.`EncuestaViviendaExterior` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `area` VARCHAR(45) NULL,
  `imagenFrente` VARCHAR(255) NULL,
  `ubicacion` VARCHAR(45) NULL,
  `ubicacionPuntos` INT(2) NULL,
  `elementosCercanos` VARCHAR(45) NULL,
  `elementosCercanosPuntos` INT(2) NULL,
  `usoActual` VARCHAR(45) NULL,
  `usoActualPuntos` INT(2) NULL,
  `fueUsadaAnteriormente` VARCHAR(45) NULL,
  `usoAnterior` VARCHAR(45) NULL,
  `usoPrimerPiso` VARCHAR(45) NULL,
  `usoPrimerPisoPuntos` INT(2) NULL,
  `totalPisos` VARCHAR(45) NULL,
  `totalPisosPuntos` INT(2) NULL,
  `seUbicaEnElPiso` VARCHAR(45) NULL,
  `seUbicaEnElPisoPuntos` INT(2) NULL,
  `numSotanos` VARCHAR(45) NULL,
  `numSotanosPuntos` INT(2) NULL,
  `comparteMurosConVecinos` VARCHAR(45) NULL,
  `comparteMurosConVecinosPuntos` INT(2) NULL,
  `equiposDentroDeLaEdificacion` VARCHAR(45) NULL,
  `equiposDentroDeLaEdificacionPuntos` INT(2) NULL,
  `Encuesta_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_EncuestaViviendaExterior_Encuesta1`
    FOREIGN KEY (`Encuesta_id`)
    REFERENCES `db_ingcivil`.`Encuesta` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
CREATE TABLE IF NOT EXISTS `db_ingcivil`.`EncuestaViviendaInterior` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `alturaEntrePisos` VARCHAR(45) NULL,
  `alturaEntrePisosPuntos` INT(2) NULL,
  `materialDeConstruccion` VARCHAR(45) NULL,
  `materialDeConstruccionPuntos` INT(2) NULL,
  `tipoMamposteriaConcretoPrefabricado` VARCHAR(45) NULL,
  `EncuestaViviendaInteriorcol` VARCHAR(45) NULL,
  `tipoMamposteriaConcretoPrefabricadoPuntos` INT(2) NULL,
  `tipoEntrePiso` VARCHAR(45) NULL,
  `tipoEntrePisoPuntos` INT(2) NULL,
  `tipoTecho` VARCHAR(45) NULL,
  `tipoTechoPuntos` INT(2) NULL,
  `estadoEdificacion` VARCHAR(45) NULL,
  `estadoEdificacionPuntos` INT(2) NULL,
  `estadoEdifacionImgLejana` VARCHAR(255) NULL,
  `estadoEdifacionImgCercanaAObjeto` VARCHAR(255) NULL,
  `tieneGrietas` VARCHAR(45) NULL,
  `tieneGrietasPuntos` INT(2) NULL,
  `tieneGrietasImgLejana` VARCHAR(255) NULL,
  `EncuestaViviendaImgCercanaAObjeto` VARCHAR(255) NULL,
  `Encuesta_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_EncuestaViviendaInterior_Encuesta1`
    FOREIGN KEY (`Encuesta_id`)
    REFERENCES `db_ingcivil`.`Encuesta` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
