
const _renderTable = function(arr, cols) {
  var md = ''

  if (Array.isArray(arr) && arr.length > 0) {
    var cols = cols ? cols : Object.keys(arr[0])

    md += cols.join(' | ')
    md += '\n'
    md += cols.map(function() { return '---' }).join(' | ')
    md += '\n'

    arr.forEach(function(item) {
      var vals = Object.keys(item)
      md += vals.map(function(key) { return String(item[key]) }).join(' | ')
      md += '\n'
    })

    // remove extra line breaks
    md = md.replace(/\n\n/g, '\n')

    return md
  }

  return md
}

const _render = function(val, type, cols) {
  if (type === 'table')
    return _renderTable(val, cols)

  if (typeof val == 'string')
    return val
}

export const renderTable = _renderTable
export const render = _render

export default {
  renderTable: _renderTable,
  render: _render
}
