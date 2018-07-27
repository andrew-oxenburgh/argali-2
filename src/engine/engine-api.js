export class EngineApi {
    constructor(storage) {
        if (!storage) {
            if (localStorage) {
                storage = localStorage
            } else {
                []
            }
        }
        // this.storage = storage
        this.shiftReports = require('./shift-reports')(storage)
        this.shifts = require('./shifts')(storage)
        this.usrs = require('./users')
    }

    shiftsClear() {
        this.shifts.clear()
    }

    start(args) {
        this.shifts.start(args)
    }

    end(args) {
        this.shifts.end(args)
    }

    completed() {
        return this.shifts.completed()
    }

    running() {
        return this.shifts.running()
    }

    clear() {
        this.shifts.clear()
    }

    asCsv() {
        return this.shiftReports.asCsv()
    }

    asHtml() {
        return this.shiftReports.asHtml()
    }

    users() {
        return this.usrs.users()
    }
}
