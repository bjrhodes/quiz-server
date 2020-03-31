const appProvider = require('./src/core/provider');
const _router = require('./src/core/router');
const routes = require('./src/routes');
const log = require('./src/utils/log');

const server = require('./src/core/server');

const { PeerServer } = require('peer');

const config = {
    MONGO_DSN: process.env.MONGO_DSN,
    DB_NAME: process.env.DB_NAME,
};

if (!Object.keys(config).every(Boolean)) {
    throw new Error("Could not boot server. Some config missing.");
}

appProvider(config).then(provider => {
    const router = _router(provider);

    routes.map(
        ([cmd, actionCreator]) => [cmd, actionCreator(provider)]
    ).forEach(
        ([cmd, action]) => router.registerCommand(cmd, action)
    );

    server(router, provider.wss());

    log("Quiz server listening on http://127.0.0.1:8082");

    new PeerServer({ port: 9000, path: '/peer' });

    log("Peer server listening on http://127.0.0.1:9000/peer");
});
