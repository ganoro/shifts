-- phpMyAdmin SQL Dump
-- version 3.3.10
-- http://www.phpmyadmin.net
--
-- Host: devuserdb2.cisme8plcp0e.us-east-1.rds.amazonaws.com
-- Generation Time: Jan 29, 2012 at 06:03 PM
-- Server version: 5.1.57
-- PHP Version: 5.3.8-ZS5.5.0

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `royganor`
--

-- --------------------------------------------------------

--
-- Table structure for table `shifts`
--

CREATE TABLE IF NOT EXISTS `shifts` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'event id',
  `user_id` int(11) NOT NULL COMMENT 'user id',
  `date` date NOT NULL COMMENT 'date of event',
  `type` varchar(10) NOT NULL COMMENT 'type of event',
  `comments` varchar(100) DEFAULT NULL COMMENT 'comments',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `shifts`
--

