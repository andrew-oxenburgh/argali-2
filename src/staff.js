import {difference, keys} from 'ramda'
import $ from 'jquery'

import users from './engine/users'
import shifts from './engine/shifts'


export class Staff {
    attached() {
        $('.list-group').sortable({connectWith: '.connectedSortable'}).disableSelection();
    }

    constructor() {
        const staff = users.users();
        this.working = keys(shifts.running());
        this.notWorking = difference(staff, this.working)
        console.log('constructed')
    }
}
