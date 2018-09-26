// Definir quais credenciais retornar

if (process.env.NODE_ENV === 'produção') {
	//ambiente de produção
	module.exports = require('./prod');
	} else {
	//ambiente de desenvolvimento
	module.exports = require ('./dev');

	}