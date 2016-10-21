
const console = require('clor');
var jwt = require('jsonwebtoken');

var express = require('express');
var app = express();


var usuario = require("../models/usuario");

function login(req,res) {
	console.cyan.log("usuarioController.js: login();");

	var enviar = true;
	var errores = "Te faltó enviar:";
	var usuario = undefined;
	var contrasena = undefined;

	const multiparty = require ('multiparty');
	var form = new multiparty.Form();
	form.parse(req, function(err, fields, files) {    
		if(err){
	    	console.red.log(err);
			enviar = false;
			errores+="\n"+err;			
		} else {    		
			if(fields){
		    	console.cyan.log(fields);	
		    	if(fields.usuario){
		    		usuario = fields.usuario;
		    	} else {
		    		enviar = false;
					errores+="\nusuario";			
		    	}
		    	if(fields.contrasena){
		    		contrasena = fields.contrasena;
		    	} else {
		    		enviar = false;
					errores+="\ncontraseña";			
		    	}
		    		
		    	if(enviar){
					console.log("Enviar");		
					//Asignar a sessión
					//console.log(req.session);
				    app.sess=req.session;
				    console.log(app.sess);
				    app.sess.usuario = usuario;
				    app.sess.contrasena = contrasena;
				    console.log(app.sess);

				    res.json({result:true,mensaje:"Logueado correctamente"});									    		
		    	}
			    
			} else {
	    		enviar = false;
				errores+="enviar los datos";	
			    res.json({result:false,errores:errores});					
			}
		}
	});
	
	/*
	if(req.body !=undefined || req.body.length>0){
		if(req.body.usuario){
			usuario = req.body.usuario;			
		} else {
			enviar = false;
			errores +="\nUsuario";
		}
		if(req.body.contrasena){
			contrasena = req.body.contrasena;			
		} else {
			enviar = false;
			errores +="\nContraseña";
		}
	}
	*/	
}

function logout(req,res){
	console.log("logout");
	console.log(req.session);
	req.session.destroy();
	console.log(req.session);
    res.json({result:true,mensaje:"Adiós"});						
}
module.exports = {
	login:login,
	logout:logout,

};