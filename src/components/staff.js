const {difference, keys} = require('ramda')
const moment = require('moment')

const users = require('../engine/users')
const shifts = require('../engine/shifts')

export class Staff {
    attached() {
    }

    constructor() {
        const staff = users.users();
        this.working = keys(shifts.running());
        this.notWorking = difference(staff, this.working)
    }

    makeWorking(user) {
        shifts.start({name: user, time: moment().format('YYYY-MM-DD HH:mm')})

        const staff = users.users();
        this.working = keys(shifts.running());
        this.notWorking = difference(staff, this.working)
    }

    makeNotWorking(user) {
        shifts.end({name: user, time: moment().format('YYYY-MM-DD HH:mm')})

        const staff = users.users();
        this.working = keys(shifts.running());
        this.notWorking = difference(staff, this.working)
    }
}
