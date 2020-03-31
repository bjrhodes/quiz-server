const { MongoClient } = require("mongodb");
const WebSocket = require('ws');
const quizBroadcaster = require('./quizBroadcaster');
const participantStore = require('../stores/participantStore');
const quizStore = require('../stores/quizStore');

module.exports = async config => {
    const mongo = new MongoClient(config.MONGO_DSN);
    const wss = new WebSocket.Server({ port: 8082 });

    await mongo.connect();

    const mongoDb = mongo.db(config.DB_NAME);

    const services = {
        mongo: () => mongoDb,
        wss: () => wss,
    };

    services.participantStore = () => participantStore(services);
    services.quizStore = () => quizStore(services);
    services.quizBroadcaster = quizBroadcaster(services);

    return services;
};
