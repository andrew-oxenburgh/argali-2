import 'bootstrap/scss/bootstrap.scss'

const shifts = require('../engine/shifts')

export class Report {
    constructor() {
        this.shifts = shifts.completed()
    }
}
