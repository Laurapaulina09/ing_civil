'use strict'

var Vivienda = require('../models/viviendaEXT');

function crearVivienda(req, resp){
    var nuevaVivienda = new Vivienda();
    var datosVivienda = {
        area: req.body.area,
        ImgFrente: req.body.ImgFrente,
        ImgUbicacion: req.body.ImgUbicacion,
        ImgElementosCercanos:req.body.ImgElementosCercanos,
        usoActual: req.body.usoActual,
        usoAnterior: req.body.usoAnterior,
        usoAnteriorEspecificado: req.body.usoAnteriorEspecificado,
        usoPrimerPiso:req.body.usoPrimerPiso,
        totalpisos:req.body.totalpisos,
        UbicacionPiso:req.body.UbicacionPiso,
        cantidadSotanos:req.body.cantidadSotanos,
        ComparteMuroconVecinos:req.body.ComparteMuroconVecinos,
        PresenciaEquipos:req.body.PresenciaEquipos,
    }
    nuevaVivienda.area = datosVivienda.area;
    nuevaVivienda.ImgFrente = datosVivienda.ImgFrente;
    nuevaVivienda.ImgUbicacion = datosVivienda.ImgUbicacion;
    nuevaVivienda.ImgElementosCercanos = datosVivienda.ImgElementosCercanos;
    nuevaVivienda.usoActual = datosVivienda.usoActual;
    nuevaVivienda.usoAnterior = datosVivienda.usoAnterior;
    nuevaVivienda.usoAnteriorEspecificado = datosVivienda.usoAnteriorEspecificado;
    nuevaVivienda.usoPrimerPiso = datosVivienda.usoPrimerPiso;
    nuevaVivienda.totalpisos = datosVivienda.totalpisos;
    nuevaVivienda.UbicacionPiso = datosVivienda.UbicacionPiso;
    nuevaVivienda.cantidadSotanos = datosVivienda.cantidadSotanos;
    nuevaVivienda.ComparteMuroconVecinos = datosVivienda.ComparteMuroconVecinos;
    nuevaVivienda.PresenciaEquipos = datosVivienda.PresenciaEquipos;
    nuevaVivienda.save(
        (err, ViviendaEXTCreado) => {
           if(err){
               resp.status(500).send({
                   menssage:"Ha ocurrido un error al insertar"
                });
           }
           else{
            resp.status(200).send({
                menssage:ViviendaEXTCreado
             });
           } 
        }

    );

}

module.exports = {
    crearVivienda
   // editarCurso, 
    //consultarCurso
}