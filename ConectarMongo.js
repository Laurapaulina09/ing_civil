'use scrict'
var mongoose=require('mongoose');
var application=require('./application')

var db_url='mongodb://localhost:27017/viviendasMedellin';
mongoose.connect(db_url,
    (err,resp)=>{
      if (err){
      console.log('Se ha procucido un error al conectar con la base de datos') ;   
      }
      else{
          console.log('Conexion exitosa con la base de datos');
          application.listen(8383,function(){
          console.log('Ha iniciado el servidor Web');  
          })
      }  
    }
    )