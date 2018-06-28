import {PLATFORM} from 'aurelia-pal';
import 'bootstrap/scss/bootstrap.scss'

import '../styles.scss'
const shifts = require('../engine/shifts')
const shiftReports = require('../engine/shift-reports')


export class App {
    configureRouter(config, router) {
        config.title = 'Argali';
        config.map([
            {route: 'staff', moduleId: PLATFORM.moduleName('components/staff'), title: 'Staff'},
            {route: 'report', moduleId: PLATFORM.moduleName('components/report'), title: 'Report'},
            {route: '', moduleId: PLATFORM.moduleName('components/no-selection'), title: 'Select'},
            {route: 'contacts/:id', moduleId: PLATFORM.moduleName('components/contact-detail'), name: 'contacts'}
        ]);

        this.router = router;
    }

    shiftsEmail() {
        const email = 'andrew.oxenburgh@gmail.com'
        const subject = 'roster'
        const emailBody = encodeURI(shiftReports.asCsv())
        window.location = 'mailto:' + email + '?subject=' + subject + '&body=' +   emailBody
    }

    shiftsClear() {
        shifts.clear()
    }
}
