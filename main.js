'use strict'
//llamar paquetes
const express=require("express"),
    reload = require('reload'),
    rutas = require('./rutas/rutas'),
    app=express(),
    puerto=3000

app.set('views', './views')
app.set('view engine', 'pug')
//Se pone al descubierto la carpeta publica
app.use(express.static(__dirname+'/Public'))
app.use(express.json())
app.use(express.urlencoded())
//Express usa las rutas creadas en el archivo rutas.js
app.use(rutas)

//Reload para refrescar cambios
reload(app).then((reloadReturned)=>{
    //Se inicializa el servidor
app.listen(puerto,()=>{
    console.log("Servidor inicializado")
    })
}).catch((err)=>{
    console.log(err)
})