import {difference, keys} from 'ramda'
import moment from 'moment'
import {EventAggregator} from 'aurelia-event-aggregator'
import {inject} from 'aurelia-framework'

import {PageChanged} from '../messages'

import users from '../engine/users'

import {EngineApi} from '../engine/engine-api'

@inject(EventAggregator, EngineApi)
export class Staff {
    constructor(ea, api) {
        this.ea = ea
        this.api = api
        this.calc()
        this.ea.publish(new PageChanged('staff'))
    }

    attached() {
    }

    calc() {
        const staff = users.users()
        this.working = keys(this.api.running())
        this.notWorking = difference(staff, this.working)
    }

    makeWorking(user) {
        this.api.start({name: user, time: moment().format('YYYY-MM-DD HH:mm')})
        this.calc()
    }

    makeNotWorking(user) {
        this.api.end({name: user, time: moment().format('YYYY-MM-DD HH:mm')})
        this.calc()
    }
}
