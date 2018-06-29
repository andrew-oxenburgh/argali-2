import 'bootstrap/scss/bootstrap.scss'
import {EventAggregator} from 'aurelia-event-aggregator'
const $ = require('jquery')
import {inject} from 'aurelia-framework'

import {PageChanged} from '../messages'

const shifts = require('../engine/shifts')

@inject(EventAggregator)
export class Report {
    constructor(ea) {
        this.ea = ea

        this.shifts = shifts.completed()
        this.ea.publish(new PageChanged('report'))
    }
}
