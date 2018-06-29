import {PLATFORM} from 'aurelia-pal'
import 'bootstrap/scss/bootstrap.scss'

import '../styles.scss'
import {EventAggregator} from 'aurelia-event-aggregator'
import {PageChanged} from '../messages'
import {inject} from 'aurelia-framework'

const shifts = require('../engine/shifts')
const shiftReports = require('../engine/shift-reports')


@inject(EventAggregator)
export class App {
    constructor(ea) {
        this.ea = ea
        ea.subscribe(PageChanged, msg => this.fixPageIndicator(msg.page))
    }

    configureRouter(config, router) {
        config.title = 'Argali'
        config.map([
            {route: 'staff', moduleId: PLATFORM.moduleName('components/staff'), title: 'Staff'},
            {route: 'report', moduleId: PLATFORM.moduleName('components/report'), title: 'Report'},
            {route: '', moduleId: PLATFORM.moduleName('components/staff'), title: 'Staff'}
        ])

        this.router = router
    }

    fixPageIndicator(page) {
        this.page = page
    }

    shiftsEmail() {
        const email = 'andrew.oxenburgh@gmail.com'
        const subject = 'roster'
        const emailBody = encodeURI(shiftReports.asCsv())
        window.location = 'mailto:' + email + '?subject=' + subject + '&body=' + emailBody
    }

    shiftsClear() {
        shifts.clear()
    }
}
