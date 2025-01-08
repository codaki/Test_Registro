-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: asistenciadcco
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `coleccion_fotos`
--

DROP TABLE IF EXISTS `coleccion_fotos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coleccion_fotos` (
  `Coleccion_Id` int NOT NULL,
  `Ruta_Carpeta` varchar(255) NOT NULL,
  `Profesor_ID` int DEFAULT NULL,
  PRIMARY KEY (`Coleccion_Id`),
  KEY `Profesor_ID` (`Profesor_ID`),
  CONSTRAINT `coleccion_fotos_ibfk_1` FOREIGN KEY (`Profesor_ID`) REFERENCES `profesor` (`Profesor_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coleccion_fotos`
--

LOCK TABLES `coleccion_fotos` WRITE;
/*!40000 ALTER TABLE `coleccion_fotos` DISABLE KEYS */;
/*!40000 ALTER TABLE `coleccion_fotos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hora`
--

DROP TABLE IF EXISTS `hora`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hora` (
  `Hora_Id` int NOT NULL,
  `Hora_registro` time NOT NULL,
  `Tiempo_Gracia` int NOT NULL,
  PRIMARY KEY (`Hora_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hora`
--

LOCK TABLES `hora` WRITE;
/*!40000 ALTER TABLE `hora` DISABLE KEYS */;
/*!40000 ALTER TABLE `hora` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profesor`
--

DROP TABLE IF EXISTS `profesor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profesor` (
  `Profesor_ID` int NOT NULL,
  `Docente_ID` varchar(10) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Usuario_ID` int DEFAULT NULL,
  PRIMARY KEY (`Profesor_ID`),
  KEY `Usuario_ID` (`Usuario_ID`),
  CONSTRAINT `profesor_ibfk_1` FOREIGN KEY (`Usuario_ID`) REFERENCES `usuario` (`Usuario_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesor`
--

LOCK TABLES `profesor` WRITE;
/*!40000 ALTER TABLE `profesor` DISABLE KEYS */;
/*!40000 ALTER TABLE `profesor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profesor_hora`
--

DROP TABLE IF EXISTS `profesor_hora`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profesor_hora` (
  `Profesor_Id` int NOT NULL,
  `Hora_Id` int NOT NULL,
  `Dia` varchar(10) NOT NULL,
  `Aula` varchar(50) NOT NULL,
  `Periodo` varchar(10) NOT NULL,
  PRIMARY KEY (`Profesor_Id`,`Hora_Id`,`Dia`),
  KEY `Hora_Id` (`Hora_Id`),
  CONSTRAINT `profesor_hora_ibfk_1` FOREIGN KEY (`Profesor_Id`) REFERENCES `profesor` (`Profesor_ID`),
  CONSTRAINT `profesor_hora_ibfk_2` FOREIGN KEY (`Hora_Id`) REFERENCES `hora` (`Hora_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesor_hora`
--

LOCK TABLES `profesor_hora` WRITE;
/*!40000 ALTER TABLE `profesor_hora` DISABLE KEYS */;
/*!40000 ALTER TABLE `profesor_hora` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registro`
--

DROP TABLE IF EXISTS `registro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registro` (
  `Registro_id` int NOT NULL,
  `Profesor_id` int DEFAULT NULL,
  `Fecha` datetime NOT NULL,
  `Lugar` varchar(100) NOT NULL,
  `Bool_Inicio` tinyint(1) NOT NULL,
  `Tarde` tinyint(1) NOT NULL,
  PRIMARY KEY (`Registro_id`),
  KEY `Profesor_id` (`Profesor_id`),
  CONSTRAINT `registro_ibfk_1` FOREIGN KEY (`Profesor_id`) REFERENCES `profesor` (`Profesor_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registro`
--

LOCK TABLES `registro` WRITE;
/*!40000 ALTER TABLE `registro` DISABLE KEYS */;
/*!40000 ALTER TABLE `registro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `Rol_Id` int NOT NULL,
  `Rol_Nombre` varchar(50) NOT NULL,
  `Rol_Permiso` varchar(255) NOT NULL,
  PRIMARY KEY (`Rol_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `Usuario_ID` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(50) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Nombre1` varchar(50) NOT NULL,
  `Nombre2` varchar(50) DEFAULT NULL,
  `Apellido1` varchar(50) NOT NULL,
  `Apellido2` varchar(50) DEFAULT NULL,
  `Rol_ID` int DEFAULT NULL,
  PRIMARY KEY (`Usuario_ID`),
  KEY `Rol_ID` (`Rol_ID`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`Rol_ID`) REFERENCES `rol` (`Rol_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-31 13:33:42
