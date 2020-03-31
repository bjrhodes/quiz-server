const { inspect } = require('util');

const chalk = require('chalk');

const asStack = e => e && e.stack ? e.stack : (typeof (e) === 'string' ? e : inspect(e));

const extendErrors = (fn, c) => (a, ...params) => console[fn](c(asStack(a)), ...params);

const callable = extendErrors('log', chalk.cyan);

const methods = {
    debug: extendErrors('debug', chalk.green),
    error: extendErrors('error', chalk.red),
    info: extendErrors('info', chalk.blue),
    log: extendErrors('log', chalk.cyan),
    warn: extendErrors('warn', chalk.yellow),

    // just to make it compat with other console stuff...
    dir: (...params) => console.dir(...params),
    dirxml: (...params) => console.dirxml(...params),
    table: (...params) => console.table(...params),
    trace: (...params) => console.trace(...params),
    group: (...params) => console.group(...params),
    groupCollapsed: (...params) => console.groupCollapsed(...params),
    groupEnd: (...params) => console.groupEnd(...params),
    clear: (...params) => console.clear(...params),
    count: (...params) => console.count(...params),
    countReset: (...params) => console.countReset(...params),
    assert: (...params) => console.assert(...params),
    profile: (...params) => console.profile(...params),
    profileEnd: (...params) => console.profileEnd(...params),
    time: (...params) => console.time(...params),
    timeLog: (...params) => console.timeLog(...params),
    timeEnd: (...params) => console.timeEnd(...params),
    timeStamp: (...params) => console.timeStamp(...params),
    context: (...params) => console.context(...params),
    memory: (...params) => console.memory(...params),
    reactStack: (...params) => console.reactStack(...params),
    reactStackEnd: (...params) => console.reactStackEnd(...params),
};

Object.keys(methods).forEach(key => callable[key] = methods[key]);

module.exports = callable;