-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2023. Ápr 05. 12:13
-- Kiszolgáló verziója: 10.4.6-MariaDB
-- PHP verzió: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `2123szft_solar`
--
CREATE DATABASE IF NOT EXISTS `2123szft_solar` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE `2123szft_solar`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `hmke`
--

CREATE TABLE `hmke` (
  `ID` int(11) NOT NULL,
  `nev` varchar(30) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `hmke`
--

INSERT INTO `hmke` (`ID`, `nev`) VALUES
(1, 'Napelem rendszer'),
(2, 'Szénerőmű');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `termeles`
--

CREATE TABLE `termeles` (
  `ID` int(11) NOT NULL,
  `datum` date NOT NULL,
  `termeles` float NOT NULL,
  `HMKE` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `termeles`
--

INSERT INTO `termeles` (`ID`, `datum`, `termeles`, `HMKE`) VALUES
(1, '2018-07-12', 13.5, 1);

-- --------------------------------------------------------

--
-- A nézet helyettes szerkezete `termeles_nezet`
-- (Lásd alább az aktuális nézetet)
--
CREATE TABLE `termeles_nezet` (
`ID` int(11)
,`datum` date
,`termeles` float
,`HMKE_ID` int(11)
,`HMKE` varchar(30)
);

-- --------------------------------------------------------

--
-- Nézet szerkezete `termeles_nezet`
--
DROP TABLE IF EXISTS `termeles_nezet`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `termeles_nezet`  AS  select `termeles`.`ID` AS `ID`,`termeles`.`datum` AS `datum`,`termeles`.`termeles` AS `termeles`,`termeles`.`HMKE` AS `HMKE_ID`,`hmke`.`nev` AS `HMKE` from (`termeles` join `hmke` on(`hmke`.`ID` = `termeles`.`HMKE`)) ;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `hmke`
--
ALTER TABLE `hmke`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `termeles`
--
ALTER TABLE `termeles`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `HMKE` (`HMKE`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `hmke`
--
ALTER TABLE `hmke`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `termeles`
--
ALTER TABLE `termeles`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `termeles`
--
ALTER TABLE `termeles`
  ADD CONSTRAINT `termeles_ibfk_1` FOREIGN KEY (`HMKE`) REFERENCES `hmke` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
