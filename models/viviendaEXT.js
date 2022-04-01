'use strict'

var  mongoose= require('mongoose');
var Schema = mongoose.Schema
var ViviendaSchema= new Schema({
    area:Number,
    ImgFrente: String,
    ImgUbicacion: String,
    ImgElementosCercanos:String,
   usoActual: String,
   usoAnterior:String, //Si=fue usado para otra actividad, falso no
   usoAnteriorEspecificado: String,
   usoPrimerPiso: String,
   totalpisos:Number,
   UbicacionPiso:Number,
   cantidadSotanos:Number,
   ComparteMuroconVecinos:String,
   PresenciaEquipos:String
  })
  module.exports=mongoose.model('Viviendas',ViviendaSchema)