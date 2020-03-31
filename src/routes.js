const register = require('./actions/register');
const getParticipants = require('./actions/getParticipants');

const joinTeam = _provider => () => 'command incomplete';
const getTeamState = _provider => () => 'command incomplete';
const getQuizState = _provider => () => 'command incomplete';
const getTeams = _provider => () => 'command incomplete';
const writeAnswers = _provider => () => 'command incomplete';

module.exports = [
    ['joinTeam', joinTeam],
    ['getTeamState', getTeamState],
    ['getQuizState', getQuizState],
    ['getTeams', getTeams],
    ['getParticipants', getParticipants],
    ['writeAnswers', writeAnswers],
    ['register', register],
];
