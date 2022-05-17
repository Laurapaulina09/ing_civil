var conectar = require("./ConectarMysql")

// crear ruta con /admin ver el perfil de los admins
//listar los resultados de la encuesta 
// Ese id lo voy a pasar a las dos tablas encuestas exterior e interior.
function Conexion() { }
Conexion.almacenarUsuario = (datos, cb) => {
    let sql = `INSERT INTO usuario VALUES  ("${datos.primerNombre}","${datos.segundoNombre}",
    "${datos.primerApellido}","${datos.segundoApellido}","${datos.celular}",
    "${datos.email}","${datos.cedula}","${datos.direccion}", "${datos.nombreUnidad}",
    "${datos.departamento}","${datos.municipio}","${datos.barrio}",    
    "${datos.tratamientoDatos}")`;
    conectar.query(sql, function (err, res) {
        if (err) {
            console.log(err)
        } else {
            cb()
        }
    })
}
Conexion.almacenarEncuestaP2 = (datos, cb) => {
   let sql = `INSERT INTO encuesta(nivelFormacion,añoConstruccion,añoConstruccionPuntos,
        ConstruidaPorEntidad,construidaPorEntidadPuntos,nombreConstructora,encuestadoCedula ) 
        VALUES  ("${datos.nivelFormacion}","${datos.anoConstruccion}",
    "${datos.anoConstruccionPts}","${datos.construidaPorEntidad}","${datos.ConstruidaPorEntidadPts}",
    "${datos.constructora}","${datos.cedula}")`;
    conectar.query(sql, function (err, res) {
        if (err) {
            console.log(err)
        } else {
            cb()
        }
    })
}

Conexion.almacenarEncuestaP3A = (datos, cb) => {
    let sql = `INSERT INTO EncuestaViviendaExterior(area,ubicacion,ubicacionPuntos,Encuesta_id ) 
        VALUES  ("${datos.areaVivienda}","${datos.ubicacion}","${datos.ubicacionPts}",
        (select id from Encuesta where encuestadoCedula="${datos.cedula}"))`;
    conectar.query(sql, function (err, res) {
        if (err) {
            console.log(err)
        } else {
            cb()
        }
    })
}

Conexion.almacenarImagenEnViviendas = (datos, cb) => {
    let  sql = `UPDATE ${datos.nombreTabla} 
    SET ${datos.columna}="${datos.ruta}" 
    WHERE Encuesta_id=(select id from Encuesta where encuestadoCedula="${datos.cedula}")`;
   console.log(datos);
    conectar.query(sql, function(err, res) {
        if (err) {
            console.log("error al almacenar la imagen en la tabla: "+datos.nombreTabla)
            console.log(err);
            throw err;
        } else {
            console.log(res);
            cb(res)
        }
    })
}
Conexion.almacenarEncuestaP4 = (datos, cb) => {
    let sql = `UPDATE  EncuestaViviendaExterior
        SET elementosCercanos= "${datos.elementosCercanos}",
        elementosCercanosPuntos="${datos.elementosCercanosPts}",
        usoActual="${datos.usoActualPredominanteVivienda}",
        usoActualPuntos="${datos.usoActualPts}",
        fueUsadaAnteriorMente="${datos.usoAnteriorDiferente}",
        usoAnterior="${datos.usoAnterior}",
        usoPrimerPiso="${datos.usoPrimerPiso}",
        usoPrimerPisoPuntos= "${datos.usoPrimerPisoPts}"
        WHERE Encuesta_id=(select id from Encuesta where encuestadoCedula="${datos.cedula}")`;
        console.log("Datos")
        console.log(datos)
    conectar.query(sql, function (err, res) {
        if (err) {
            console.log(err)
        } else {
            cb()
        }
    })
}

