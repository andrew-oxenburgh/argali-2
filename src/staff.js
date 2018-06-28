const {difference, keys} = require('ramda')

const users = require('./engine/users')
const shifts = require('./engine/shifts')

export class Staff {
    attached() {
    }

    constructor() {
        const staff = users.users();
        this.working = keys(shifts.running());
        this.notWorking = difference(staff, this.working)
    }

    makeWorking(user) {
        alert('working ' + user);
        shifts.start(user)
    }

    makeNotWorking(user) {
        alert('not working ' + user);
    }
}
