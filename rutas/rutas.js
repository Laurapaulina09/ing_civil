'use strict'
var express=require('express');
var conectar = require("../models/OperacionesMySQL");
const path = require('path');
const multer=require('../Public/manejoMulter')
var rutas =express.Router();
rutas
.post("/crearUsuario", (req, res) => {
    let  parametros=req.body;
    let datos = {
        primerNombre: parametros.primerNombre,
        segundoNombre: parametros.segundoNombre,
        primerApellido: parametros.primerApellido,
        segundoApellido: parametros.segundoApellido,
        celular: parametros.celular,
        email: parametros.email,
        cedula:parametros.cedula,
        direccion: parametros.direccion,
        nombreUnidad: parametros.nombreUnidad,
        departamento: parametros.departamento,
        municipio: parametros.municipio,
        barrio: parametros.barrio,
        tratamientoDatos:parametros.tratamientoDatos  
    }
    conectar.almacenarUsuario(datos, () => {
        res.status(200).send({
            menssage:"Usuario creado"
             });
    })
})


.post("/parte2", (req, res) => {
    let  parametros=req.body;
    let datos = {
        nivelFormacion: parametros.nivelFormacion,
        anoConstruccion: parametros.anoConstruccion,
        anoConstruccionPts:parametros.anoConstruccionPts,
        construidaPorEntidad:parametros.entidad,
        construidaPorEntidadPts:parametros.entidadPts,
        constructora: parametros.constructora,
        cedula: parametros.cedula
    }
    conectar.almacenarEncuestaP2(datos, () => {
        res.status(200).send({
            menssage:"Se ha añadido la parte 2"
             });
    })
})

.post("/parte3A", (req, res) => {
    let  parametros=req.body;
    let datos = {
        areaVivienda: parametros.areaVivienda,
        ubicacion: parametros.ubicacion,
        ubicacionPts: parametros.ubicacionPts,
        cedula: parametros.cedula
    }
    conectar.almacenarEncuestaP3A(datos, () => {
        res.status(200).send({
            menssage:"Se ha añadido la Parte 3A"
             });
    })
})

//Falta Probar, no tengo como hacerlo en este momento
.put('/p3BsubirImagenFrente/:cedula', multer.single('foto'), (req, res) => {
    console.log('Se ha cargado la foto')
    let datos={
        imagenFrente:`\\\\img\\\\${req.file.filename}`,
        cedula:req.params.cedula,
        nombreTabla:'EncuestaViviendaExterior',
        columna:'imagenFrente',
    }
    conectar.almacenarImagenEnViviendas(datos,(respuesta)=>{
        res.status(200).json({
            respuestaDb:respuesta,
            rutaImagen:datos.imagenFrente,
            message:'Se ha subido la imagen en la bd'
        })
    })
})

.post("/parte4", (req, res) => {
    let  parametros=req.body;
    var datos = {
        elementosCercanos: parametros.elementosCercanos,
        elementosCercanosPts: parametros.elementosCercanosPts,
        usoActualPredominanteVivienda:parametros.usoActualPredominanteVivienda,
        usoActualPts:parametros.UsoActualPts,
        usoAnteriorDiferente:parametros.usoAnteriorDiferente,
        usoAnterior:parametros.usoAnterior,
        usoPrimerPiso: parametros.usoPrimerPiso,
        usoPrimerPisoPts:parametros.usoPrimerPisoPts,
        cedula:parametros.cedula
    }
    conectar.almacenarEncuestaP4(datos, () => {
        res.status(200).send({
            menssage:"Se ha añadido la Parte 4"
             });
    })
})
.post("/parte5", (req, res) => {
    let  parametros=req.body;
    var datos = {
        comparteMuro: parametros.comparteMuro,
        comparteMuroPts: parametros.comparteMuroPts,
        equiposGrandes: parametros.equiposGrandes,
        equiposGrandesPts: parametros.equiposGrandesPts,
        cedula:parametros.cedula
    }
    conectar.almacenarEncuestaP5(datos, () => {
        res.status(200).send({
            menssage:"Se ha añadido la Parte 5"
             });
    })
})
.post("/parte6", (req, res) => {
    let  parametros=req.body;
    var datos = {
        numPisos: parametros.numPisos,
        numPisosPts: parametros.numPisosPts,
        ubicacionPiso: parametros.ubicacionPiso,
        ubicacionPisoPts: parametros.ubicacionPisoPts,
        parqueadero: parametros.parqueadero,
        parqueaderoPts: parametros.parqueaderoPts,
        cedula:parametros.cedula
    }
    conectar.almacenarEncuestaP6(datos, () => {
        res.status(200).send({
            menssage:"Se ha añadido la Parte 6"
             });
    })
})


        
.get("/Admin",(req,res) =>{
    let parametros=req.body;
    datos=parametros.contrasena
    conectar.BuscarAdministrador(datos)
}
)



// crear ruta con /admin ver el perfil de los admins
// Crear buscarAdministrador por usuario(cedula) y contrasena. XX
//listar los resultados de la encuesta 
//Me van a pasar la cedula en los Jsons para hacer un select from para obtener el id de encuesta
// Ese id lo voy a pasar a las dos tablas encuestas exterior e interior.


.get('/encuesta', (req, res) => {
    res.sendFile(path.join(__dirname, '../Public/index.html'))
})
module.exports = rutas