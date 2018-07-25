
export class EngineApi {
    constructor(storage) {
        // this.storage = storage
        this.shiftReports = require('./shift-reports')
        this.shifts = require('./shifts')(storage || localStorage || [])
        this.users = require('./users')
    }

    shiftsClear() {
        this.shifts.clear()
    }

    start(args) {
        this.shifts.start(args)
    }
}
