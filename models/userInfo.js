'use strict'

var  mongoose= require('mongoose');
var Schema = mongoose.Schema

var EmailValido=function(email){
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email)
};

var TelefonoValido=function validateTlf(phone) {
  var phoneformat = /^\d{10}$/;
  return phone.match(phoneformat) 
}

var userInfoSchema=new Schema({
  nombre:String,
  Apellido: String,
  Celular: {
    type: Number,
    required: ' El numero de telefono debe tener 10 carácteres',
    validate: [TelefonoValido,'Por favor introduzca un número  celular con 10 digitos '],
    match:[ /^\d{10}$/,'Por favor introduzca un número  celular con 10 digitos ']
  },
  Correo:
  {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Se requiere direccion de correo electrónico',
    validate: [EmailValido,'Por favor introduzca una dirección de email válida'],
    match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Por favor introduzca una dirección de email válida']
  },
    Cedula: String,
    Direccion: String,
    NombreUnidad: String,  //campo opcional puede ir vacio
    Departamento: String,
    Municipio: String,
    Barrio: String,
    NivelFormacion: String,
    FechaConstruccion: String,
    Constructora: String,
    ConstructoraNombre: String //Campo opcional puede ir bacio
})

module.exports=mongoose.model('userInfo',userInfoSchema)