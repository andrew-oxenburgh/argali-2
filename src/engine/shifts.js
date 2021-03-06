/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
*/
const R = require('ramda')
const debug = require('debug')('shifts')
const users = require('./users')

const RUNNING = 'SHIFTS.RUNNING'
const COMPLETED = 'SHIFTS.COMPLETED'

let storage = []

const start = function(args) {
    const _running = JSON.parse(storage[RUNNING] || '{}')

    if (_running[args.name]) {
        debug('needs a name')
        return
    }

    if (!R.contains(args.name, users.users())) {
        debug(`${args.name} is not valid`)
        return
    }

    _running[args.name] = {
        name: args.name,
        start: args.time
    }

    return storage[RUNNING] = JSON.stringify(_running, null, 4)
}

const end = function(args) {
    let _running = JSON.parse(storage[RUNNING] || '{}')
    const _completed = JSON.parse(storage[COMPLETED] || '[]')

    const shift = _running[args.name]
    if (!shift) {
        debug(`no user called ${args.name} is working`)
        return
    }
    shift.end = args.time
    _completed.push(shift)
    _running = R.omit([args.name], _running)

    storage[RUNNING] = JSON.stringify(_running, null, 4)
    storage[COMPLETED] = JSON.stringify(_completed, null, 4)
}

const running = () => JSON.parse(storage[RUNNING] || '{}')
const completed = () => JSON.parse(storage[COMPLETED] || '[]')

const clear = function() {
    storage[RUNNING] = JSON.stringify({})
    storage[COMPLETED] = JSON.stringify([])
}

module.exports = (_storage) => {
    storage = _storage
    return {
        start,
        end,
        completed,
        running,
        clear
    }
}
