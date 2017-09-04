CREATE USER 'travel'@'localhost' IDENTIFIED BY '1111';

CREATE DATABASE traveldb
  DEFAULT CHARACTER SET utf8
  DEFAULT COLLATE utf8_general_ci;

GRANT ALL ON traveldb.* TO 'travel'@'localhost';





