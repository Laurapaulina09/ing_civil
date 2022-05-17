'use strict'
var express = require('express');
var conectar = require("../models/OperacionesMySQL");
const path = require('path');
const multer = require('../Public/manejoMulter')
var ptsTblEncuesta = 0;
var ptsTblViviendaExterior = 0;
var ptsTblViviendaInterior = 0;
var ptsPuntaje = 0;
var ptsEscalaGravedad = 0;
var max_puntos = 60;
var rutas = express.Router();
rutas
    .post("/crearUsuario", (req, res) => {
        let parametros = req.body;
        let datos = {
            primerNombre: parametros.primerNombre,
            segundoNombre: parametros.segundoNombre,
            primerApellido: parametros.primerApellido,
            segundoApellido: parametros.segundoApellido,
            celular: parametros.celular,
            email: parametros.email,
            cedula: parametros.cedula,
            direccion: parametros.direccion,
            nombreUnidad: parametros.nombreUnidad,
            departamento: parametros.departamento,
            municipio: parametros.municipio,
            barrio: parametros.barrio,
            tratamientoDatos: parametros.tratamientoDatos
        }
        conectar.almacenarUsuario(datos, () => {
            res.status(200).send({
                menssage: "Usuario creado"
            });
        })
    })


    .post("/parte2", (req, res) => {
        let parametros = req.body;
        let datos = {
            nivelFormacion: parametros.nivelFormacion,
            anoConstruccion: parametros.anoConstruccion,
            anoConstruccionPts: parametros.anoConstruccionPts,
            construidaPorEntidad: parametros.entidad,
            construidaPorEntidadPts: parametros.entidadPts,
            constructora: parametros.constructora,
            cedula: parametros.cedula
        }
        conectar.almacenarEncuestaP2(datos, () => {
            res.status(200).send({
                menssage: "Se ha añadido la parte 2"
            });
        })
    })

    .post("/parte3A", (req, res) => {
        let parametros = req.body;
        let datos = {
            areaVivienda: parametros.areaVivienda,
            ubicacion: parametros.ubicacion,
            ubicacionPts: parametros.ubicacionPts,
            cedula: parametros.cedula
        }
        conectar.almacenarEncuestaP3A(datos, () => {
            res.status(200).send({
                menssage: "Se ha añadido la Parte 3A"
            });
        })
    })

    .post('/p3BsubirImagenFrente/:cedula', multer.single('foto'), (req, res) => {
        console.log('Se ha cargado la foto')
        let datos = {
            ruta: `\\\\img\\\\${req.file.filename}`,
            cedula: req.params.cedula,
            nombreTabla: 'EncuestaViviendaExterior',
            columna: 'imagenFrente',
        }
        conectar.almacenarImagenEnViviendas(datos, (respuesta) => {
            res.status(200).json({
                respuestaDb: respuesta,
                rutaImagen: datos.imagenFrente,
                message: 'Se ha subido la imagen en la bd'
            })
        })
    })

    .post("/parte4", (req, res) => {
        let parametros = req.body;
        var datos = {
            elementosCercanos: parametros.elementosCercanos,
            elementosCercanosPts: parametros.elementosCercanosPts,
            usoActualPredominanteVivienda: parametros.usoActualPredominanteVivienda,
            usoActualPts: parametros.UsoActualPts,
            usoAnteriorDiferente: parametros.usoAnteriorDiferente,
            usoAnterior: parametros.usoAnterior,
            usoPrimerPiso: parametros.usoPrimerPiso,
            usoPrimerPisoPts: parametros.usoPrimerPisoPts,
            cedula: parametros.cedula
        }
        conectar.almacenarEncuestaP4(datos, () => {
            res.status(200).send({
                menssage: "Se ha añadido la Parte 4"
            });
        })
    })
    .post("/parte6", (req, res) => {
        let parametros = req.body;
        var datos = {
            comparteMuro: parametros.comparteMuro,
            comparteMuroPts: parametros.comparteMuroPts,
            equiposGrandes: parametros.equiposGrandes,
            equiposGrandesPts: parametros.equiposGrandesPts,
            cedula: parametros.cedula
        }
        conectar.almacenarEncuestaP6(datos, () => {
            res.status(200).send({
                menssage: "Se ha añadido la Parte 6"
            });
        })
    })
    .post("/parte5", (req, res) => {
        let parametros = req.body;
        var datos = {
            numPisos: parametros.numPisos,
            numPisosPts: parametros.numPisosPts,
            ubicacionPiso: parametros.ubicacionPiso,
            ubicacionPisoPts: parametros.ubicacionPisoPts,
            parqueadero: parametros.parqueadero,
            parqueaderoPts: parametros.parqueaderoPts,
            cedula: parametros.cedula
        }
        conectar.almacenarEncuestaP5(datos, () => {
            res.status(200).send({
                menssage: "Se ha añadido la Parte 5"
            });
        })
    })

    //Falta Probar
    .post("/parte7", (req, res) => {
        let parametros = req.body;
        var datos = {
            alturaEntrePisos: parametros.alturaEntrePisos,
            alturaEntrePisosPts: parametros.alturaEntrePisosPts,
            materialDeConstruccion: parametros.materialDeConstruccion,
            materialDeConstruccionPts: parametros.materialDeConstruccionPts,
            tipoMamposteriaConcretoPrefabricado: parametros.tipoMamposteriaConcretoPrefabricado,
            tipoMamposteriaConcretoPrefabricadoPts: parametros.tipoMamposteriaConcretoPrefabricadoPts,
            cedula: parametros.cedula
        }
        conectar.almacenarEncuestaP7(datos, () => {
            res.status(200).send({
                menssage: "Se ha añadido la Parte 7"
            });
        })
    })
    .post("/parte8", (req, res) => {
        let parametros = req.body;
        var datos = {
            tipoEntrePiso: parametros.tipoEntrePiso,
            tipoEntrePisoPts: parametros.tipoEntrePisoPts,
            tipoTecho: parametros.tipoTecho,
            tipoTechoPts: parametros.tipoTechoPts,
            cedula: parametros.cedula
        }
        conectar.almacenarEncuestaP8(datos, () => {
            res.status(200).send({
                menssage: "Se ha añadido la Parte 8"
            });
        })
    })


    .post('/parte9A/:cedula', multer.array('foto', 4), (req, res) => {
        let arrayDatos = [4];
        let nomTabla = 'EncuestaViviendaInterior';
        let columnaNom = ["estadoEdifacionImgLejana", "estadoEdifacionImgCercanaAObjeto", "tieneGrietasImgLejana",
            "EncuestaViviendaImgCercanaAObjeto"]
        let foto_OK = [4]
        var respuestaSubida = [4];
        let mensaje = "";
        let codigo = 400;
        for (var i = 0; i < req.files.length; i++) {
            console.log(i)
            foto_OK[i] = false;
            let column = columnaNom[i]
            arrayDatos[i] = {
                ruta: `\\\\img\\\\${req.files[i].filename}`,
                cedula: req.params.cedula,
                nombreTabla: nomTabla,
                columna: column
            }

            conectar.almacenarImagenEnViviendas(arrayDatos[i], (respuesta) => {
                if (respuesta.length >= 1) {
                    //Se ha cargado la foto actual.
                    foto_OK[i] = true;
                    respuestaSubida[i] = {
                        respuestaDb: respuestaSubida,
                        rutaImagen: arrayDatos[i].ruta[i],
                        message: 'Se ha subido la imagen en la bd'
                    };
                }
                else {
                    respuestaSubida[i] =
                    {
                        message: 'No Se subio  la imagen en la bd'
                    }
                }
            })
        }
        if (req.files.length == 0 || (foto_OK[0] && foto_OK[1] && foto_OK[2] && foto_OK[3]) || (foto_OK[0] && foto_OK[1] && foto_OK[2] && foto_OK[3])) {
            codigo = 200;
        }
        return res.send({ mensaje: 'Guardo' })
    })

    .post("/parte9B", (req, res) => {
        let parametros = req.body;
        var datos = {
            danoGrietas: parametros.danoGrietas,
            danoGrietasPts: parametros.danoGrietasPts,
            danoHundimiento: parametros.danoHundimiento,
            danoHundimientoPts: parametros.danoHundimientoPts,
            cedula: parametros.cedula
        }
        conectar.almacenarEncuestaP9(datos, () => {
            res.status(200).send({
                menssage: "Se ha añadido la Parte 9B"
            });
        })
    })

    .get("/Admin", (req, res) => {
        let parametros = req.body;
        datos = parametros.contrasena
        conectar.BuscarAdministrador(datos)
    }
    )

    .post("/gravedadVivienda/:cedula", (req, res) => {
        let datos = {
            cedula: req.params.cedula
        }
        let pcedula = datos.cedula;
        //el problema es que la variable no esta guardando el valor dentro de conectar se guarda localmente en esa seccion
        // y no lo puedo utilizar afuera.
        conectar.getPuntosTablaEncuesta(datos, (resultado) => {
            if (resultado.length >= 1) {
                ptsTblEncuesta = resultado[0].SUMA
                console.log("LOCAL")
                console.log(ptsTblEncuesta)
            }
        })
        conectar.getPuntosTablaEncuestaViviendaExterior(datos, (resultado) => {
            if (resultado.length >= 1) {
                ptsTblViviendaExterior = resultado[0].SUMA
            }
        })

        conectar.getPuntosTablaEncuestaViviendaInterior(datos, (resultado) => {
            if (resultado.length >= 1) {
                ptsTblViviendaInterior = resultado[0].SUMA
            }
        })
        //ptsPuntaje=ptsTblEncuesta+ptsTblViviendaExterior+ptsTblViviendaInterior
        console.log("TBL ENCUESTA")
        setTimeout(() => {
            ptsPuntaje = ptsTblEncuesta + ptsTblViviendaExterior + ptsTblViviendaInterior
            ptsEscalaGravedad = (ptsPuntaje * 100) / max_puntos
            var encuestaResuladosCalculados = {
                puntaje: ptsPuntaje,
                escalaGravedad: ptsEscalaGravedad,
                cedula: pcedula
            }
            conectar.almacenarResultadosEncuesta(encuestaResuladosCalculados, (calculo) => {
                res.status(200).send({
                    menssage: "Se ha calculado el porcentaje de gravedad",
                    respuestadb: encuestaResuladosCalculados
                });
            })
        }, 500)
    })
    .post('/iniciarSesion', (req,res)=>{
        console.log(req.body)
        conectar.getUser(req.body.email, req.body.passowrd, (respuesta)=>{
            if(respuesta.length == 1){
                conectar.getEncuestados((datos)=>{
                    res.render('administrador', {tabla:datos})
                })
            }else{
                console.log(respuesta)
            }
        })
    })



    // crear ruta con /admin ver el perfil de los admins
    // Crear buscarAdministrador por usuario(cedula) y contrasena. XX
    //listar los resultados de la encuesta 
    //Me van a pasar la cedula en los Jsons para hacer un select from para obtener el id de encuesta
    // Ese id lo voy a pasar a las dos tablas encuestas exterior e interior.


    .get('/encuesta', (req, res) => {
        res.sendFile(path.join(__dirname, '../Public/index.html'))
    })
module.exports = rutas