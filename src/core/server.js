const log = require('../utils/log');
const { nanoid } = require('nanoid');

const validateInput = str =>
    Promise.resolve(JSON.parse(str));

module.exports = async (router, wss) => {
    const incoming = (input, ws) => {
        validateInput(input)
            .then(validated => router.route(validated, ws))
            .then(JSON.stringify)
            .then(ws.send.bind(ws))
            .catch(e => {
                log.error(e);

                ws.send(JSON.stringify({
                    isError: true,
                    helpText: e && e.help ? e.help : null,
                    debug: e.message
                }));
            });
    };

    const interval = setInterval(function ping() {
        wss.clients.forEach(ws => {
            if (ws.isAlive === false) {
                ws.terminate();
            } else {
                ws.isAlive = false;
                ws.ping(() => { });
            }
        });
    }, 30000);

    const newConnection = ws => {
        ws.id = nanoid();
        ws.isAlive = true;
        ws.on('pong', () => { ws.isAlive = true; });
        ws.on('message', input => incoming(input, ws));
    }

    wss.on('connection', newConnection);
    wss.on('close', () => clearInterval(interval));
};
