/*
Navicat MySQL Data Transfer

Source Server         : root
Source Server Version : 50718
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50718
File Encoding         : 65001

Date: 2017-06-09 19:55:48
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `ranktable`
-- ----------------------------
DROP TABLE IF EXISTS `ranktable`;
CREATE TABLE `ranktable` (
  `rank` int(1) NOT NULL,
  `grade` int(10) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`rank`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ranktable
-- ----------------------------
INSERT INTO `ranktable` VALUES ('1', '4000', '123');
INSERT INTO `ranktable` VALUES ('2', '2000', 'cat');
INSERT INTO `ranktable` VALUES ('3', '100', 'eirc');

-- ----------------------------
-- Table structure for `test`
-- ----------------------------
DROP TABLE IF EXISTS `test`;
CREATE TABLE `test` (
  `a` char(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of test
-- ----------------------------
