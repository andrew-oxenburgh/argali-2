import {EventAggregator} from 'aurelia-event-aggregator'
import {inject} from 'aurelia-framework'

import {PageChanged} from '../messages'

import {EngineApi} from '../engine/engine-api'

@inject(EventAggregator, EngineApi)
export class Report {
    constructor(ea, api) {
        this.ea = ea

        this.shifts = api.completed()
        this.ea.publish(new PageChanged('report'))
    }
}
