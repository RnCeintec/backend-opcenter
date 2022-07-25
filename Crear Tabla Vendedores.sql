CREATE TABLE `vendedor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isActive` tinyint(4) NOT NULL DEFAULT '1',
  `nombres` varchar(255) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `documento` varchar(255) NOT NULL,
  `telefono` int(11) NOT NULL,
  `fecha_creacion` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `fecha_actualizacion` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `tipo_documento` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
