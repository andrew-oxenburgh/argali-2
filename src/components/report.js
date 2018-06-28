const shifts = require('../engine/shifts')
import 'bootstrap/scss/bootstrap.scss'

export class Report {
    constructor() {
        this.shifts = shifts.completed()
    }
}
