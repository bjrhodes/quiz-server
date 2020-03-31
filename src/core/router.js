const log = require('../utils/log');

module.exports = () => {
    const routes = [];

    const registerCommand = (cmd, fn) =>
        routes.push({ cmd, fn });

    const route = async ({ cmd, event }, ws) => {

        log.debug(`received command ${cmd}`);

        const route = routes.find(({ cmd: _cmd }) => cmd === _cmd);

        if (!route) {
            throw new Error(`404 cmd ${_cmd} not found`);
        }

        return await route.fn(event, ws);
    };

    return { registerCommand, route };
};
