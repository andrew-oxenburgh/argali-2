import {EngineApi} from '../../src/engine/engine-api'
import moment from 'moment'

const chai = require('chai')
chai.use(require('chai-json-equal'))

const R = require('ramda')

describe('shifts', () => {
    let storage
    let engineApi

    beforeEach(() => {
        storage = []
        engineApi = new EngineApi(storage)
    })

    it('initially empty', () => {
        expect(R.isEmpty(storage)).toBe(true)
    })

    it('users', () => {
        chai.expect(engineApi.users()).to.jsonEqual(['andrew', 'steven', 'philip'])
    })

    it('start', () => {
        const startTime = '1980-01-01 12:02'
        const staff = 'andrew'
        const expected = {name: staff, start: startTime}
        const input = {name: staff, time: moment(startTime).format('YYYY-MM-DD HH:mm')}

        engineApi.start(input)
        const actual = JSON.parse(storage['SHIFTS.RUNNING'])[staff]
        chai.expect(actual).to.jsonEqual(expected)
    })

    it('start and clear', () => {
        const startTime = '1980-01-01 12:02'
        const staff = 'andrew'
        const expected = {name: staff, start: startTime}
        const input = {name: staff, time: moment(startTime).format('YYYY-MM-DD HH:mm')}

        // START
        engineApi.start(input)
        const actual = JSON.parse(storage['SHIFTS.RUNNING'])[staff]
        chai.expect(actual).to.jsonEqual(expected)

        // CLEAR
        engineApi.clear()
        const cleared = JSON.parse(storage['SHIFTS.RUNNING'])[staff]
        expect(cleared).toBeUndefined()
    })

    it('start, running, end shift, completed, and csv, html, correct', () => {
        const staff = 'andrew'
        const startTime = '1980-01-01 12:02'
        const endTime = '1980-01-01 15:05'

        const expected = {name: staff, start: startTime}
        const input = {name: staff, time: moment(startTime).format('YYYY-MM-DD HH:mm')}

        // START
        engineApi.start(input)
        const a1 = JSON.parse(storage['SHIFTS.RUNNING'])[staff]
        chai.expect(a1).to.jsonEqual(expected)

        // RUNNING
        const running = engineApi.running()
        chai.expect(running).to.jsonEqual({
            'andrew': {
                'name': 'andrew',
                'start': '1980-01-01 12:02'
            }
        })

        // END
        engineApi.end({name: staff, time: endTime})
        const a2 = JSON.parse(storage['SHIFTS.RUNNING'])[staff]
        expect(a2).toBeUndefined()

        // COMPLETED
        const completed = engineApi.completed()
        chai.expect(completed).to.jsonEqual([{
            'name': 'andrew',
            'start': '1980-01-01 12:02',
            'end': '1980-01-01 15:05'
        }])

        // CSV
        const csv = engineApi.asCsv()
        expect(csv).toBe(`name, start, end
andrew,1980-01-01 12:02,1980-01-01 15:05
`)

        // HTML
        const html = engineApi.asHtml()
        expect(html).toBe('<table><tr><th>staff</th><th>start</th><th>end</th></tr><tr><td>andrew</td><td>1980-01-01 12:02</td><td>1980-01-01 15:05</td></tr></table>')
    })
})
