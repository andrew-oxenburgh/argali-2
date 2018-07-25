/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const R = require('ramda')

const shifts = require('./shifts')(localStorage)


const asCsv = function() {
    const completed = shifts.completed()

    const toTableRow = row => {
        return `${row.name},${row.start},${row.end}\n`
    }

    return `name, start, end\n${R.join('', R.map(toTableRow, completed))}`
}

const asHtml = function() {
    const completed = shifts.completed()

    const toTableRow = row => {
        return `<tr><td>${row.name}</td><td>${row.start}</td><td>${row.end}</td></tr>`
    }

    let ret = '<table><tr><th>staff</th><th>start</th><th>end</th></tr>'
    ret += R.join('', R.map(toTableRow, completed))
    return ret += '</table>'
}


module.exports = {
    asHtml,
    asCsv
}
