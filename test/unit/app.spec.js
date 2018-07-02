import {App} from '../../src/components/app'

describe('the app', () => {
    it('says hello', () => {
        expect(new App().message).toBe('Hello World!')
    })
})
