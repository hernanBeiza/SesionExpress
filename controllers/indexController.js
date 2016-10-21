var index = require("../models/index");

function saludar(req,res) {
	console.log("indexController: saludar();");
    res.json({mensaje:"Bienvenido a la API de prueba de sesiones"});
}

module.exports = {
	saludar:saludar,
};