/**
 * Encargado de exportar las rutas
 */
//Importar los módulos requeridos
var express = require('express');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var cors = require('cors');

var config = require("../config/config");
var indexController = require ("../controllers/indexController");
var usuarioController = require ("../controllers/usuarioController");
var informeController = require("../controllers/informeController");

//sessión
var session = require('express-session');

//obtenemos el app contenido en app.js
module.exports = function(app){

	app.use(cors());


	app.use(session({
	    secret: "hiperactivo2016",
	    resave: true,
	    saveUninitialized: true
	}));

	
	app.all('/', function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		//res.header('Access-Control-Allow-Headers', 'Content-Type');
		res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
		/*
		res.header('Access-Control-Allow-Origin', req.headers.origin || "*");
		res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
		res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
		*/
		next();
	});
	app.all('/*', function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		//res.header('Access-Control-Allow-Headers', 'Content-Type');
		res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
		/*
		res.header('Access-Control-Allow-Origin', req.headers.origin || "*");
		res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
		res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
		*/
		next();
	});

	
	var apiRoutes = express.Router();
	// route middleware to verify a token
	/*
	apiRoutes.use(function(req, res, next) {
		//console.log("middleware");

		// check header or url parameters or post parameters for token
		var token = req.body.token || req.query.token || req.headers['x-access-token'];
		//console.log(token);
		// decode token
		if (token) {
			// verifies secret and checks exp
			jwt.verify(token, config.secret, function(err, decoded) {      
				if (err) {
					return res.json({ result: 3, mensaje: 'Error al autentificar el token.' });    
				} else {
					// if everything is good, save to request for use in other routes
					req.decoded = decoded;    
					next();
				}
			});

		} else {
		  // if there is no token
		  // return an error
		  return res.status(403).send({ 
			  result: 4, 
			  errores: 'No enviaste el token.' 
		  });
		}	
	});
	*/

	app.get("/",indexController.saludar);
	app.post("/usuario/login",usuarioController.login);
	app.get("/usuario/logout",usuarioController.logout);
	//api
	app.use('/api', apiRoutes);	
	//informes
	app.get("/api/informe/:idinforme",informeController.obtener);
	app.post("/api/informe",informeController.guardar);
	app.put("/api/informe/",informeController.editar);
	app.delete("/api/informe/",informeController.eliminar);
};