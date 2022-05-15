var mysql = require('mysql');
var connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'db_ingcivil',
});
connection.connect(function(error){
    if(!!error){
      console.log(error);
    }else{
      console.log('Conexion con la base de datos:)');
    }
  });  
 module.exports = connection; 