# Mobile_Hybrid_and_WebAngular
Demo de Aplicacion Hibrida Movil y Administrador Web con framework PHP Phalcon y PostgreSQL

Cliente Cordova:

/appmovil/

Conexion a la BD con PHP Phalcon:

/web/server

Cliente Web:

/web/client

Script de Base de Datos:
/bd/db_prueba_impacto.sql

Tanto en el cliente Cordova como en el cliente web, se configura la direccion del servidor en:

/js/services/clientservice.js

En la variable serverLocation.
(Pagina web de cliente Cordova se encuentra en carpeta /www/)

El cliente Cordova debe ser compilado con la direccion del servidor a utilizar. El apk generado se
encuentra en:
/appmovil/platforms/android/build/outputs/apk/android-debug.apk

EL Administrador Web asume que PHP Phalcon fue instalado. Se maneja los datos de accesso al servidor PosgreSQL en:

/web/server/config/config.php
/web/server/controllers/ClientesController.php


Se utilizo el gestor de paquetes bower con el comando bower install en las carpetas /movil/ y /web/client para tener las librerias.

Campo Edad es calculado a partir de la fecha de nacimiento insertada.
