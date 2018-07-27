import {PLATFORM} from 'aurelia-pal'
import 'fontawesome/'
// import 'bootstrap/dist/css/bootstrap.css'

// import '../styles.scss'
import {EventAggregator} from 'aurelia-event-aggregator'
import {PageChanged} from '../messages'
import {inject} from 'aurelia-framework'

import {EngineApi} from '../engine/engine-api'

@inject(EventAggregator, EngineApi)
export class App {
    constructor(ea, api) {
        this.ea = ea
        this.api = api
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
        const emailBody = encodeURI(this.api.asCsv())
        window.location = 'mailto:' + email + '?subject=' + subject + '&body=' + emailBody
    }

    shiftsClear() {
        this.api.clear()
        return 'done'
    }
}
