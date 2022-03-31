'use strict'
var express=require('express');
var application=express.Router();
application.post('usuario/crear');

application.put('/usuario/editar');


application.get('usuario/perfil');


module.exports=application;