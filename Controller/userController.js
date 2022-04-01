'use strict'

var userInfo = require('../models/userInfo');

function crearUsuario(req, resp){
    var nuevoUsuario = new userInfo();

    var parametros = req.body.usurInfo;

    nuevoUsuario.nombre = nombre;
    nuevoUsuario.Apellido = Apellido;
    nuevoUsuario.Celular = Celular; 
    nuevoUsuario.Correo = Correo;
    nuevoUsuario.Cedula = Cedula;
    nuevoUsuario.Direccion = Direccion;
    nuevoUsuario.NombreUnidad = NombreUnidad;
    nuevoUsuario.Departamento = Departamento;
    nuevoUsuario.Municipio = Municipio;
    nuevoUsuario.Barrio = Barrio;
    nuevoUsuario.NivelFormacion = NivelFormacion;
    nuevoUsuario.FechaConstruccion = FechaConstruccion;
    nuevoUsuario.Constructora = Constructora;
    nuevoUsuario.ConstructoraNombre = ConstructoraNombre;

    nuevoUsuario.save(
        (err,usuarioCreado) => {
            if(err){
                resp.status(500).send({
                    menssage:"Ha ocurrido un error al insertar"
                });
            }
            else{
                resp.status(200).send({
                    menssage:usuarioCreado
                });
            }
        }
    );

}

function editarUsuario(req, resp){
    var parametros = req.body;
    userInfo.findByIdAndUpdate(parametros._id,{
        nombre : parametros.nombre,
        Apellido : parametros.Apellido,
        Celular : parametros.Celular,
        Correo : parametros.Correo,
        Cedula : parametros.Cedula,
        Direccion : parametros.Direccion,
        NombreUnidad : parametros.NombreUnidad,
        Departamento : parametros.Departamento,
        Municipio : parametros.Municipio,
        Barrio : parametros.Barrio,
        NivelFormacion : parametros.NivelFormacion,
        FechaConstruccion : parametros.FechaConstruccion,
        Constructora : parametros.Constructora,
        ConstructoraNombre : parametros.ConstructoraNombre
    },(err, userActualizado) =>{
        if(err){
            resp.status(500).send({
                menssage:"Ha ocurrido un error al actualizar"
             });
        }
        else{
         resp.status(200).send({
             menssage:cursoActualizado
            });
        } 
    });
}

function consultarUsuario (req, resp){
    var parametros = req.body;
    userInfo.findById(parametros._id, 
        (err, userEncontrado)=>{
            if(err){
                resp.status(500).send({
                menssage:"Ha ocurrido un error al buscar"
                 });
            }
            else{
             resp.status(200).send({
                 menssage:userEncontrado});
            } 
    });
}

module.exports = {
    crearUsuario,
    editarUsuario,
    consultarUsuario
}