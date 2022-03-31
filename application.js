'use scrict'

var express=require('express');
var bodyParser=require('body-parser');



var application=express();

application.use(bodyParser.urlencoded({extended:false}));
application.use(bodyParser.json());

application.get('/health-check', function(req,resp) {
    const data={
        uptime:process.uptime(),
        message:'Aplicacion funciona OK',
        date:new Date()
    }
    resp.status(200).send({message:data})
})

module.exports=application;