'use strict'

var express=require('express');
var userController = require("../controllers/userController");
var application=express.Router();

application.post('/crearUsuario',userController.crearUsuario);

application.put('/usuario/editar', userController.editarUsuario);


application.get('usuario/consultar', userController.consultarUsuario);


module.exports=application;