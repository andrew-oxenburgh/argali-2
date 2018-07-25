import {difference, keys} from 'ramda'
import moment from 'moment'
import {EventAggregator} from 'aurelia-event-aggregator'
import {inject} from 'aurelia-framework'

import {PageChanged} from '../messages'

import users from '../engine/users'
const shifts = require('../engine/shifts')(localStorage)

@inject(EventAggregator)
export class Staff {
    constructor(ea) {
        this.ea = ea
        this.calc()
        this.ea.publish(new PageChanged('staff'))
    }

    attached() {
    }

    calc() {
        const staff = users.users()
        this.working = keys(shifts.running())
        this.notWorking = difference(staff, this.working)
    }

    makeWorking(user) {
        shifts.start({name: user, time: moment().format('YYYY-MM-DD HH:mm')})
        this.calc()
    }

    makeNotWorking(user) {
        shifts.end({name: user, time: moment().format('YYYY-MM-DD HH:mm')})
        this.calc()
    }
}
