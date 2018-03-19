
const _renderList = function(arr) {
  if (Array.isArray(arr) && arr.length > 0) {

  }

  return arr
}

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

    md = md.replace(/\n\n/g, '\n')

    return md
  }

  return md
}

const _render = function(val, type, cols) {
  if (type === 'list')
    return _renderList(val, cols)

  if (type === 'table')
    return _renderTable(val, cols)

  if (typeof val == 'string')
    return val
}

export const renderList = _renderList
export const renderTable = _renderTable
export const render = _render

export default {
  renderList: _renderList,
  renderTable: _renderTable,
  render: _render
}
