// Definir quais credenciais retornar

if (process.env.NODE_ENV === 'production') {
	//ambiente de produção
	module.exports = require('./prd');
	} else {
	//ambiente de desenvolvimento
	module.exports = require ('./dev');

	}