const wrapper = require('@pact-foundation/pact-node');

const runPactMockServer = function (pacts, logger) {
	const log = logger.create('pact');
	pacts = pacts || [];

	// If pact options is object, wrap in array
	if (!Array.isArray(pacts)) {
		pacts = [pacts];
	}

	return Promise.all(pacts.map((pact) => {
		const server = wrapper.createServer(pact);
		return server.start().then(() => {
			log.info('Pact Mock Server running on port: ' + server.options.port);
		}, err => {
			log.error('Error while trying to run karma-pact: ' + err);
			throw err;
		});
	}));
};

runPactMockServer.$inject = ['config.pact', 'logger'];

module.exports = {
	'framework:pact': ['factory', runPactMockServer]
};
