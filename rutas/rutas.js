'use strict'
var express=require('express');
var conectar = require("../models/ConectarMongo");
var ViviendaController = require("../Controller/viviendaController");
var UsuarioController=require("../Controller/userController");
const path = require('path');
var rutas =express.Router();
rutas
//.post("/GuardarEncuesta",userController.)
.post("/crearVivienda",ViviendaController.crearVivienda)
.post('/crearUsuario',UsuarioController.crearUsuario)
.put('/usuario/editar', UsuarioController.editarUsuario)
.get('usuario/consultar', UsuarioController.consultarUsuario)
.get('/encuesta', (req, res) => {
    res.sendFile(path.join(__dirname, '../Public/index.html'))
})
module.exports = rutas