Conexion.almacenarEncuestaP5 = (datos, cb) => {
    let sql = `UPDATE  EncuestaViviendaExterior
        SET comparteMurosConVecinos= "${datos.comparteMuro}",
        comparteMurosConVecinosPuntos="${datos.comparteMuroPts}",
        equiposDentroDeLaEdificacion="${datos.equiposGrandes}", 
        equiposDentroDeLaEdificacionPuntos="${datos.equiposGrandesPts}"
        WHERE Encuesta_id=(select id from Encuesta where encuestadoCedula="${datos.cedula}")`;
        console.log("DATOS");
        console.log(datos);
        console.log("SQL");
        console.log(sql);
    conectar.query(sql, function (err, res) {
        if (err) {
            console.log(err)
        } else {
            cb()
        }
    })
}

Conexion.almacenarEncuestaP6 = (datos, cb) => {
    let sql = `UPDATE  EncuestaViviendaExterior
        SET totalPisos= "${datos.numPisos}",
        totalPisosPuntos="${datos.numPisosPts}",
        seUbicaEnElPiso="${datos.ubicacionPiso}",
        seUbicaEnElPisoPuntos= "${datos.ubicacionPisoPts}",
        numSotanos="${datos.parqueadero}",
        numSotanosPuntos="${datos.parqueaderoPts}"
        WHERE Encuesta_id=(select id from Encuesta where encuestadoCedula="${datos.cedula}")`;
        console.log("DATOS");
        console.log(datos);
        console.log("SQL");
        console.log(sql);
    conectar.query(sql, function (err, res) {
        if (err) {
            console.log(err)
        } else {
            cb()
        }
    })
}
Conexion.almacenarEncuestaP7 = (datos, cb) => {
    let sql = `INSERT INTO EncuestaViviendaInterior (alturaEntrePisos,
        alturaEntrePisosPuntos,materialDeConstruccion,
        materialDeConstruccionPuntos,
        tipoMamposteriaConcretoPrefabricado,
        tipoMamposteriaConcretoPrefabricadoPuntos,
        Encuesta_id) 
         VALUES  ("${datos.alturaEntrePisos}",
         "${datos.alturaEntrePisosPts}",
     "${datos.materialDeConstruccion}",
     "${datos.materialDeConstruccionPts}",
     "${datos.tipoMamposteriaConcretoPrefabricado}",
     "${datos.tipoMamposteriaConcretoPrefabricadoPts}",
     (select id from Encuesta where encuestadoCedula="${datos.cedula}"))`
     conectar.query(sql, function (err, res) {
         if (err) {
             console.log(err)
         } else {
             cb()
         }
     })
 }
 Conexion.almacenarEncuestaP8 = (datos, cb) => {
    let sql = `UPDATE  EncuestaViviendaInterior 
    SET tipoEntrePiso= "${datos.tipoEntrePiso}",
    tipoEntrePisoPuntos ="${datos.tipoEntrePisoPts}",
    tipoTecho="${datos.tipoTecho}",
    tipoTechoPuntos="${datos.tipoTechoPts}"
    WHERE Encuesta_id=(select id from Encuesta where encuestadoCedula="${datos.cedula}")`;
    console.log(sql)
    console.log(datos)
     conectar.query(sql, function (err, res) {
         if (err) {
             console.log(err)
         } else {
             cb()
         }
     })
 }

 /*
  `estadoEdificacion` VARCHAR(45) NULL,
  `estadoEdificacionPuntos` INT(2) NULL,
  `tieneGrietas` VARCHAR(45) NULL,
  `tieneGrietasPuntos` INT(2) NULL,
          danoGrietas:parametros.danoGrietas,
        danoGrietasPts:parametros.danoGrietasPts,
        danoHundimiento:parametros.danoHundimiento,
        danoHundimientoPts:parametros.danoHundimientoPts,
        cedula:parametros.cedula
 */
 Conexion.almacenarEncuestaP9 = (datos, cb) => {
    let sql = `UPDATE  EncuestaViviendaInterior 
    SET estadoEdificacion= "${datos.danoHundimiento}",
    estadoEdificacionPuntos ="${datos.danoHundimientoPts}",
    tieneGrietas="${datos.danoGrietas}",
    tieneGrietasPuntos="${datos.danoGrietasPts}"
    WHERE Encuesta_id=(select id from Encuesta where encuestadoCedula="${datos.cedula}")`;
    console.log(sql)
    console.log(datos)
     conectar.query(sql, function (err, res) {
         if (err) {
             console.log(err)
         } else {
             cb()
         }
     })
 }

 Conexion.getPuntosTablaEncuesta = (datos, cb) => {
    let sql = `SELECT  añoConstruccionPuntos,construidaPorEntidadPuntos 
    FROM Encuesta
    WHERE encuestadoCedula="${datos.cedula}"`;
    console.log(sql)
    console.log(datos)
     conectar.query(sql, function (err, res) {
         if (err) {
             console.log(err)
         } else {
             cb()
         }
     })
 }

 Conexion.getPuntosTablaEncuestaViviendaExterior = (datos, cb) => {
    let sql = `SELECT  ubicacionPuntos,elementosCercanosPuntos, 
    usoActualPuntos,usoPrimerPisoPuntos,
    totalPisosPuntos,seUbicaEnElPisoPuntos,
    seUbicaEnElPisoPuntos,numSotanosPuntos,
    comparteMurosConVecinosPuntos,equiposDentroDeLaEdificacionPuntos
    FROM EncuestaViviendaExterior 
    WHERE Encuesta_id=(select id from Encuesta where encuestadoCedula="${datos.cedula}")`;
    console.log(sql)
    console.log(datos)
     conectar.query(sql, function (err, res) {
         if (err) {
             console.log(err)
         } else {
             cb()
         }
     })
 }
 Conexion.getPuntosTablaEncuestaViviendaInterior = (datos, cb) => {
    let sql = `SELECT  alturaEntrePisosPuntos,materialDeConstruccionPuntos, 
    tipoMamposteriaConcretoPrefabricadoPuntos,tipoEntrePisoPuntos,
    tipoEntrePisoPuntos,tipoTechoPuntos,
    estadoEdificacionPuntos,tieneGrietasPuntos,
    FROM EncuestaViviendaInterior 
    WHERE Encuesta_id=(select id from Encuesta where encuestadoCedula="${datos.cedula}")`;
    console.log(sql)
    console.log(datos)
     conectar.query(sql, function (err, res) {
         if (err) {
             console.log(err)
         } else {
             cb()
         }
     })
 }

 Conexion.almacenarResultadosEncuesta = (datos, cb) => {
    let sql = `UPDATE  Encuesta
    SET puntaje= "${datos.puntaje}",
    escalaGravedad ="${datos.escalaGravedad}",
    WHERE encuestadoCedula="${datos.cedula}"`;
    console.log(sql)
    console.log(datos)
     conectar.query(sql, function (err, res) {
         if (err) {
             console.log(err)
         } else {
             cb()
         }
     })
 }
Conexion.ListarTodosEncuestados = (datos, cb) => {
    let sql = `SELECT *FROM  usuario`;
    conectar.query(sql, function (err, res) {
        if (err) {
            console.log(err)
        } else {
            cb()
        }
    })
}

Conexion.EncuestaGetID=(datos,cb)=>{
    let sql = `SELECT id FROM  encuesta
    where cedula="${datos.cedula}"`; 
    conectar.query(sql, function (err, res) {
        if (err) {
            console.log(err)
        } else {
            cb()
        }

})
}

Conexion.BuscarAdministrador = (datos, cb) => {
   let  sql = `SELECT *FROM  administrador WHERE contrasena= "${datos.contrasena}"` ;
    conectar.query(sql, function (err, res) {
        if (err) {
            console.log(err)
        } else {
            cb()
        }
    })
}
module.exports = Conexion;