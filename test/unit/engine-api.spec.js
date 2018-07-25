import {EngineApi} from '../../src/engine/engine-api'

const R = require('ramda')

// global.localStorage = []

describe('shifts', () => {
    let storage
    let engineApi

    beforeEach(()=>{
        storage = []
        engineApi = new EngineApi(storage)
    })


    it('initially empty', () => {
        expect(R.isEmpty(storage)).toBe(true)
    })

    it('start user', () => {
        expect(R.isEmpty(storage)).toBe(true)
        engineApi.start({name: 'andrew'})
        expect(R.isEmpty(storage)).toBe(false)
    })
})
