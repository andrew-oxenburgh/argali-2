import {EventAggregator} from 'aurelia-event-aggregator'
import {inject} from 'aurelia-framework'

import {PageChanged} from '../messages'

const shifts = require('../engine/shifts')(localStorage)

@inject(EventAggregator)
export class Report {
    constructor(ea) {
        this.ea = ea

        this.shifts = shifts.completed()
        this.ea.publish(new PageChanged('report'))
    }
}
