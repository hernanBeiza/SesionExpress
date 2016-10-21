/**
 * New node file
 */
// Se importan módulos en caso necesario

const console = require('clor');
var jwt = require('jsonwebtoken');
var express = require('express');
var app = express();

var informe = require("../models/informe");

function obtener(req,res) {
	console.cyan.log("informesController.js: obtener();");
	//console.cyan.log(req.body);
	
	var enviar = true;
	var errores = "Te faltó enviar:";

	/*
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
    		} else {
	    		enviar = false;
				errores+="enviar los datos";			
    		}
    	}
    });
	 */
	
	if(enviar){
	    console.log(req.session);				
	    if(req.session.usuario){
		    res.json({result:true,informes:null});					
	    } else {
		    res.json({result:false,errores:"No has iniciado sesion"});					
	    }
	} else {
	    res.json({result:false,errores:errores});					
	}		
	
    /*
	if(req.body !=undefined || req.body.length>0){
		
	} else {
	    res.json({result:false,errores:"Enviar los datos"});							
	}
	*/
}

function guardar(req,res){
	
}

function editar(req,res){
	
}

function eliminar(req,res){
	
}

module.exports = {
	obtener:obtener,
	guardar:guardar,
	editar:editar,
	eliminar:eliminar
};