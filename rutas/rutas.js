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

.put('/p3BsubirImagenFrente', multer.single('foto'), (req, res) => {
    console.log('Se ha cargado la foto')
    let datos={
        imagenFrente:`\\\\img\\\\${req.file.filename}`,
        cedula:req.body.cedula,
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

//Falta Probar
.post("/parte7", (req, res) => {
    let  parametros=req.body;
    var datos = {
        alturaEntrePisos: parametros.alturaEntrePisos,
        alturaEntrePisosPts: parametros.alturaEntrePisosPts,
        materialDeConstruccion: parametros.materialDeConstruccion,
        materialDeConstruccionPts: parametros.materialDeConstruccionPts,
        tipoMamposteriaConcretoPrefabricado: parametros.tipoMamposteriaConcretoPrefabricado,
        tipoMamposteriaConcretoPrefabricadoPts: parametros.tipoMamposteriaConcretoPrefabricadoPts,
        cedula:parametros.cedula
    }
    conectar.almacenarEncuestaP7(datos, () => {
        res.status(200).send({
            menssage:"Se ha añadido la Parte 7"
             });
    })
})
.post("/parte8", (req, res) => {
    let  parametros=req.body;
    var datos = {
        tipoEntrePiso: parametros.tipoEntrePiso,
        tipoEntrePisoPts: parametros.tipoEntrePisoPts,
        tipoTecho: parametros.tipoTecho,
        tipoTechoPts: parametros.tipoTechoPts,
        cedula:parametros.cedula
    }
    conectar.almacenarEncuestaP8(datos, () => {
        res.status(200).send({
            menssage:"Se ha añadido la Parte 8"
             });
    })
})
/* 
.put('/p3BsubirImagenesGrietaYHundimiento', multer.array('foto',4), (req, res) => {
let  arrayDatos=[4];
let nomTabla='EncuestaViviendaInterior';
let columnaNom=[4]=["estadoEdifacionImgLejana", "estadoEdifacionImgCercanaAObjeto", "tieneGrietasImgLejana",
"EncuestaViviendaImgCercanaAObjeto"]
let foto_OK=[4]
var respuestaSubida=[4];
let mensaje="";
let codigo=400;
for (var i = 0; i < 4; i++) {
    foto_OK[i]=false;
    let column=columnaNom[i]
    arrayDatos[i]={
        ruta:`\\\\img\\\\${req.file.filename}`,
        cedula:req.body.cedula,
        nombreTabla:nomTabla,
        columna:column
    }

    conectar.almacenarImagenEnViviendas(datos[i],(respuesta)=>{
        if (respuesta.lenght>=1) {
            //Se ha cargado la foto actual.
            foto_OK[i]=true;
            respuestaSubida[i]={
            respuestaDb:respuestaSubida,
            rutaImagen:arrayDatos[i].ruta[i],
            message:'Se ha subido la imagen en la bd'
            };
        }
        else{
            respuestaSubida[i]=
            {
                message:'No Se subio  la imagen en la bd'
            }
        }
    })
}
if (foto_OK[0]&&foto_OK[1]&&foto_OK[2]&&foto_OK[3]){
    codigo=200;
}
return res.status(codigo).send(
    {
     mensaje:  respuestaSubida.message ,
     respuestabd:respuestaSubida.respuestaDb,
     ruta: respuestaSubida.rutaImagen
    })
})
 */ 

 /*

  `alturaEntrePisosPuntos` INT(2) NULL,
  `materialDeConstruccionPuntos` INT(2) NULL,
  `tipoMamposteriaConcretoPrefabricadoPuntos` INT(2) NULL,
  `tipoEntrePisoPuntos` INT(2) NULL,
  `tipoTechoPuntos` INT(2) NULL,
  `estadoEdificacionPuntos` INT(2) NULL,
  `tieneGrietasPuntos` INT(2) NULL,
*/
.post("/gravedadVivienda:/cedula", (req, res) => {
    datos={
        cedula: req.params.cedula
    }
    let pcedula=datos.cedula;
    var ptsTblEncuesta=0;
    var ptsTblViviendaExterior=0;
    var ptsTblViviendaInterior=0;
    var ptsPuntaje=0;
    var ptsEscalaGravedad=0;
    var max_puntos=60;
    conectar.getPuntosTablaEncuesta(datos, resultado => {
        ptsTblEncuesta= resultado.añoConstruccionPuntos+resultado.construidaPorEntidadPuntos  
    })
    conectar.getPuntosTablaEncuestaViviendaExterior(datos, resultado => {
        ptsTblViviendaExterior= resultado.ubicacionPuntos+
        resultado.materialDeConstruccionPuntos+
        resultado.tipoMamposteriaConcretoPrefabricadoPuntos+
        resultado.tipoEntrePisoPuntos+resultado.tipoTechoPuntos+
        resultado.estadoEdificacionPuntos+resultado.tieneGrietasPuntos
    })

    conectar.getPuntosTablaEncuestaViviendaInterior(datos, resultado => {
        ptsTblViviendaInterior= resultado.alturaEntrePisosPuntos+
        resultado.usoActualPuntos+resultado.totalPisosPuntos+
        resultado.seUbicaEnElPisoPuntos+resultado.comparteMurosConVecinosPuntos+
        resultado.equiposDentroDeLaEdificacionPuntos
    })
    ptsPuntaje=ptsTblEncuesta+ptsTblViviendaExterior+ptsTblViviendaInterior
    ptsEscalaGravedad=(ptsPuntaje*100)/max_puntos
    let encuestaResuladosCalculados={
        puntaje:ptsPuntaje,
        escalaGravedad:ptsEscalaGravedad,
        cedula:pcedula
    }
    conectar.almacenarResultadosEncuesta(encuestaResuladosCalculados, calculo => {
        res.status(200).send({
            menssage:"Se ha calculado el porcentaje de gravedad",
            respuestadb:calculo
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